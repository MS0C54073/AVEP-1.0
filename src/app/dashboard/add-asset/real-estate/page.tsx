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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AddRealEstatePage() {
  return (
    <AssetFormLayout title="Submit Real Estate Asset">
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
        <CardDescription>
          Please provide the details for your real estate property.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="property-type">Property Type</Label>
          <Select defaultValue="residential">
            <SelectTrigger id="property-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Full Address</Label>
          <Textarea id="address" placeholder="Enter the full property address" />
        </div>
         <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="e.g., New York" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="e.g., USA" />
          </div>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="deed-number">Deed / Title Number</Label>
            <Input id="deed-number" placeholder="Enter the official title or deed number" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="value">Estimated Market Value ($)</Label>
          <Input id="value" type="number" placeholder="e.g., 750000" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="documents">Supporting Documents</Label>
          <Input id="documents" type="file" multiple />
          <p className="text-xs text-muted-foreground">
            Upload deed copy, property tax bill, or other ownership documents.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full sm:w-auto">Submit for Verification</Button>
      </CardFooter>
    </AssetFormLayout>
  );
}
