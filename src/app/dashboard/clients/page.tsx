
"use client";

import Image from "next/image";
import {
  Search,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

import { clients as allClients } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

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
    <DashboardShell title="Clients" description="View and manage all your connected clients.">
        <Card>
            <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>
                A list of all clients in your account.
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
    </DashboardShell>
  );
}
