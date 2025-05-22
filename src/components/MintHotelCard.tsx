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
          src={`https://picsum.photos/800/600?random=${hotel.hotel_id}`} 
          alt={hotel.hotel_name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/800x600/e2e8f0/1e293b?text=Hotel+Image';
          }}
        />
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{hotel.hotel_name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-500" />
            <span className="text-sm font-medium">4.5</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{hotel.address}</p>
        
        <p className="text-sm line-clamp-2 mb-4">{hotel.room_name}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="font-normal text-xs">
            {hotel.board_code}
          </Badge>
          {hotel.is_instant_confirm && (
            <Badge variant="secondary" className="font-normal text-xs">
              Instant Confirmation
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {hotel.rate_plan_id}
            </span>
          </div>
          
          <div className="ml-auto">
            <p className="text-xs text-muted-foreground">Price per night</p>
            <p className="font-bold text-lg">
              {hotel.currency} {hotel.price}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
          <Button asChild className="w-full bg-solana-gradient hover:opacity-90">
            <Link to={`/mint_hotel/${hotel.hotel_id}`}>View Details</Link>
          </Button>
      </CardFooter>
    </Card>
  );
};

export default MintHotelCard;
