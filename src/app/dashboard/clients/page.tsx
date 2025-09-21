
"use client";

import Image from "next/image";
import {
  Landmark,
  LayoutDashboard,
  ReceiptText,
  Search,
  Settings,
  Users,
  BotMessageSquare,
  ChevronLeft,
  FileBox,
  Home
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { Badge } from "@/components/ui/badge";

import { user, clients as allClients } from "@/lib/data";
import { UserNav } from "@/components/dashboard/user-nav";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/dashboard/global-search";

export default function ClientsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredClients = allClients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.contact.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewDetails = (clientId: string) => {
        router.push(`/dashboard/clients/${clientId}`);
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
            <SidebarMenuButton isActive asChild>
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
            <GlobalSearch />
          </div>
          <UserNav user={user} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="md:hidden" asChild>
                    <Link href="/dashboard">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Dashboard</span>
                    </Link>
                </Button>
                <h1 className="text-lg font-semibold md:text-2xl">Clients</h1>
            </div>
          
            <Card>
                <CardHeader>
                  <CardTitle>Client Management</CardTitle>
                  <CardDescription>
                    View and manage all your connected clients.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative mb-4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Search clients by name or email..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                                <Image
                                    alt={`${client.name} logo`}
                                    className="h-10 w-10 rounded-full object-cover"
                                    height="40"
                                    width="40"
                                    src={client.avatar}
                                    data-ai-hint="person portrait"
                                />
                                <div className="font-medium">{client.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{client.type}</TableCell>
                           <TableCell>
                            <Badge variant={client.status === 'Active' ? 'default' : 'secondary'} className={client.status === 'Active' ? 'bg-green-500' : ''}>{client.status}</Badge>
                           </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewDetails(client.id)}>View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
