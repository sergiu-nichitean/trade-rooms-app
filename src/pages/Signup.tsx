import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.functions.invoke('send-signup-notification', {
        body: { email }
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit your registration. Please try again.",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="container py-8">
            <div className="max-w-md mx-auto text-center space-y-4">
              <h1 className="text-3xl font-bold">Thank you for the registration</h1>
              <p className="text-muted-foreground text-lg">
                We will notify you once the platform is launched.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container py-8">
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Register to get early access</h1>
              <p className="text-muted-foreground text-lg">
                We are launching in June 2025, secure your spot now.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-solana-gradient hover:opacity-90">
                Sign Up for Early Access
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
