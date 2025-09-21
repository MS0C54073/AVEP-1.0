import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Landmark } from "lucide-react";
import Link from "next/link";

export default function LinkAccountPage() {
    return (
        <div className="flex flex-col min-h-screen p-4 md:p-8">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Dashboard</span>
                </Link>
                </Button>
                <h1 className="text-2xl font-semibold">Link Financial Account</h1>
            </div>

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <Landmark className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-3xl">Connect an Account</CardTitle>
                    </div>
                    <CardDescription>
                        Securely connect your financial accounts to automatically import and verify your assets. This process is encrypted and your credentials will not be stored.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center p-8">
                    <p className="text-muted-foreground">
                        The account linking feature is currently under construction.
                    </p>
                    <Button className="mt-6" asChild>
                        <Link href="#">
                            Coming Soon
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
