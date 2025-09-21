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

export default function AddInvestmentsPage() {
  return (
    <AssetFormLayout title="Submit Non-Bank Investment">
      <CardHeader>
        <CardTitle>Investment Details</CardTitle>
        <CardDescription>
          Provide details for your non-bank held investments (e.g., private equity, SAFE notes).
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="investment-name">Investment Name / Company</Label>
          <Input id="investment-name" placeholder="e.g., Startup Inc." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="investment-type">Investment Type</Label>
          <Input id="investment-type" placeholder="e.g., Private Equity, Angel Investment, SAFE" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="quantity">Quantity / Number of Shares</Label>
          <Input id="quantity" type="number" placeholder="e.g., 1000" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="value">Estimated Current Value ($)</Label>
          <Input id="value" type="number" placeholder="e.g., 50000" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Provide a brief description of the investment, including any key terms or conditions." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="documents">Supporting Documents</Label>
          <Input id="documents" type="file" multiple />
          <p className="text-xs text-muted-foreground">
            Upload SAFE agreement, share certificate, or other proof of ownership.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full sm:w-auto">Submit for Verification</Button>
      </CardFooter>
    </AssetFormLayout>
  );
}
