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

export default function AddElectronicsPage() {
  return (
    <AssetFormLayout title="Submit Electronics Asset">
      <CardHeader>
        <CardTitle>Electronics Details</CardTitle>
        <CardDescription>
          Please provide the details for your electronic device.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="type">Type</Label>
          <Select defaultValue="laptop">
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="mobile">Mobile Phone</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="desktop">Desktop PC</SelectItem>
              <SelectItem value="camera">Camera</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand / Manufacturer</Label>
            <Input id="brand" placeholder="e.g., Apple" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Input id="model" placeholder="e.g., MacBook Pro 16&quot;" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="serial-number">Serial Number</Label>
          <Input id="serial-number" placeholder="Enter the device's serial number" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="purchase-date">Purchase Date</Label>
                <Input id="purchase-date" type="date" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="purchase-price">Purchase Price ($)</Label>
                <Input id="purchase-price" type="number" placeholder="e.g., 2500" />
            </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="value">Estimated Current Value ($)</Label>
          <Input id="value" type="number" placeholder="e.g., 1800" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="documents">Supporting Documents</Label>
          <Input id="documents" type="file" />
          <p className="text-xs text-muted-foreground">
            Upload purchase invoice, warranty card, or photos.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full sm:w-auto">Submit for Verification</Button>
      </CardFooter>
    </AssetFormLayout>
  );
}
