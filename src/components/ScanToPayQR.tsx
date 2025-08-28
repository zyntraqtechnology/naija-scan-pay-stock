import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { QrCode, Clock, CheckCircle, Smartphone, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScanToPayQRProps {
  amount: number;
  transactionId: string;
  onPaymentSuccess: () => void;
}

export const ScanToPayQR = ({ amount, transactionId, onPaymentSuccess }: ScanToPayQRProps) => {
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "expired">("pending");
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const { toast } = useToast();

  // Generate payment URL (in a real app, this would come from your payment provider)
  const paymentUrl = `https://pay.naijascan.com/qr/${transactionId}?amount=${amount}`;
  
  // Generate QR code data URL (simplified - in production use a proper QR library)
  const qrCodeData = `data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <rect x="20" y="20" width="160" height="160" fill="none" stroke="#008751" stroke-width="2"/>
      <text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="12" fill="#008751">QR CODE</text>
      <text x="100" y="120" text-anchor="middle" font-family="monospace" font-size="8" fill="#008751">₦${amount.toLocaleString()}</text>
    </svg>
  `)}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setPaymentStatus("expired");
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate payment success after 10 seconds (for demo purposes)
    const successTimer = setTimeout(() => {
      if (paymentStatus === "pending") {
        setPaymentStatus("success");
        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);
      }
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(successTimer);
    };
  }, [paymentStatus, onPaymentSuccess]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyPaymentLink = () => {
    navigator.clipboard.writeText(paymentUrl);
    toast({
      title: "Copied",
      description: "Payment link copied to clipboard"
    });
  };

  if (paymentStatus === "success") {
    return (
      <Card className="text-center border-success/20 bg-success/5">
        <CardContent className="pt-6">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-success mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground">₦{amount.toLocaleString()} has been received</p>
          <p className="text-sm text-muted-foreground mt-2">Transaction ID: {transactionId}</p>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === "expired") {
    return (
      <Card className="text-center border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6">
          <Clock className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-destructive mb-2">Payment Expired</h3>
          <p className="text-muted-foreground">The payment session has timed out</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Generate New QR Code
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Details */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Payment Details</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Pending
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-bold text-xl text-primary">₦{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-mono text-sm">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time Remaining</span>
            <span className="font-mono text-warning font-semibold">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* QR Code */}
      <Card className="text-center border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-soft border">
              <img 
                src={qrCodeData}
                alt="Payment QR Code"
                className="w-48 h-48"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Scan with Mobile Banking App
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Customer can scan this QR code using their mobile banking app (GTBank, Zenith, Access, etc.) 
                or any Nigerian fintech app that supports QR payments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Payment Options */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-sm">Alternative Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-primary/10">
            <div className="space-y-1">
              <p className="text-sm font-medium">Share Payment Link</p>
              <p className="text-xs text-muted-foreground">Send via WhatsApp, SMS, or email</p>
            </div>
            <Button variant="outline" size="sm" onClick={copyPaymentLink}>
              <Copy className="w-3 h-3 mr-2" />
              Copy
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Supported by: GTBank, Zenith Bank, Access Bank, First Bank, UBA, PalmPay, OPay, Kuda, and more
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};