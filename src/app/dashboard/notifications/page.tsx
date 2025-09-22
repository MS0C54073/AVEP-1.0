
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  return (
    <DashboardShell
      title="Notifications"
      description="View and manage all your notifications."
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>
              Here is a list of your recent notifications.
            </CardDescription>
          </div>
          <Button size="sm">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border",
                  !notification.read && "bg-muted/50"
                )}
              >
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p
                    className={cn(
                      "font-semibold",
                      !notification.read
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.date}
                  </p>
                </div>
                {!notification.read && (
                    <Button variant="ghost" size="sm">Mark as read</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
