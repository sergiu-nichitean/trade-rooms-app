import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { hotels } from "@/data/hotels";
import { Input } from "@/components/ui/input";
import { CalendarDays, Check, CreditCard, ExternalLink, HandCoins, Hotel, RefreshCw, Send, User, Wallet, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

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

interface UserToken {
  id: string;
  hotelId: string;
  qty: number;
  purchaseDate: string;
  status: string;
}

const Dashboard = () => {
  const [userTokens, setUserTokens] = useState<UserToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [currentToken, setCurrentToken] = useState<{ id: string, hotelId: string } | null>(null);
  const [transferEmail, setTransferEmail] = useState("");
  
  const { publicKey } = useWallet();
  const toast = useToast();

  useEffect(() => {
    const fetchUserTokens = async () => {
      if (!publicKey) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          import.meta.env.VITE_RPC_ENDPOINT,
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

        // Filter tokens that belong to our collection
        const tradeRoomTokens = response.data.result.items.filter((item: TokenAsset) => 
          item.grouping.some(g => 
            g.group_key === "collection" && 
            g.group_value === import.meta.env.VITE_TRADE_ROOMS_COLLECTION_MINT
          )
        );

        // Transform the tokens into our format
        const formattedTokens: UserToken[] = tradeRoomTokens.map((token: TokenAsset) => ({
          id: token.id,
          hotelId: token.content.json_uri.split('/').pop()?.replace('.json', '') || '',
          qty: 1, // Each NFT represents 1 night
          purchaseDate: new Date().toISOString(), // We could store this in the NFT metadata
          status: 'active'
        }));

        setUserTokens(formattedTokens);
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setError('Failed to load your tokens. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTokens();
  }, [publicKey]);

  const handleRedeem = () => {
    if (!currentToken) return;
    
    // Simulate transfer
    setUserTokens(prev => prev.filter(token => token.id !== currentToken.id));
    
    setShowTransferDialog(false);
    setTransferEmail("");
    
    toast.toast({
      title: "Token Redeemed Successfully",
      description: `Your token has been redeemed. You will receive an email with your reservation details.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,078.00</div>
                <p className="text-xs text-muted-foreground">
                  3 tokens across 2 properties
                </p>
              </CardContent>
            </Card>
            
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                <HandCoins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$236.00</div>
                <p className="text-xs text-muted-foreground">
                  Compared to retail pricing
                </p>
              </CardContent>
            </Card> */}
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Nights Reserved</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Across premium properties
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Tabs */}
          <Tabs defaultValue="my-tokens">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="my-tokens">My Tokens</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            {/* My Tokens Tab */}
            <TabsContent value="my-tokens">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-muted-foreground">Loading your tokens...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg border">
                  <div className="rounded-full bg-destructive/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Error Loading Tokens</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    {error}
                  </p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              ) : userTokens.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userTokens.map(token => {
                    const hotel = hotels.find(h => h.id === token.hotelId);
                    if (!hotel) return null;
                    
                    return (
                      <Card key={token.id} className="overflow-hidden">
                        <div className="relative">
                          <img 
                            src={hotel.imageUrl} 
                            alt={hotel.name}
                            className="h-40 w-full object-cover"
                          />
                          <Badge className="absolute top-3 left-3 bg-primary border-0 font-medium">
                            {token.qty} {token.qty === 1 ? 'Night' : 'Nights'}
                          </Badge>
                        </div>
                        
                        <CardHeader className="pb-2">
                          <CardTitle>{hotel.name}</CardTitle>
                          <CardDescription>{hotel.location}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pb-2">
                          <div className="flex justify-between items-center mb-3 text-sm">
                            <span className="text-muted-foreground">Token Value:</span>
                            <span className="font-medium">${hotel.tokenPrice * token.qty}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-3 text-sm">
                            <span className="text-muted-foreground">Purchase Date:</span>
                            <span>{new Date(token.purchaseDate).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant="outline" className="font-normal capitalize flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-green-500"></span>
                              {token.status}
                            </Badge>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="grid grid-cols-2 gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/booking/${hotel.id}`}>
                              <Hotel className="h-4 w-4 mr-2" />
                              Details
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setCurrentToken({ id: token.id, hotelId: token.hotelId });
                              setShowTransferDialog(true);
                            }}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Redeem
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                  
                  {/* Add More Card */}
                  <Card className="flex flex-col items-center justify-center p-8 h-full border-dashed">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <Hotel className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Add More Tokens</h3>
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
                  <h3 className="text-lg font-medium mb-2">No Tokens Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You haven't purchased any hotel tokens yet. Browse our marketplace to find exclusive deals on premium hotel stays.
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
        </div>
      </main>
      
      {/* Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redeem Hotel Token</DialogTitle>
            <DialogDescription>
              Redeem your token to use at the hotel. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentToken && (
            <div className="p-4 border rounded-md bg-muted/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Hotel:</span>
                <span>{hotels.find(h => h.id === currentToken.hotelId)?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Location:</span>
                <span>{hotels.find(h => h.id === currentToken.hotelId)?.location}</span>
              </div>
            </div>
          )}
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input placeholder="John Doe" />
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
            <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleRedeem}
              disabled={!transferEmail || !transferEmail.includes('@')}
              className="bg-solana-gradient hover:opacity-90"
            >
              Redeem Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
