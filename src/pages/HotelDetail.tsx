import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, CheckCircle, Map, Star, Wallet, Info, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBooking, getHotelDetails } from "@/lib/api";
import type { HotelResponse, Room, RatePlan } from "@/lib/api";

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const RECIPIENT_WALLET = new PublicKey("7m11WaqSL9w4py6fgPjNQ8gRVCQYRLGp39hYw9LabkaV");

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const toast = useToast();
  const [hotel, setHotel] = useState<HotelResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { publicKey, sendTransaction } = useWallet();
  const [selectedRate, setSelectedRate] = useState<{ room: Room; plan: RatePlan } | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        if (!id) return;
        const data = await getHotelDetails(id, {
          check_in: location.state?.dateFrom,
          check_out: location.state?.dateTo,
          occupancy: {
            adults: parseInt(location.state?.adults),
            rooms: parseInt(location.state?.rooms),
            children: parseInt(location.state?.children)
          }
        });
        setHotel(data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setError('Failed to load hotel details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id, location.state]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-12">
          <Link 
            to="/search_results" 
            state={{
              dateFrom: location.state?.dateFrom,
              dateTo: location.state?.dateTo,
              rooms: location.state?.rooms,
              adults: location.state?.adults,
              children: location.state?.children
            }}
            className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to search results
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || "The hotel you're looking for doesn't exist or has been removed."}</p>
            <Button asChild>
              <Link to="/search">Search for Hotels</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Get the lowest and highest prices from all rate plans
  const prices = hotel.rooms.flatMap((room: Room) => 
    room.rates.map((plan: RatePlan) => plan.price)
  );
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const tokenPrice = selectedRate ? selectedRate.plan.price : lowestPrice;
  const totalPrice = tokenPrice * quantity;

  console.log('Hotel rooms', hotel.rooms);

  const handlePurchase = async () => {
    if (!publicKey) {
      toast.toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to proceed with the purchase.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTransactionStatus('processing');

    try {
      const connection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL, "confirmed");
      
      // Get the associated token accounts
      const fromTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        publicKey
      );
      
      const toTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        RECIPIENT_WALLET
      );

      // Create the transfer instruction
      const transferInstruction = new TransactionInstruction({
        keys: [
          { pubkey: fromTokenAccount, isSigner: false, isWritable: true },
          { pubkey: toTokenAccount, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
        ],
        programId: TOKEN_PROGRAM_ID,
        data: Buffer.from([
          3, // Transfer instruction
          ...new Uint8Array(8).fill(0), // Amount (will be set below)
        ]),
      });

      // Set the amount in the instruction data
      const amount = totalPrice * 1_000_000; // USDC has 6 decimals
      const amountBuffer = Buffer.alloc(8);
      amountBuffer.writeBigUInt64LE(BigInt(amount));
      transferInstruction.data.set(amountBuffer, 1);

      // Create and send the transaction
      const transaction = new Transaction().add(transferInstruction);
      const signature = await sendTransaction(transaction, connection);

      setTransactionStatus('success');

      // Create booking in backend
      await createBooking({
        receiverAddress: publicKey.toString(),
        name: hotel.hotel_name,
        description: `${hotel.star}-star hotel in ${hotel.city_name}, ${hotel.country_code}. ${hotel.address}`,
        image: hotel.images[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
      });

      toast.toast({
        title: "Transaction Successful",
        description: `Your hotel token has been minted successfully!`,
      });

      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error sending transaction:", error);
      setTransactionStatus('error');
      toast.toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8">
          <Link 
            to="/search_results" 
            state={{
              dateFrom: location.state?.dateFrom,
              dateTo: location.state?.dateTo,
              rooms: location.state?.rooms,
              adults: location.state?.adults,
              children: location.state?.children
            }}
            className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to search results
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hotel Images */}
              <div className="relative rounded-xl overflow-hidden border">
                <img 
                  src={hotel.images[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"} 
                  alt={hotel.hotel_name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center gap-2 text-white">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{hotel.star}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{hotel.city_name}, {hotel.country_code}</span>
                  </div>
                </div>
              </div>
              
              {/* Hotel Info */}
              <div>
                <h1 className="text-3xl font-bold mb-4">{hotel.hotel_name}</h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.amenities.map((amenity: string, index: number) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground mb-6">{hotel.address}</p>
              </div>
              
              {/* Tabs */}
              <Tabs defaultValue="rooms" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="rooms">Rooms</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="policies">Policies</TabsTrigger>
                </TabsList>
                
                <TabsContent value="rooms" className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {hotel.rooms.map((room: Room) => (
                      <div key={room.roomId} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{room.name}</h3>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          {room.rates.map((plan: RatePlan) => (
                            <div 
                              key={`${room.roomId}-${plan.ratePlanId}`} 
                              className={`flex justify-between items-center p-2 rounded-md cursor-pointer transition-colors ${
                                selectedRate?.room.roomId === room.roomId && 
                                selectedRate?.plan.ratePlanId === plan.ratePlanId
                                  ? 'bg-primary/10 border-2 border-primary'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                              onClick={() => setSelectedRate({ room, plan })}
                            >
                              <div>
                                <p className="font-medium">{plan.boardCode}</p>
                                <p className="text-sm text-muted-foreground">
                                  {plan.isInstantConfirm ? 'Instant Confirmation' : 'Request Required'}
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="font-bold">${plan.price.toFixed(2)}</p>
                                </div>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRate({ room, plan });
                                  }}
                                >
                                  Book now
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-primary" />
                        Token Details
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mint Price</span>
                          <span className="font-medium">${tokenPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Regular Price</span>
                          <span className="font-medium line-through">${lowestPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Blockchain-secured reservation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Flexible booking dates</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Transferable token</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="policies" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Cancellation Policy</h3>
                      <p className="text-sm text-muted-foreground">
                        Your token represents a guaranteed stay that can be redeemed, sold, or transferred. 
                        No cancellation fees - sell your token on the marketplace if plans change.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Redemption Policy</h3>
                      <p className="text-sm text-muted-foreground">
                        Book at least 14 days in advance. Redemption subject to availability within specified date ranges.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
            <div>
              <Card className="sticky top-24 border-2 rounded-xl overflow-hidden">
                <div className="bg-solana-gradient text-white px-5 py-4">
                  <h3 className="font-bold text-lg">Your Booking</h3>
                </div>
                
                <CardContent className="p-5 space-y-6">
                  {/* Room and Rate details */}
                  <div className="space-y-3">
                    {selectedRate ? (
                      <p className="space-y-2">
                        <span className="font-medium">{hotel.hotel_name}</span>
                        <br />
                        <span className="text-muted-foreground">
                          {selectedRate.room.name} • {selectedRate.plan.boardCode}
                        </span>
                        <br />
                        <span className="text-muted-foreground">
                          {new Date(location.state?.dateFrom).toLocaleDateString()} - {new Date(location.state?.dateTo).toLocaleDateString()}
                        </span>
                        <br />
                        <span className="text-muted-foreground">
                          {location.state?.adults} {parseInt(location.state?.adults) === 1 ? 'Adult' : 'Adults'}
                          {parseInt(location.state?.children) > 0 && ` • ${location.state?.children} ${parseInt(location.state?.children) === 1 ? 'Child' : 'Children'}`}
                        </span>
                      </p>
                    ) : (
                      <p className="text-muted-foreground">Please select a room and a rate</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Price</span>
                      {selectedRate ? (
                        <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                      ) : (
                        <span className="text-2xl font-bold">${lowestPrice.toFixed(2)} - ${highestPrice.toFixed(2)}</span>
                      )}
                    </div>

                    {!publicKey && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Please connect your wallet to proceed
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      className="w-full h-12 bg-solana-gradient hover:opacity-90"
                      onClick={handlePurchase}
                      disabled={!publicKey || isLoading || !selectedRate}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Processing...
                        </div>
                      ) : (
                        "Book now"
                      )}
                    </Button>

                    {transactionStatus === 'success' && (
                      <Alert className="mt-4 bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Transaction successful! Your token has been minted.
                        </AlertDescription>
                      </Alert>
                    )}

                    {transactionStatus === 'error' && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Transaction failed. Please try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Token Minted Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your hotel token has been minted and is now in your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-1">{hotel.hotel_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {quantity} {quantity === 1 ? 'token' : 'tokens'} minted
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link to="/search">Search for Hotels</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelDetail;
