import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(otp)) {
      toast.error("OTP must be exactly 6 digits.");
      return;
    }

    setIsVerifying(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("OTP verified successfully.");
      navigate("/resetpassword");
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    toast.success("OTP resent to your email.");
    setOtp("");
    setTimer(120); // Reset timer to 2 minutes
    setCanResend(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit OTP sent to your email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              type="text"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <div className="text-sm text-muted-foreground text-center">
            {canResend ? (
              <Button
                variant="link"
                className="text-blue-600 p-0 h-auto"
                onClick={handleResend}
              >
                Resend OTP
              </Button>
            ) : (
              <span>Resend in {formatTime(timer)}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleVerify} disabled={isVerifying}>
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOtp;
