
"use client";

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
import { manualAssets, updateManualAsset } from '@/lib/data';

export default function AddInvestmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const { register, handleSubmit, setValue, watch } = useForm();
  const isEditing = !!assetId;

  useEffect(() => {
    if (assetId) {
      const asset = manualAssets.find(a => a.id === assetId);
      if (asset && asset.category === "Investments") {
        setValue("investment-name", asset.name);
        setValue("investment-type", asset.details?.investmentType);
        setValue("quantity", asset.details?.quantity);
        setValue("value", asset.value);
        setValue("description", asset.details?.description);
      }
    }
  }, [assetId, setValue]);

  const onSubmit = (data:any) => {
    if (isEditing && assetId) {
        updateManualAsset(assetId, { 
            name: data['investment-name'],
            value: Number(data.value),
            details: {
                investmentType: data['investment-type'],
                quantity: data.quantity,
                description: data.description,
                company: data['investment-name'],
            }
        });
        router.push('/dashboard');
    } else {
        // Handle new asset creation
        console.log(data);
    }
  };

  return (
    <AssetFormLayout title={isEditing ? "Edit Non-Bank Investment" : "Submit Non-Bank Investment"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
          <CardDescription>
            {isEditing ? "Update details for your non-bank held investments." : "Provide details for your non-bank held investments (e.g., private equity, SAFE notes)."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="investment-name">Investment Name / Company</Label>
            <Input id="investment-name" placeholder="e.g., Startup Inc." {...register("investment-name")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="investment-type">Investment Type</Label>
            <Input id="investment-type" placeholder="e.g., Private Equity, Angel Investment, SAFE" {...register("investment-type")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity / Number of Shares</Label>
            <Input id="quantity" type="number" placeholder="e.g., 1000" {...register("quantity")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Estimated Current Value ($)</Label>
            <Input id="value" type="number" placeholder="e.g., 50000" required {...register("value")} />
          </div>
          <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Provide a brief description of the investment, including any key terms or conditions." {...register("description")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input id="documents" type="file" multiple {...register("documents")} />
            <p className="text-xs text-muted-foreground">
              Upload SAFE agreement, share certificate, or other proof of ownership.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full sm:w-auto">{isEditing ? "Save Changes" : "Submit for Verification"}</Button>
        </CardFooter>
      </form>
    </AssetFormLayout>
  );
}
