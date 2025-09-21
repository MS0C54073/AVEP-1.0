import {
  Car,
  ChevronLeft,
  Gem,
  Home,
  Laptop,
  Library,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AssetCategoryCard } from "@/components/dashboard/asset-category-card";

const assetCategories = [
  {
    name: "Vehicles",
    icon: <Car className="h-8 w-8" />,
    href: "/dashboard/add-asset/vehicle",
  },
  {
    name: "Electronics",
    icon: <Laptop className="h-8 w-8" />,
    href: "/dashboard/add-asset/electronics",
  },
  {
    name: "Real Estate",
    icon: <Home className="h-8 w-8" />,
    href: "/dashboard/add-asset/real-estate",
  },
  {
    name: "Jewelry",
    icon: <Gem className="h-8 w-8" />,
    href: "/dashboard/add-asset/jewelry",
  },
  {
    name: "Investments",
    icon: <Library className="h-8 w-8" />,
    href: "/dashboard/add-asset/investments",
  },
  {
    name: "Other",
    icon: <PlusCircle className="h-8 w-8" />,
    href: "/dashboard/add-asset/other",
  },
];

export default function AddAssetPage() {
  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to Dashboard</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Submit a New Asset</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Choose Asset Category</CardTitle>
          <CardDescription>
            Select the type of asset you want to submit for verification.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assetCategories.map((category) => (
            <AssetCategoryCard
              key={category.name}
              name={category.name}
              icon={category.icon}
              href={category.href}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
