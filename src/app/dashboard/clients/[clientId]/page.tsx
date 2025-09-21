
"use client";
import { useParams } from "next/navigation";
import { clients } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ClientDetailsPage() {
    const params = useParams();
    const { clientId } = params;
    const client = clients.find(c => c.id === clientId);

    if (!client) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Client Not Found</CardTitle>
                        <CardDescription>The client you are looking for does not exist.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard/clients">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Clients
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-8">
             <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/clients">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Clients</span>
                </Link>
                </Button>
                <h1 className="text-2xl font-semibold">Client Details</h1>
            </div>

            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
                     <Avatar className="h-24 w-24 border">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-3xl">{client.name}</CardTitle>
                        <CardDescription className="text-lg">{client.contact}</CardDescription>
                         <div className="flex items-center gap-2 mt-2">
                            <Badge variant={client.status === 'Active' ? 'default' : 'secondary'} className={client.status === 'Active' ? 'bg-green-500' : ''}>
                                {client.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{client.type}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mt-4">
                        Further client details and associated assets will be displayed here.
                    </p>
                </CardContent>
            </Card>
        </div>
    )

}
