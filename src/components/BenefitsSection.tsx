
import { Currency, Diamond, Star } from "lucide-react";

const BenefitsSection = () => {
  return (
    <div className="bg-muted/50 py-16">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TradeRooms</h2>
          <p className="text-muted-foreground text-lg">
            Experience the future of hotel bookings with these unique advantages
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-xl p-6 border">
            <div className="w-12 h-12 rounded-full bg-solana-purple/10 flex items-center justify-center mb-4">
              <Diamond className="h-6 w-6 text-solana-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">New Asset Class</h3>
            <p className="text-muted-foreground">
              Transform your hotel bookings into tradable investments on Solana blockchain.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border">
            <div className="w-12 h-12 rounded-full bg-solana-blue/10 flex items-center justify-center mb-4">
              <Currency className="h-6 w-6 text-solana-blue" />
            </div>
            <h3 className="text-xl font-bold mb-2">Dynamic Pricing Advantage</h3>
            <p className="text-muted-foreground">
              Capitalize on price fluctuations and local events for potential gains.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 border">
            <div className="w-12 h-12 rounded-full bg-solana-teal/10 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-solana-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2">Full Control & Flexibility</h3>
            <p className="text-muted-foreground">
              Move your NFT to any compatible wallet, transfer it, or use it for your stay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
