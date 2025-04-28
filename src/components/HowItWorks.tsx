
import { Book, Wallet, ArrowRightLeft, Check } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="container py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground text-lg">
          Turn your hotel bookings into tradeable digital assets in four simple steps
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-card rounded-xl p-6 border flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Book className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Book Your Stay</h3>
          <p className="text-muted-foreground">
            Browse available hotels and book your preferred dates through our platform.
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-6 border flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
            <Wallet className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Receive Your NFT</h3>
          <p className="text-muted-foreground">
            Get your hotel stay minted as a unique digital token in your wallet.
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-6 border flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <ArrowRightLeft className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold mb-2">Trade or Transfer</h3>
          <p className="text-muted-foreground">
            Freely trade or transfer your stay token with other users.
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-6 border flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-solana-purple/10 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-solana-purple" />
          </div>
          <h3 className="text-xl font-bold mb-2">Redeem and Stay</h3>
          <p className="text-muted-foreground">
            Use your token to check in and enjoy your hotel stay.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
