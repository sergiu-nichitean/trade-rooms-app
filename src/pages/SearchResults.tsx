import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X, Calendar as CalendarIcon, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import MintHotelCard from "@/components/MintHotelCard";
import { HotelListing } from "@/data/hotels";

const SearchResults = () => {
  const location = useLocation();
  const { searchResults, searchParams } = location.state || { searchResults: [], searchParams: {} };
  
  const [searchQuery, setSearchQuery] = useState(searchParams.destination || "");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(searchParams.dateFrom);
  const [dateTo, setDateTo] = useState<Date | undefined>(searchParams.dateTo);
  const [rooms, setRooms] = useState(searchParams.rooms || 1);
  const [adults, setAdults] = useState(searchParams.adults || 2);
  const [children, setChildren] = useState(searchParams.children || 0);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Basic filtering and sorting functionality
  const filteredHotels = searchResults.filter((hotel: HotelListing) => {
    // Filter by search query
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by price range
    const matchesPrice = hotel.tokenPrice >= priceRange[0] && hotel.tokenPrice <= priceRange[1];
    
    return matchesSearch && matchesPrice && hotel.location;
  });

  // Sort hotels based on selection
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.tokenPrice - b.tokenPrice;
      case "price-high":
        return b.tokenPrice - a.tokenPrice;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return b.discount - a.discount;
      default: // recommended
        return 0; // Keep original order
    }
  });

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
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="pt-4 px-2">
                      <Slider 
                        defaultValue={[0, 500]} 
                        max={500} 
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
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="caribbean">Caribbean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any rating</SelectItem>
                        <SelectItem value="4.5+">4.5+ stars</SelectItem>
                        <SelectItem value="4+">4+ stars</SelectItem>
                        <SelectItem value="3+">3+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" className="w-full">Reset Filters</Button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="space-y-6">
              {/* Search and Sort Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search hotels, locations..." 
                    className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
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

              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card rounded-lg border p-4">
                {/* Date From */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : <span>Check in</span>}
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

                {/* Date To */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : <span>Check out</span>}
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

                {/* Guests */}
                <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {rooms} Room{rooms > 1 ? 's' : ''}, {adults + children} Guest{adults + children > 1 ? 's' : ''}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
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
                    </div>
                  </PopoverContent>
                </Popover>
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
                          defaultValue={[0, 500]} 
                          max={500} 
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
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Location</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="All locations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All locations</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="asia">Asia</SelectItem>
                            <SelectItem value="caribbean">Caribbean</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Rating</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Any rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any rating</SelectItem>
                            <SelectItem value="4.5+">4.5+ stars</SelectItem>
                            <SelectItem value="4+">4+ stars</SelectItem>
                            <SelectItem value="3+">3+ stars</SelectItem>
                          </SelectContent>
                        </Select>
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
              
              {/* Hotel Grid */}
              {sortedHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedHotels.map((hotel) => (
                    <MintHotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange([0, 500]);
                    }}
                  >
                    Reset all filters
                  </Button>
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
