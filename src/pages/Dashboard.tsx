import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarDays, Check, CreditCard, ExternalLink, HandCoins, Hotel, RefreshCw, Send, User, Wallet, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { redeemToken, getBookings, Booking } from "@/lib/api";

interface TokenAsset {
  interface: string;
  id: string;
  content: {
    json_uri: string;
    files: {
      uri: string;
      cdn_uri: string;
      mime: string;
    }[];
  };
  ownership: {
    owner: string;
    delegate: string | null;
  };
  grouping: {
    group_key: string;
    group_value: string;
  }[];
}

const Dashboard = () => {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [transferEmail, setTransferEmail] = useState("");
  const [transferName, setTransferName] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  
  const { publicKey } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserTokens = async () => {
      if (!publicKey) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          import.meta.env.VITE_SOLANA_RPC_URL,
          {
            'jsonrpc': '2.0',
            'id': import.meta.env.VITE_RPC_CALL_ID,
            'method': 'getAssetsByOwner',
            'params': {
                'ownerAddress': publicKey.toString(),
                'page': 1,
                'limit': 100
            }
          }
        );
        console.log('getAssetsByOwner response', response.data);
        // Filter tokens that belong to our collection
        const tradeRoomTokens = response.data.result.items.filter((item: TokenAsset) => 
          item.grouping.some(g => 
            g.group_key === "collection" && 
            g.group_value === import.meta.env.VITE_TRADE_ROOMS_COLLECTION_MINT
          )
        );

        // Get mint addresses from tokens
        const mintAddresses = tradeRoomTokens.map((token: TokenAsset) => token.id);

        // Fetch bookings for these tokens
        const bookings = await getBookings(mintAddresses);
        console.log('bookings', bookings);
        setUserBookings(bookings);
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setError('Failed to load your tokens. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTokens();
  }, [publicKey]);

  const handleRedeem = async () => {
    if (!currentBooking) return;
    
    setIsRedeeming(true);
    try {
      await redeemToken(currentBooking.mint_address, {
        name: transferName,
        email: transferEmail
      });
      
      // Update local state only after successful API call
      setUserBookings(prev => prev.filter(booking => booking.mint_address !== currentBooking.mint_address));
      setShowTransferDialog(false);
      setTransferEmail("");
      setTransferName("");
      
      toast({
        title: "Token Redeemed Successfully",
        description: "Your token has been redeemed. You will receive an email with your reservation details.",
      });
    } catch (error) {
      console.error('Error redeeming token:', error);
      toast({
        title: "Failed to Redeem Token",
        description: "There was an error redeeming your token. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8">
          {!publicKey ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg border">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Please connect your Solana wallet to view your tokens, transactions, and account details.
              </p>
              <Button asChild>
                <Link to="/">Connect Wallet</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${userBookings.length > 0 ? userBookings.reduce((sum, booking) => sum + parseFloat(booking.total_price), 0).toFixed(2) : '0.00'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {userBookings.length === 0 ? (
                        'No bookings yet'
                      ) : (
                        `${userBookings.length} ${userBookings.length === 1 ? 'booking' : 'bookings'} across ${new Set(userBookings.map(b => b.hotel.hotel_id)).size} properties`
                      )}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Nights Reserved</CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {userBookings.reduce((sum, booking) => {
                        const checkIn = new Date(booking.check_in_date);
                        const checkOut = new Date(booking.check_out_date);
                        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
                        return sum + nights;
                      }, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across premium properties
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Tabs */}
              <Tabs defaultValue="my-tokens">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="my-tokens">My Bookings</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
                
                {/* My Bookings Tab */}
                <TabsContent value="my-tokens">
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        <p className="text-muted-foreground">Loading your bookings...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 bg-muted/30 rounded-lg border">
                      <div className="rounded-full bg-destructive/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="h-8 w-8 text-destructive" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Error Loading Bookings</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        {error}
                      </p>
                      <Button onClick={() => window.location.reload()}>
                        Try Again
                      </Button>
                    </div>
                  ) : userBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userBookings.map(booking => (
                        <Card key={booking.id} className="overflow-hidden">
                          <div className="relative">
                            <img 
                              src={booking.hotel.images.find(img => img.is_primary)?.image_url || `https://picsum.photos/800/600?random=${booking.hotel.hotel_id}`}
                              alt={booking.hotel.hotel_name}
                              className="h-40 w-full object-cover"
                            />
                            <Badge className="absolute top-3 left-3 bg-primary border-0 font-medium">
                              {Math.ceil((new Date(booking.check_out_date).getTime() - new Date(booking.check_in_date).getTime()) / (1000 * 60 * 60 * 24))} Nights
                            </Badge>
                          </div>
                          
                          <CardHeader className="pb-2">
                            <CardTitle>{booking.hotel.hotel_name}</CardTitle>
                            <CardDescription>{booking.hotel.address}</CardDescription>
                          </CardHeader>
                          
                          <CardContent className="pb-2">
                            <div className="flex justify-between items-center mb-3 text-sm">
                              <span className="text-muted-foreground">Total Value:</span>
                              <span className="font-medium">${booking.total_price}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mb-3 text-sm">
                              <span className="text-muted-foreground">Check-in:</span>
                              <span>{new Date(booking.check_in_date).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mb-3 text-sm">
                              <span className="text-muted-foreground">Check-out:</span>
                              <span>{new Date(booking.check_out_date).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Status:</span>
                              <Badge variant="outline" className="font-normal capitalize flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                {booking.status}
                              </Badge>
                            </div>
                          </CardContent>
                          
                          <CardFooter className="grid grid-cols-2 gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/booking/${booking.hotel.hotel_id}`}>
                                <Hotel className="h-4 w-4 mr-2" />
                                Details
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setCurrentBooking(booking);
                                setShowTransferDialog(true);
                              }}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Redeem
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      
                      {/* Add More Card */}
                      <Card className="flex flex-col items-center justify-center p-8 h-full border-dashed">
                        <div className="rounded-full bg-primary/10 p-3 mb-4">
                          <Hotel className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Add More Bookings</h3>
                        <p className="text-muted-foreground text-sm text-center mb-4">
                          Expand your portfolio with more exclusive hotel stays
                        </p>
                        <Button asChild>
                          <Link to="/search">Search for Hotels</Link>
                        </Button>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-lg border">
                      <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Hotel className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        You haven't made any hotel bookings yet. Browse our marketplace to find exclusive deals on premium hotel stays.
                      </p>
                      <Button asChild>
                        <Link to="/search">Search for Hotels</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                {/* Transactions Tab */}
                <TabsContent value="transactions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>
                        View your purchase and transfer history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <CreditCard className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Purchased Alpine Retreat Lodge</p>
                              <p className="text-sm text-muted-foreground">2 nights at $319 per night</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">$638.00</p>
                            <p className="text-xs text-muted-foreground">Jan 15, 2025</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-2">
                              <CreditCard className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Purchased Tropical Paradise Resort</p>
                              <p className="text-sm text-muted-foreground">1 night at $379 per night</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">$379.00</p>
                            <p className="text-xs text-muted-foreground">Feb 3, 2025</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Account Tab */}
                <TabsContent value="account">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Manage your profile details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-sm font-medium">Name</label>
                          <Input value="Jane Smith" disabled />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-sm font-medium">Email</label>
                          <Input value="jane.smith@example.com" disabled />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-sm font-medium">Wallet Address</label>
                          <div className="flex">
                            <Input value="5Gv7.....w39S" disabled className="rounded-r-none" />
                            <Button variant="outline" size="icon" className="rounded-l-none">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Edit Profile</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Wallet Connection</CardTitle>
                        <CardDescription>Manage your blockchain wallet</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg flex gap-3 items-start">
                          <div className="rounded-full bg-green-500/10 p-2">
                            <Check className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Wallet Connected</p>
                            <p className="text-sm text-muted-foreground">Your Solana wallet is correctly configured and ready to use.</p>
                          </div>
                        </div>
                        
                        <div className="bg-card p-4 rounded-lg border">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">SOL Balance</span>
                            <span>2.45 SOL</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">USD Value</span>
                            <span>$245.00</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-3">
                        <Button variant="outline" className="w-full">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh
                        </Button>
                        <Button variant="outline" className="w-full">
                          Disconnect
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redeem Hotel Booking</DialogTitle>
            <DialogDescription>
              Redeem your booking to use at the hotel. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentBooking && (
            <div className="p-4 border rounded-md bg-muted/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Hotel:</span>
                <span>{currentBooking.hotel.hotel_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Location:</span>
                <span>{currentBooking.hotel.address}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Room:</span>
                <span>{currentBooking.room_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Check-in:</span>
                <span>{new Date(currentBooking.check_in_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Check-out:</span>
                <span>{new Date(currentBooking.check_out_date).toLocaleDateString()}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                placeholder="John Doe" 
                value={transferName}
                onChange={(e) => setTransferName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                placeholder="email@example.com" 
                value={transferEmail}
                onChange={(e) => setTransferEmail(e.target.value)}
              />
            </div>
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                The reservation will be made under the name you provide.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowTransferDialog(false)}
              disabled={isRedeeming}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRedeem}
              disabled={!transferEmail || !transferEmail.includes('@') || !transferName || isRedeeming}
              className="bg-solana-gradient hover:opacity-90"
            >
              {isRedeeming ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Redeeming...
                </>
              ) : (
                'Redeem Booking'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
