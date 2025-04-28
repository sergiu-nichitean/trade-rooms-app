
import { User, Linkedin, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const TeamSection = () => {
  return (
    <div className="bg-muted/50 py-16">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Founders</h2>
          <p className="text-muted-foreground text-lg">
            We are passionate building the future of travel with blockchain technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-6 border text-center">
            <div className="w-24 h-24 mx-auto mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="lovable-uploads/256442a6-2e8b-48d1-8606-0e8889610f0f.png" alt="Jay" />
                <AvatarFallback>
                  <User className="h-12 w-12 text-primary" />
                </AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-2xl font-bold mb-1">Jay</h3>
            <p className="text-muted-foreground mb-4">Founder & Travel Hacker</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a 
                href="https://www.linkedin.com/in/jakub-skopec/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://x.com/jaksko8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary"
              >
                <X className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border text-center">
            <div className="w-24 h-24 mx-auto mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="lovable-uploads/1bd6d797-2e7d-46dc-9437-20eb77fa2036.png" alt="Sergiu" />
                <AvatarFallback>
                  <User className="h-12 w-12 text-primary" />
                </AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-2xl font-bold mb-1">Sergiu</h3>
            <p className="text-muted-foreground mb-4">Founder & Tech Hacker</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a 
                href="https://www.linkedin.com/in/sergiu-nichitean/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://x.com/SeriousSergiu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary"
              >
                <X className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;

