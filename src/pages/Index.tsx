import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Package, ShoppingCart, Scan, Plus, TrendingUp, AlertTriangle } from "lucide-react";
import { DashboardOverview } from "@/components/DashboardOverview";
import { InventoryManager } from "@/components/InventoryManager";
import { POSInterface } from "@/components/POSInterface";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for the overview
  const stats = {
    totalProducts: 147,
    lowStock: 12,
    dailySales: 45670.50,
    transactions: 23
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                NaijaScan Inventory
              </h1>
              <p className="text-muted-foreground">
                Complete inventory management with Scan to Pay
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Online
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Nigerian Business
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Items in inventory</p>
            </CardContent>
          </Card>

          <Card className="border-warning/20 shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.lowStock}</div>
              <p className="text-xs text-muted-foreground">Items need restock</p>
            </CardContent>
          </Card>

          <Card className="border-success/20 shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₦{stats.dailySales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.transactions}</div>
              <p className="text-xs text-muted-foreground">Today's transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-card shadow-soft">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="pos" className="flex items-center gap-2">
              <Scan className="w-4 h-4" />
              POS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <InventoryManager />
          </TabsContent>

          <TabsContent value="pos" className="mt-6">
            <POSInterface />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;