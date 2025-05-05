import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Star, Calendar, Users, Wallet, Share2, Download, QrCode } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data - replace with actual data fetching
const mockBooking = {
  id: "TRF-4029",
  hotel: {
    name: "Grand Hotel",
    address: "123 Ocean View Drive, Miami, FL",
    rating: 4.5,
    reviews: 128,
    image: "https://example.com/hotel.jpg",
  },
  room: {
    type: "Deluxe Suite, Ocean View",
    guests: 2,
  },
  dates: {
    checkIn: new Date("2025-05-20"),
    checkOut: new Date("2025-05-23"),
  },
  nft: {
    tokenId: "TRF-4029",
    contractAddress: "0x1234...5678",
    mintDate: new Date("2024-03-15"),
    ownerAddress: "3qz4...AB1F",
    status: "active",
  },
  booking: {
    reference: "BK-123456",
    status: "awaiting_redemption",
    price: 150,
    currency: "USDC",
    paymentMethod: "token",
  },
};

const BookingDetail = () => {
  const { bookingId } = useParams();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isListing, setIsListing] = useState(false);

  const handleRedeem = () => {
    setIsRedeeming(true);
    // Add redemption logic here
    toast.success("Booking redeemed successfully!");
  };

  const handleListNFT = () => {
    setIsListing(true);
    // Add listing logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{mockBooking.hotel.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mockBooking.hotel.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {mockBooking.hotel.address}
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{mockBooking.hotel.rating} ({mockBooking.hotel.reviews} reviews)</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Room Type</p>
                  <p>{mockBooking.room.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p>{mockBooking.room.guests} guests</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                  <p>{format(mockBooking.dates.checkIn, "MMM d, yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                  <p>{format(mockBooking.dates.checkOut, "MMM d, yyyy")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFT Metadata & Token Info */}
          <Card>
            <CardHeader>
              <CardTitle>NFT Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Token ID</p>
                  <p>{mockBooking.nft.tokenId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract Address</p>
                  <a 
                    href={`https://solscan.io/token/${mockBooking.nft.contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    {mockBooking.nft.contractAddress}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mint Date</p>
                  <p>{format(mockBooking.nft.mintDate, "MMM d, yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Owner Address</p>
                  <p>{mockBooking.nft.ownerAddress}</p>
                </div>
              </div>
              <div className="mt-4">
                <Badge variant={mockBooking.nft.status === "active" ? "default" : "destructive"}>
                  {mockBooking.nft.status.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Booking Reference</p>
                  <p>{mockBooking.booking.reference}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={
                    mockBooking.booking.status === "awaiting_redemption" ? "default" :
                    mockBooking.booking.status === "redeemed" ? "secondary" :
                    mockBooking.booking.status === "listed" ? "outline" :
                    "destructive"
                  }>
                    {mockBooking.booking.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price Paid</p>
                  <p>{mockBooking.booking.price} {mockBooking.booking.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p>{mockBooking.booking.paymentMethod.toUpperCase()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Redemption Status & Action */}
          <Card>
            <CardHeader>
              <CardTitle>Redemption Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <Badge variant={mockBooking.booking.status === "awaiting_redemption" ? "default" : "secondary"}>
                    {mockBooking.booking.status === "awaiting_redemption" ? "NOT REDEEMED" : "REDEEMED"}
                  </Badge>
                </div>
                {mockBooking.booking.status === "awaiting_redemption" && (
                  <Button 
                    className="w-full" 
                    onClick={handleRedeem}
                    disabled={isRedeeming}
                  >
                    {isRedeeming ? "Redeeming..." : "Redeem Booking"}
                  </Button>
                )}
                {mockBooking.booking.status === "redeemed" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Check-in Instructions:</p>
                    <p>Please present your booking confirmation at the front desk.</p>
                    <Button variant="outline" className="w-full">
                      <QrCode className="w-4 h-4 mr-2" />
                      Show QR Code
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* NFT Marketplace Actions */}
          <Card>
            <CardHeader>
              <CardTitle>NFT Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleListNFT}
                disabled={isListing}
              >
                {isListing ? "Listing..." : "List on Marketplace"}
              </Button>
              <Button variant="outline" className="w-full">
                Transfer NFT
              </Button>
            </CardContent>
          </Card>

          {/* Booking Utility Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Utilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Proof of Booking
              </Button>
              <Button variant="outline" className="w-full">
                <Wallet className="w-4 h-4 mr-2" />
                Add to Wallet
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail; 