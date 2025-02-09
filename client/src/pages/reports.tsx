import Layout from "@/components/layout";
import { useItems } from "@/lib/inventory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Reports() {
  const { data: items, isLoading } = useItems();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!items) return null;

  // Calculate total inventory value
  const totalValue = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  // Calculate value by category
  const categoryValue = items.reduce((acc, item) => {
    if (!item.category) return acc;
    acc[item.category] = (acc[item.category] || 0) + Number(item.price) * item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(categoryValue).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2))
  }));

  // Calculate stock levels
  const stockLevels = {
    outOfStock: items.filter(item => item.quantity === 0).length,
    lowStock: items.filter(item => item.reorderPoint && item.quantity <= item.reorderPoint && item.quantity > 0).length,
    adequate: items.filter(item => !item.reorderPoint || item.quantity > item.reorderPoint).length
  };

  const stockLevelData = [
    { name: "Out of Stock", value: stockLevels.outOfStock },
    { name: "Low Stock", value: stockLevels.lowStock },
    { name: "Adequate", value: stockLevels.adequate }
  ];

  // Sort items by value
  const topItems = [...items]
    .sort((a, b) => (Number(b.price) * b.quantity) - (Number(a.price) * a.quantity))
    .slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Reports</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{items.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Object.keys(categoryValue).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Value by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieChartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stockLevelData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      <Cell fill="#ef4444" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#22c55e" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Items by Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topItems.map((item, index) => {
                const value = Number(item.price) * item.quantity;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} units at ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${value.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
