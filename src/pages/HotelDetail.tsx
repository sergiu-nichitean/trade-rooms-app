import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, CheckCircle, Map, Star, Tag, Wallet, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { hotels } from "@/data/hotels";

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const hotel = hotels.find((h) => h.id === id);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-12">
          <Link to="/marketplace" className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to marketplace
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
            <p className="text-muted-foreground mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const totalPrice = hotel.tokenPrice * quantity;
  const savings = (hotel.price - hotel.tokenPrice) * quantity;
  
  const handlePurchase = () => {
    // Simulate purchase flow
    setTimeout(() => {
      setShowSuccessDialog(true);
      toast.toast({
        title: "Purchase Initiated",
        description: `Processing payment for ${quantity} token${quantity > 1 ? 's' : ''}...`,
      });
    }, 1000);
  };
  
  const handleTransfer = () => {
    toast.toast({
      title: "Transfer Feature",
      description: "The transfer feature will be available after purchase.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8">
          <Link to="/marketplace" className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to marketplace
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hotel Images */}
              <div className="relative rounded-xl overflow-hidden border">
                <Badge className="absolute top-4 left-4 bg-solana-gradient border-0 font-medium">
                  {hotel.discount}% Below Market
                </Badge>
                <img 
                  src={hotel.imageUrl} 
                  alt={hotel.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              {/* Hotel Info */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl font-bold">{hotel.name}</h1>
                  <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground mb-4">
                  <Map className="h-4 w-4" />
                  <span>{hotel.location}</span>
                </div>
                
                <p className="text-lg mb-4">{hotel.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {hotel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Tabs */}
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="dates">Available Dates</TabsTrigger>
                  <TabsTrigger value="policies">Policies</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="p-4 border rounded-md mt-2 space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">About this hotel</h3>
                    <p>
                      {hotel.description} Located in the heart of {hotel.location}, this property offers an exceptional
                      stay experience with a variety of amenities and services to make your visit memorable.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Token Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                        <Tag className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Retail Price</p>
                          <p className="font-bold">${hotel.price} per night</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                        <Wallet className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Token Price</p>
                          <p className="font-bold">${hotel.tokenPrice} per token</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Booking Window</p>
                          <p className="font-bold">Valid for 1 year</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Guaranteed</p>
                          <p className="font-bold">Blockchain-secured reservation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="dates" className="p-4 border rounded-md mt-2 space-y-4">
                  <h3 className="font-bold mb-2">Available Date Ranges</h3>
                  <p className="text-muted-foreground mb-4">
                    Your token can be redeemed during any of these date ranges, subject to availability. Book at least 14 days in advance.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hotel.availableDates.map((dateRange, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-md">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Date Range {index + 1}</p>
                          <p className="font-bold">
                            {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="policies" className="p-4 border rounded-md mt-2 space-y-4">
                  <h3 className="font-bold mb-2">Cancellation Policy</h3>
                  <p>
                    Your token represents a guaranteed stay that can be redeemed, sold, or transferred. There are no cancellation fees because you can sell your token on the marketplace if your plans change.
                  </p>
                  
                  <h3 className="font-bold mb-2">Redemption Policy</h3>
                  <p>
                    To redeem your token for a stay, you must book at least 14 days in advance. Redemption is subject to availability within the specified date ranges.
                  </p>
                  
                  <h3 className="font-bold mb-2">Transfer Policy</h3>
                  <p>
                    Tokens can be transferred to another user at any time through the platform. The recipient will receive all the same benefits and guarantees.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Card */}
            <div>
              <Card className="sticky top-24 border-2 rounded-xl overflow-hidden">
                <div className="bg-solana-gradient text-white px-5 py-3">
                  <h3 className="font-bold">Purchase Hotel Token</h3>
                </div>
                
                <CardContent className="p-5 space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground">Token Price:</span>
                      <span className="font-medium">${hotel.tokenPrice}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-muted-foreground">Regular Price:</span>
                      <span className="line-through text-muted-foreground">${hotel.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1 text-green-600 dark:text-green-400">
                      <span>Your Savings:</span>
                      <span className="font-medium">${hotel.price - hotel.tokenPrice} ({hotel.discount}%)</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <label className="block text-sm font-medium mb-2">Token Quantity:</label>
                    <div className="flex items-center border rounded-md">
                      <button 
                        className="px-3 py-1 text-xl"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-medium">{quantity}</span>
                      <button 
                        className="px-3 py-1 text-xl"
                        onClick={() => setQuantity(Math.min(hotel.tokenSupply - hotel.tokensSold, quantity + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Tokens Available:</span>
                      <span className="font-medium">{hotel.tokenSupply - hotel.tokensSold} / {hotel.tokenSupply}</span>
                    </div>
                    <Progress value={(hotel.tokensSold / hotel.tokenSupply) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {hotel.tokensSold} tokens already purchased
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t space-y-2">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400">
                      <span>Total Savings:</span>
                      <span>${savings.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <Button className="w-full bg-solana-gradient hover:opacity-90" size="lg" onClick={handlePurchase}>
                      Purchase Token
                    </Button>
                    
                    <Button variant="outline" className="w-full" size="lg" onClick={handleTransfer}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Transfer Token
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    By purchasing, you agree to our terms and conditions. Each token represents one night stay at this property.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Successful!</DialogTitle>
            <DialogDescription>
              Your hotel token has been added to your portfolio.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 border rounded-md bg-muted/50 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Hotel:</span>
              <span>{hotel.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Tokens:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Paid:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-green-600 dark:text-green-400">
              <span className="font-medium">Saved:</span>
              <span>${savings.toFixed(2)}</span>
            </div>
          </div>
          
          <DialogFooter className="flex sm:justify-between gap-4">
            <Button asChild variant="outline">
              <Link to="/marketplace">Continue Shopping</Link>
            </Button>
            <Button asChild className="bg-solana-gradient hover:opacity-90">
              <Link to="/dashboard">View My Portfolio</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelDetail;
