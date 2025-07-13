import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // ✅ Hook to navigate

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API request (replace with actual mutation)
      await new Promise((res) => setTimeout(res, 1000));

      toast.success("OTP sent to your email.");
  
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to receive a password reset OTP.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={()=> navigate("/verifyOtp")}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
