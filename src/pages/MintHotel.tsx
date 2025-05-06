import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import axios from "axios";

interface Room {
  id: number;
  room_id: string;
  room_name: string;
  max_occupancy: number;
  room_size: number;
  window: number;
  remarks: string;
  rate_plans: RatePlan[];
}

interface RatePlan {
  id: number;
  rate_plan_id: string;
  board_code: string;
  allotment: number;
  price: number;
  currency: string;
  is_instant_confirm: boolean;
  latest_change_time: string | null;
}

interface HotelResponse {
  id: number;
  hotel_id: string;
  hotel_name: string;
  city_name: string;
  country_code: string;
  address: string;
  telephone: string;
  longitude: string;
  latitude: string;
  star: number;
  images: string[];
  amenities: string[];
  room_types: string[];
  rooms: Room[];
}

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const RECIPIENT_WALLET = new PublicKey("7m11WaqSL9w4py6fgPjNQ8gRVCQYRLGp39hYw9LabkaV");

const MintHotel = () => {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const [hotel, setHotel] = useState<HotelResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get<HotelResponse>(`http://127.0.0.1:8000/api/hotels/${id}/`, {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Token 0c7386a2f405130adab66fd958508f639008abce'
          }
        });
        setHotel(response.data);
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
  }, [id]);

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
          <Link to="/search_results" className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors">
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

  // Get the lowest price from all rate plans
  const lowestPrice = Math.min(...hotel.rooms.flatMap(room => 
    room.rate_plans.map(plan => plan.price)
  ));

  // Calculate token price (80% of the lowest price)
  const tokenPrice = lowestPrice * 0.8;
  const totalPrice = tokenPrice * quantity;
  const savings = (lowestPrice - tokenPrice) * quantity;

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
      const connection = new Connection("https://distinguished-fragrant-emerald.solana-mainnet.quiknode.pro/33a309dd8517f81615706b1f55b2bdb3641258cb/", "confirmed");
      
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
          <Link to="/search_results" className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors">
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
                  {hotel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground mb-6">{hotel.address}</p>
              </div>
              
              {/* Tabs */}
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="rooms">Rooms</TabsTrigger>
                  <TabsTrigger value="policies">Policies</TabsTrigger>
                </TabsList>
                
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
                        <div className="flex justify-between text-green-600">
                          <span>Your Savings</span>
                          <span className="font-medium">${savings.toFixed(2)}</span>
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
                
                <TabsContent value="rooms" className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {hotel.rooms.map((room) => (
                      <div key={room.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{room.room_name}</h3>
                            <p className="text-sm text-muted-foreground">{room.remarks}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Max Occupancy: {room.max_occupancy}</p>
                            <p className="text-sm text-muted-foreground">Size: {room.room_size}m²</p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          {room.rate_plans.map((plan) => (
                            <div key={plan.id} className="flex justify-between items-center p-2 bg-muted rounded-md">
                              <div>
                                <p className="font-medium">{plan.board_code}</p>
                                <p className="text-sm text-muted-foreground">
                                  {plan.is_instant_confirm ? 'Instant Confirmation' : 'Request Required'}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">${plan.price}</p>
                                <p className="text-sm text-muted-foreground">{plan.currency}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
                  <h3 className="font-bold text-lg">Mint Hotel Token</h3>
                </div>
                
                <CardContent className="p-5 space-y-6">
                  {/* Price Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Token Price</span>
                      <span className="font-medium">${tokenPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Regular Price</span>
                      <span className="font-medium line-through">${lowestPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span>Your Savings</span>
                      <span className="font-medium">${savings.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Number of Tokens</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Total</span>
                      <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
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
                      disabled={!publicKey || isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Processing...
                        </div>
                      ) : (
                        "Mint Token"
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

export default MintHotel;
