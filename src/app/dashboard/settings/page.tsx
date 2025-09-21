
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings" description="Manage your account and notification settings.">
        <Card>
            <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
                Manage your account preferences and settings.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ThemeToggle />
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                         <p className="text-sm text-muted-foreground">
                            Receive notifications about your account via email.
                        </p>
                    </div>
                    <Switch defaultChecked />
                </div>
                 <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                         <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                        </p>
                    </div>
                    <Button variant="outline" disabled>Enable</Button>
                </div>
            </CardContent>
        </Card>
    </DashboardShell>
  );
}
