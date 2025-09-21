import Image from "next/image";
import {
  BotMessageSquare,
  Landmark,
  LayoutDashboard,
  ReceiptText,
  Search,
  Settings,
  Users,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { accounts, transactions, user } from "@/lib/data";
import { UserNav } from "@/components/dashboard/user-nav";
import AiSummaryTool from "@/components/dashboard/ai-summary-tool";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function DashboardPage() {
  const totalAssets = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Landmark className="text-primary size-8" />
            <h1 className="text-2xl font-semibold text-sidebar-foreground">
              AVEP
            </h1>
          </div>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="#" isActive>
              <LayoutDashboard />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="#">
              <ReceiptText />
              Transactions
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton href="#">
              <BotMessageSquare />
              AI Summary
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="#">
              <Users />
              Clients
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarFooter className="mt-auto">
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#">
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients or transactions..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <UserNav user={user} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Assets
                    </CardTitle>
                    <Landmark className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${totalAssets.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across {accounts.length} linked accounts
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Linked Accounts
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{accounts.length}</div>
                     <p className="text-xs text-muted-foreground">
                      Individual and organizational
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Verification Status
                    </CardTitle>
                    <ReceiptText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold flex items-center gap-2">
                      Verified <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All accounts successfully verified
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Linked Accounts</CardTitle>
                  <CardDescription>
                    Overview of all linked financial accounts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accounts.map((account) => (
                      <div key={account.id} className="flex items-center">
                        <Image
                          alt={`${account.bankName} logo`}
                          className="h-10 w-10 rounded-full mr-4 object-cover"
                          height="40"
                          width="40"
                          src={PlaceHolderImages.find(p => p.id === 'bank-logo')?.imageUrl ?? `https://picsum.photos/seed/${account.id}/40/40`}
                          data-ai-hint="bank logo"
                        />
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">
                            {account.bankName} - {account.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ...{account.accountNumber.slice(-4)}
                          </p>
                        </div>
                        <div className="ml-auto font-medium text-right">
                          <p>${account.balance.toLocaleString()}</p>
                           <p className="text-xs text-muted-foreground font-normal">{account.currency}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    A detailed list of recent financial transactions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>{tx.date}</TableCell>
                          <TableCell className="font-medium">
                            {tx.description}
                          </TableCell>
                          <TableCell>
                            {accounts.find(a => a.id === tx.accountId)?.bankName} ...{accounts.find(a => a.id === tx.accountId)?.accountNumber.slice(-4)}
                          </TableCell>
                          <TableCell
                            className={`text-right font-semibold ${
                              tx.amount < 0 ? "text-destructive" : ""
                            }`}
                          >
                            {tx.amount < 0 ? "-" : ""}$
                            {Math.abs(tx.amount).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ai-summary">
              <AiSummaryTool />
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
