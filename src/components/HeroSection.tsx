import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus, Calendar, Tag, RefreshCw } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-solana-blue/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-solana-purple/10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container relative pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Book, sell, or transfer hotel stays on <span className="gradient-text">Solana</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl">
              Hotel Stays transformed into a new Digital Assets Class.
              <br />
              The future of travel is here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-solana-gradient hover:opacity-90">
                <Link to="/signup">
                  Sign Up to get early access
                  <UserPlus className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/#how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="absolute top-4 -left-4 z-30 animate-float" style={{ animationDelay: '1s' }}>
              <div className="bg-white dark:bg-card rounded-xl shadow-lg p-4 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-md bg-solana-purple p-2">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Search & Book</h3>
                    <p className="text-xs text-muted-foreground">Browse millions of hotels available</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-solana-gradient rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 -right-8 z-20 animate-float" style={{ animationDelay: '2.5s' }}>
              <div className="bg-white dark:bg-card rounded-xl shadow-lg p-4 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-md bg-solana-teal p-2">
                    <Tag className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Find Hotel Deals</h3>
                    <p className="text-xs text-muted-foreground">Up to 40% below advertised rates</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-solana-gradient-alt rounded-full w-3/5"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white dark:bg-card rounded-xl shadow-lg p-4 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-md bg-solana-blue p-2">
                    <RefreshCw className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Instant Trading</h3>
                    <p className="text-xs text-muted-foreground">Sell your tokens anytime</p>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 bg-solana-gradient rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
            
            <div className="relative z-0 rounded-xl overflow-hidden border shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39"
                alt="Luxury hotel room with panoramic city view" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
