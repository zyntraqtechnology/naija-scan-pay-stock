import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Minus, Trash2, ShoppingCart, Scan, CreditCard, Banknote, QrCode } from "lucide-react";
import { ScanToPayQR } from "@/components/ScanToPayQR";
import { useToast } from "@/hooks/use-toast";

// Mock products for POS
const mockPOSProducts = [
  { id: 1, name: "Indomie Noodles (40 pack)", price: 2500, stock: 45, barcode: "123456789" },
  { id: 2, name: "Peak Milk (12 tins)", price: 4200, stock: 3, barcode: "987654321" },
  { id: 3, name: "Dangote Cement (50kg)", price: 3800, stock: 28, barcode: "456789123" },
  { id: 4, name: "Golden Penny Wheat", price: 1850, stock: 12, barcode: "789123456" },
  { id: 5, name: "Maggi Cubes (100 pack)", price: 3200, stock: 8, barcode: "321654987" },
  { id: 6, name: "Bournvita (500g)", price: 2800, stock: 5, barcode: "654987321" }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export const POSInterface = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { toast } = useToast();

  const filteredProducts = mockPOSProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  const addToCart = (product: typeof mockPOSProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast({
          title: "Stock Limit",
          description: "Cannot add more items. Stock limit reached.",
          variant: "destructive"
        });
        return;
      }
      
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      }]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to cart`
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }

    const product = mockPOSProducts.find(p => p.id === id);
    if (product && newQuantity > product.stock) {
      toast({
        title: "Stock Limit",
        description: "Cannot exceed available stock",
        variant: "destructive"
      });
      return;
    }

    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const handlePayment = (method: string) => {
    setPaymentMethod(method);
    if (method === "scan-to-pay") {
      setIsPaymentModalOpen(true);
    } else {
      // Handle other payment methods
      toast({
        title: "Payment Processing",
        description: `Processing ${method} payment for ₦${getCartTotal().toLocaleString()}`,
      });
      
      // Simulate payment success
      setTimeout(() => {
        toast({
          title: "Payment Success",
          description: "Transaction completed successfully!",
        });
        clearCart();
      }, 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Selection */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="shadow-medium border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Product Catalog
            </CardTitle>
            <CardDescription>Search and select products to add to cart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or scan barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-soft transition-all border-primary/20 hover:border-primary/40"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <Badge variant={product.stock > 10 ? "secondary" : "destructive"} className="text-xs">
                          {product.stock} left
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-primary">₦{product.price.toLocaleString()}</p>
                        <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shopping Cart */}
      <div className="space-y-4">
        <Card className="shadow-medium border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Cart ({cart.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 p-3 rounded-lg bg-accent/30 border border-primary/10">
                      <div className="flex justify-between items-start">
                        <h5 className="font-medium text-sm">{item.name}</h5>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="font-bold text-primary">₦{item.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">₦{getCartTotal().toLocaleString()}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={clearCart}
                    disabled={cart.length === 0}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        {cart.length > 0 && (
          <Card className="shadow-medium border-primary/10">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary"
                onClick={() => handlePayment("scan-to-pay")}
              >
                <QrCode className="w-4 h-4 mr-2" />
                Scan to Pay (QR Code)
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handlePayment("cash")}
              >
                <Banknote className="w-4 h-4 mr-2" />
                Cash Payment
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handlePayment("card")}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Card Payment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Scan to Pay Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Scan to Pay</DialogTitle>
            <DialogDescription>
              Customer can scan this QR code to pay ₦{getCartTotal().toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <ScanToPayQR 
            amount={getCartTotal()} 
            transactionId={`TXN-${Date.now()}`}
            onPaymentSuccess={() => {
              setIsPaymentModalOpen(false);
              clearCart();
              toast({
                title: "Payment Successful",
                description: "QR payment completed successfully!",
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};