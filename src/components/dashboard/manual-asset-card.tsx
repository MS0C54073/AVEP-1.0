import { Car, Gem, Home, Laptop, Library, MoreVertical } from "lucide-react";
import type { ManualAsset } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ManualAssetCardProps = {
  asset: ManualAsset;
};

const categoryIcons = {
  "Vehicle": <Car className="h-6 w-6" />,
  "Electronics": <Laptop className="h-6 w-6" />,
  "Real Estate": <Home className="h-6 w-6" />,
  "Jewelry": <Gem className="h-6 w-6" />,
  "Other": <Library className="h-6 w-6" />,
};

const statusColors: { [key: string]: string } = {
    "Verified": "bg-green-500 hover:bg-green-600",
    "In Progress": "bg-blue-500 hover:bg-blue-600",
    "Pending": "bg-yellow-500 hover:bg-yellow-600",
    "Failed": "bg-red-500 hover:bg-red-600",
}


export function ManualAssetCard({ asset }: ManualAssetCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    {categoryIcons[asset.category as keyof typeof categoryIcons] || categoryIcons.Other}
                </div>
                <div>
                    <CardTitle>{asset.name}</CardTitle>
                    <CardDescription>{asset.category}</CardDescription>
                </div>
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <p className="text-sm font-medium text-muted-foreground">Estimated Value</p>
            <p className="text-2xl font-bold">${asset.value.toLocaleString()}</p>
        </div>
         <div>
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-muted-foreground">Verification</p>
                <Badge className={statusColors[asset.verificationStatus]}>{asset.verificationStatus}</Badge>
            </div>
            <Progress value={asset.verificationProgress} />
            <p className="text-xs text-muted-foreground mt-1">{asset.verificationProgress}% complete</p>
        </div>
      </CardContent>
    </Card>
  );
}
