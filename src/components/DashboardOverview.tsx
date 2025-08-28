import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Clock } from "lucide-react";

export const DashboardOverview = () => {
  // Mock data for recent sales and inventory alerts
  const recentSales = [
    { id: 1, product: "Indomie Noodles (40 pack)", amount: 2500, time: "10 mins ago", customer: "Walk-in" },
    { id: 2, product: "Peak Milk (12 tins)", amount: 4200, time: "25 mins ago", customer: "Regular Customer" },
    { id: 3, product: "Dangote Cement (50kg)", amount: 3800, time: "1 hour ago", customer: "Contractor" },
    { id: 4, product: "Golden Penny Wheat", amount: 1850, time: "2 hours ago", customer: "Walk-in" }
  ];

  const inventoryAlerts = [
    { product: "Peak Milk (12 tins)", stock: 3, status: "critical" },
    { product: "Maggi Cubes (100 pack)", stock: 8, status: "low" },
    { product: "Golden Penny Wheat", stock: 12, status: "low" },
    { product: "Bournvita (500g)", stock: 5, status: "critical" }
  ];

  const topProducts = [
    { name: "Indomie Noodles", sales: 156, revenue: 78000 },
    { name: "Peak Milk", sales: 89, revenue: 45600 },
    { name: "Maggi Cubes", sales: 67, revenue: 23450 },
    { name: "Golden Penny", sales: 45, revenue: 18900 }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+15.2%</div>
            <p className="text-xs text-muted-foreground">vs last week</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Traffic</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">284</div>
            <p className="text-xs text-muted-foreground">visitors today</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₦2,845</div>
            <p className="text-xs text-muted-foreground">per sale</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2-4 PM</div>
            <p className="text-xs text-muted-foreground">highest traffic</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <Card className="lg:col-span-2 shadow-medium border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Sales
            </CardTitle>
            <CardDescription>Latest transactions in your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 border border-primary/10">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{sale.product}</p>
                    <p className="text-xs text-muted-foreground">{sale.customer} • {sale.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₦{sale.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card className="shadow-medium border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-warning" />
              Stock Alerts
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventoryAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-card border">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{alert.product}</p>
                    <p className="text-xs text-muted-foreground">{alert.stock} units left</p>
                  </div>
                  <Badge 
                    variant={alert.status === "critical" ? "destructive" : "secondary"}
                    className={alert.status === "critical" ? "" : "bg-warning/10 text-warning border-warning/20"}
                  >
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="shadow-medium border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Top Performing Products
          </CardTitle>
          <CardDescription>Best sellers this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topProducts.map((product, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <h4 className="font-semibold text-sm mb-2">{product.name}</h4>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                  <p className="font-bold text-primary">₦{product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};