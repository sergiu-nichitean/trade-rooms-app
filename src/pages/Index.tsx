import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TeamSection from "@/components/TeamSection";
import BenefitsSection from "@/components/BenefitsSection";
import FAQSection from "@/components/FAQSection";
import HotelCard from "@/components/HotelCard";
import WhoIsItFor from "@/components/WhoIsItFor";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Index = () => {
  // Show just 3 featured hotels on the home page
  const featuredHotels = hotels.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <WhoIsItFor />
        
        {/* Featured listings section */}
        <div id="hotel-offers" className="container py-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Hotel Offers</h2>
              <p className="text-muted-foreground">Search, Book, Trade, or Redeem.</p>
            </div>
            
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/signup">
                Sign Up
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button asChild>
              <Link to="/signup">
                Sign Up
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div id="benefits">
          <BenefitsSection />
        </div>
        <div id="team">
          <TeamSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
