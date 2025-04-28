const WhoIsItFor = () => {
  return (
    <div className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who is it for?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-6 border flex flex-col">
            <h3 className="text-xl font-bold mb-3">Travelers</h3>
            <p className="text-muted-foreground mb-4">
              Lock in discounted room nights in advance; use them or trade when plans change.
            </p>
            <img 
              src="/lovable-uploads/de0a836f-c462-498a-9139-0a53c193c14a.png" 
              alt="Traveler with digital interface" 
              className="w-full h-auto rounded-lg object-cover flex-grow"
            />
          </div>
          
          <div className="bg-card rounded-xl p-6 border flex flex-col">
            <h3 className="text-xl font-bold mb-3">Crypto OGs & Investors</h3>
            <p className="text-muted-foreground mb-4">
              Diversify your portfolio with a real-world, tangible asset — actual hotel stays.
            </p>
            <img 
              src="/lovable-uploads/644f2ae5-fc20-4ce8-a6d1-21b340cdd3e8.png" 
              alt="Crypto investor with digital interfaces" 
              className="w-full h-auto rounded-lg object-cover flex-grow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoIsItFor;
