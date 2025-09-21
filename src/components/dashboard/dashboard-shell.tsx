
import {
  Landmark,
  LayoutDashboard,
  ReceiptText,
  Settings,
  Users,
  BotMessageSquare,
  FileBox,
  Home
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { user } from "@/lib/data";
import { UserNav } from "@/components/dashboard/user-nav";
import { GlobalSearch } from "@/components/dashboard/global-search";

type DashboardShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function DashboardShell({ title, description, children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard/home" className="flex items-center gap-2">
            <Landmark className="text-primary size-8" />
            <h1 className="text-2xl font-semibold text-sidebar-foreground">
              AVEP
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/home">
                <Home />
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <LayoutDashboard />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard#transactions">
              <ReceiptText />
              Transactions
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard#ai-summary">
              <BotMessageSquare />
              AI Summary
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/add-asset">
                <FileBox />
                Assets
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link href="/dashboard/clients">
                    <Users />
                    Clients
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarFooter className="mt-auto">
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/settings">
                    <Settings />
                    Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <GlobalSearch />
          </div>
          <UserNav user={user} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
