
"use client";

import Image from "next/image";
import {
  BotMessageSquare,
  FileBox,
  Home,
  Landmark,
  LayoutDashboard,
  ReceiptText,
  Search,
  Settings,
  Users,
  Bell
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


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

import { accounts as allAccounts, transactions as allTransactions, user, manualAssets as initialManualAssets, deleteManualAsset } from "@/lib/data";
import { UserNav } from "@/components/dashboard/user-nav";
import AiSummaryTool from "@/components/dashboard/ai-summary-tool";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AddAssetDialog } from "@/components/dashboard/add-asset-dialog";
import { ManualAssetCard } from "@/components/dashboard/manual-asset-card";
import { GlobalSearch } from "@/components/dashboard/global-search";
import { NotificationBell } from "@/components/dashboard/notification-bell";


export default function DashboardPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [manualAssets, setManualAssets] = useState(initialManualAssets);


  useEffect(() => {
    setManualAssets(initialManualAssets);
  }, []);

  const handleDeleteAsset = (assetId: string) => {
    deleteManualAsset(assetId);
    setManualAssets(currentAssets => currentAssets.filter(asset => asset.id !== assetId));
  };


  const totalAssets = allAccounts.reduce((sum, account) => sum + account.balance, 0);
  const totalManualAssetsValue = manualAssets.reduce((sum, asset) => sum + asset.value, 0);

  const filteredTransactions = allTransactions.filter(tx =>
    tx.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('tab', value);
    window.history.pushState({ path: newUrl.href }, '', newUrl.href);

    const element = document.getElementById(value);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
  }

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
            <SidebarMenuButton onClick={() => handleTabChange("overview")} isActive={activeTab === 'overview'}>
              <LayoutDashboard />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => handleTabChange("transactions")} isActive={activeTab === 'transactions'}>
              <ReceiptText />
              Transactions
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton onClick={() => handleTabChange("ai-summary")} isActive={activeTab === 'ai-summary'}>
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
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/notifications">
                <Bell />
                Notifications
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
          <NotificationBell />
          <UserNav user={user} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            <div className="ml-auto">
                <AddAssetDialog />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4" id="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Financial Assets
                    </CardTitle>
                    <Landmark className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${totalAssets.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across {allAccounts.length} linked accounts
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Manually Submitted Assets
                    </CardTitle>
                    <FileBox className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${totalManualAssetsValue.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across {manualAssets.length} manual assets
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
                    <div className="text-2xl font-bold">{allAccounts.length}</div>
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
                  <CardTitle>Manually Submitted Assets</CardTitle>
                  <CardDescription>
                    Assets you have submitted for verification.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {manualAssets.map(asset => (
                        <ManualAssetCard key={asset.id} asset={asset} onDelete={handleDeleteAsset} />
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Linked Financial Accounts</CardTitle>
                  <CardDescription>
                    Overview of all linked financial accounts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allAccounts.map((account) => (
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
            <TabsContent value="transactions" id="transactions">
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
                      {filteredTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>{tx.date}</TableCell>
                          <TableCell className="font-medium">
                            {tx.description}
                          </TableCell>
                          <TableCell>
                            {allAccounts.find(a => a.id === tx.accountId)?.bankName} ...{allAccounts.find(a => a.id === tx.accountId)?.accountNumber.slice(-4)}
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
            <TabsContent value="ai-summary" id="ai-summary">
              <AiSummaryTool />
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
