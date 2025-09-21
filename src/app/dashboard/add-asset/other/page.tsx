import { AssetFormLayout } from "@/components/dashboard/asset-form-layout";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddOtherAssetPage() {
  return (
    <AssetFormLayout title="Submit Custom Asset">
      <CardHeader>
        <CardTitle>Asset Details</CardTitle>
        <CardDescription>
          Please provide the details for your custom asset.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="asset-name">Asset Name</Label>
          <Input id="asset-name" placeholder="e.g., Fine Art Collection, Cryptocurrency Wallet" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="asset-category">Asset Category</Label>
          <Input id="asset-category" placeholder="e.g., Art, Digital Asset, Collectible" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Provide a detailed description of the asset, including any unique identifiers." />
        </div>
         <div className="grid gap-2">
          <Label htmlFor="value">Estimated Value ($)</Label>
          <Input id="value" type="number" placeholder="e.g., 75000" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="documents">Supporting Documents</Label>
          <Input id="documents" type="file" multiple />
          <p className="text-xs text-muted-foreground">
            Upload any documents that can help verify the ownership and value of this asset.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full sm:w-auto">Submit for Verification</Button>
      </CardFooter>
    </AssetFormLayout>
  );
}
