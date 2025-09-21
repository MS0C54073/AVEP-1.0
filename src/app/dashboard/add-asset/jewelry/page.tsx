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

export default function AddJewelryPage() {
  return (
    <AssetFormLayout title="Submit Jewelry Asset">
      <CardHeader>
        <CardTitle>Jewelry Details</CardTitle>
        <CardDescription>
          Please provide the details for your jewelry item.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="item-type">Item Type</Label>
          <Input id="item-type" placeholder="e.g., Diamond Ring, Gold Necklace, Luxury Watch" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe the item, including materials, brand, and any identifying marks." />
        </div>
         <div className="grid gap-2">
          <Label htmlFor="value">Estimated Appraised Value ($)</Label>
          <Input id="value" type="number" placeholder="e.g., 15000" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="documents">Supporting Documents</Label>
          <Input id="documents" type="file" multiple />
          <p className="text-xs text-muted-foreground">
            Upload appraisal certificates, receipts, or high-quality photos.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full sm:w-auto">Submit for Verification</Button>
      </CardFooter>
    </AssetFormLayout>
  );
}
