import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HotelListing } from "@/data/hotels";
import { Star, Calendar } from "lucide-react";
import * as React from "react";

interface MintHotelCardProps {
  hotel: HotelListing;
}

export const MintHotelCard: React.FC<MintHotelCardProps> = ({ hotel }) => {
  return (
    <Card className="overflow-hidden hotel-card border-0 rounded-xl">
      <div className="relative">
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-500" />
            <span className="text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{hotel.location}</p>
        
        <p className="text-sm line-clamp-2 mb-4">{hotel.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {/* {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="font-normal text-xs">
              {amenity}
            </Badge>
          ))}
          {hotel.amenities.length > 3 && (
            <Badge variant="secondary" className="font-normal text-xs">
              +{hotel.amenities.length - 3} more
            </Badge>
          )} */}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
                {/* Available from {new Date(hotel.availableDates[0].start).toLocaleDateString()} */}
            </span>
          </div>
          
          <div className="ml-auto">
            <p className="text-xs text-muted-foreground">Mint Price</p>
            <p className="font-bold text-lg"><img src="https://s3.us-east-1.amazonaws.com/radius.art/traderooms/usd-coin-usdc-logo.svg" alt="USD Coin" className="inline-block h-5 w-5 mb-1" /> {hotel.tokenPrice}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
          <Button asChild className="w-full bg-solana-gradient hover:opacity-90">
            <Link to={`/mint_hotel/${hotel.id}`}>View Details</Link>
          </Button>
      </CardFooter>
    </Card>
  );
};

export default MintHotelCard;
