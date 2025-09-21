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

export default function AddVehiclePage() {
  return (
    <AssetFormLayout title="Submit Vehicle Asset">
      <CardHeader>
        <CardTitle>Vehicle Details</CardTitle>
        <CardDescription>
          Please provide the details for your vehicle.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="vehicle-type">Vehicle Type</Label>
          <Select defaultValue="car">
            <SelectTrigger id="vehicle-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">Car</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
              <SelectItem value="motorcycle">Motorcycle</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="make">Make</Label>
            <Input id="make" placeholder="e.g., Honda" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Input id="model" placeholder="e.g., Civic" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" type="number" placeholder="e.g., 2022" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="vin">VIN / Chassis Number</Label>
            <Input id="vin" placeholder="Enter VIN" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="registration-number">Registration Number</Label>
          <Input id="registration-number" placeholder="Enter registration number" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="value">Estimated Value ($)</Label>
          <Input id="value" type="number" placeholder="e.g., 22000" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="documents">Supporting Documents</Label>
          <Input id="documents" type="file" multiple />
          <p className="text-xs text-muted-foreground">
            Upload registration, proof of ownership, or insurance documents.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full sm:w-auto">Submit for Verification</Button>
      </CardFooter>
    </AssetFormLayout>
  );
}
