import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Invoices() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Invoice management features will be implemented here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
