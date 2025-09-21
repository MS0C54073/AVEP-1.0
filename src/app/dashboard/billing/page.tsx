
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function BillingPage() {
  return (
    <DashboardShell title="Billing" description="Manage your billing and subscription.">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>You are currently on the Free plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold">Free Plan</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Includes basic features for asset verification and management.
            </p>
            <Button className="mt-4">Upgrade to Pro</Button>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
