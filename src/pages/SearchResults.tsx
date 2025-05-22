import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Search as SearchIcon, Filter, X, Calendar as CalendarIcon, Users, SlidersHorizontal } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import MintHotelCard from "@/components/MintHotelCard";
import { HotelListing } from "@/data/hotels";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import { searchHotels } from "@/lib/api";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults = [], searchParams = {} } = location.state || {};
  
  const [searchQuery, setSearchQuery] = useState(searchParams.destination || "");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(searchParams.dateFrom);
  const [dateTo, setDateTo] = useState<Date | undefined>(searchParams.dateTo);
  const [rooms, setRooms] = useState(searchParams.rooms || 1);
  const [adults, setAdults] = useState(searchParams.adults || 2);
  const [children, setChildren] = useState(searchParams.children || 0);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [hotels, setHotels] = useState<HotelListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [roomTypeFilter, setRoomTypeFilter] = useState<string[]>([]);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);

  // Only set initial hotels if coming from search page
  useEffect(() => {
    if (location.state?.searchResults) {
      setHotels(location.state.searchResults);
    } else {
      // Clear hotels if not coming from search page
      setHotels([]);
    }
  }, [location.state]);

  const handleSearch = async () => {
    // Reset error state
    setError(null);

    // Validate location
    if (!searchQuery.trim()) {
      setError("Please enter location");
      return;
    }

    if (!dateFrom || !dateTo) {
      setError("Please select check-in and check-out dates");
      return;
    }

    // Reset hotels state before new search
    setHotels([]);
    setIsLoading(true);

    try {
      const searchResults = await searchHotels({
        location: searchQuery,
        dateFrom,
        dateTo,
        rooms,
        adults,
        children
      });

      setHotels(searchResults);
    } catch (error) {
      console.error('Error searching hotels:', error);
      setError("Failed to search hotels. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort hotels
  const filteredHotels = hotels.filter((hotel: HotelListing) => {
    console.log('hotel', hotel);
    const matchesSearch = hotel.hotel_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         hotel.city_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    // const matchesRating = ratingFilter ? hotel.rating >= ratingFilter : true;
    // const matchesRoomType = roomTypeFilter.length > 0 ? 
    //   roomTypeFilter.some(type => hotel.description.toLowerCase().includes(type.toLowerCase())) : true;
    // const matchesAmenities = amenitiesFilter.length > 0 ? 
    //   amenitiesFilter.every(amenity => hotel.amenities.includes(amenity)) : true;
    
    // return matchesSearch && matchesPrice && matchesRating && matchesRoomType && matchesAmenities;
    return matchesSearch && matchesPrice;
  });

  const sortedHotels = [...filteredHotels].sort((a: HotelListing, b: HotelListing) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      // case "rating":
      //   return b.rating - a.rating;
      // case "discount":
      //   return b.discount - a.discount;
      default:
        return 0;
    }
  });

  const handleResetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setSortBy("recommended");
    setHotels([]); // Also clear hotels when resetting filters
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block space-y-6">
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-medium mb-4">Filters</h3>
                
                <div className="space-y-6">
                  {/* Price Range Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="pt-4 px-2">
                      <Slider 
                        defaultValue={[0, 1000]} 
                        max={1000} 
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange} 
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`rating-${rating}`}
                            name="rating"
                            checked={ratingFilter === rating}
                            onChange={() => setRatingFilter(ratingFilter === rating ? null : rating)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label htmlFor={`rating-${rating}`} className="text-sm">
                            {rating} {rating === 1 ? 'Star' : 'Stars'} & Up
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Room Type Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Room Type</label>
                    <div className="space-y-2">
                      {['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`room-${type}`}
                            checked={roomTypeFilter.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRoomTypeFilter([...roomTypeFilter, type]);
                              } else {
                                setRoomTypeFilter(roomTypeFilter.filter(t => t !== type));
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label htmlFor={`room-${type}`} className="text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amenities</label>
                    <div className="space-y-2">
                      {[
                        'Free WiFi',
                        'Air Conditioning',
                        'Room Service',
                        'Swimming Pool',
                        'Fitness Center',
                        'Restaurant',
                        'Spa',
                        'Parking'
                      ].map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`amenity-${amenity}`}
                            checked={amenitiesFilter.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAmenitiesFilter([...amenitiesFilter, amenity]);
                              } else {
                                setAmenitiesFilter(amenitiesFilter.filter(a => a !== amenity));
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label htmlFor={`amenity-${amenity}`} className="text-sm">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setPriceRange([0, 1000]);
                      setRatingFilter(null);
                      setRoomTypeFilter([]);
                      setAmenitiesFilter([]);
                      setSortBy("recommended");
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="space-y-6">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Unified Search Component */}
              <div className="bg-card rounded-xl border shadow-sm">
                <div className="p-6 space-y-4">
                  {/* First Row: Location and Search */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Location */}
                    <div className="relative md:col-span-4">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Where are you going?"
                        className={cn(
                          "h-12 pl-10 text-base",
                          error && !searchQuery.trim() && "border-red-500"
                        )}
                      />
                    </div>

                    {/* Search Button */}
                    <div className="md:col-span-1">
                      <Button 
                        className="w-full h-12 bg-solana-gradient hover:opacity-90 text-base font-medium"
                        onClick={handleSearch}
                        disabled={isLoading}
                      >
                        {isLoading ? "Searching..." : "Search"}
                      </Button>
                    </div>
                  </div>

                  {/* Second Row: Dates and Occupancy */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Date From */}
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal",
                              !dateFrom && "text-muted-foreground",
                              error && !dateFrom && "border-red-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-5 w-5" />
                            {dateFrom ? format(dateFrom, "MMM d") : <span>Check in</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateFrom}
                            onSelect={setDateFrom}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Date To */}
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal",
                              !dateTo && "text-muted-foreground",
                              error && !dateTo && "border-red-500"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-5 w-5" />
                            {dateTo ? format(dateTo, "MMM d") : <span>Check out</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateTo}
                            onSelect={setDateTo}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Occupancy Selector */}
                    <div>
                      <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-12 justify-start text-left font-normal"
                          >
                            <Users className="mr-2 h-5 w-5" />
                            <div className="flex flex-col items-start">
                              <span className="text-sm font-medium">Guests</span>
                              <span className="text-sm text-muted-foreground">
                                {rooms} Room{rooms > 1 ? 's' : ''} · {adults + children} Guest{adults + children > 1 ? 's' : ''}
                              </span>
                            </div>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4" align="start">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Rooms</p>
                                <p className="text-sm text-muted-foreground">Number of rooms</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                                >
                                  -
                                </Button>
                                <span>{rooms}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setRooms(rooms + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Adults</p>
                                <p className="text-sm text-muted-foreground">Ages 13 or above</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setAdults(Math.max(1, adults - 1))}
                                >
                                  -
                                </Button>
                                <span>{adults}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setAdults(adults + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Children</p>
                                <p className="text-sm text-muted-foreground">Ages 0-12</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setChildren(Math.max(0, children - 1))}
                                >
                                  -
                                </Button>
                                <span>{children}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => setChildren(children + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <Button 
                              className="w-full bg-solana-gradient hover:opacity-90"
                              onClick={() => setIsGuestsOpen(false)}
                            >
                              Done
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Sort Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-2 ml-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="discount">Biggest Discount</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="md:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="md:hidden bg-card rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Price Range</label>
                      <div className="pt-4 px-2">
                        <Slider 
                          defaultValue={[0, 1000]} 
                          max={1000} 
                          step={10}
                          value={priceRange}
                          onValueChange={setPriceRange} 
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <Button onClick={() => setShowFilters(false)} className="w-full bg-solana-gradient hover:opacity-90">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Results Count */}
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing {sortedHotels.length} {sortedHotels.length === 1 ? 'result' : 'results'}
                </p>
              </div>
              
              {/* No Results Message */}
              {(location.state?.noResults || sortedHotels.length === 0) && !isLoading && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any hotels matching your search criteria. Try adjusting your filters or search for a different location.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/search')}
                  >
                    Modify Search
                  </Button>
                </div>
              )}

              {/* Results Grid */}
              {!location.state?.noResults && sortedHotels.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedHotels.map((hotel) => (
                    <MintHotelCard key={hotel.hotel_id} hotel={hotel} />
                  ))}
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Searching for hotels...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
