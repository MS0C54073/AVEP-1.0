
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

export default function AddJewelryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const { register, handleSubmit, setValue, watch } = useForm();
  const isEditing = !!assetId;

  useEffect(() => {
    if (assetId) {
      const asset = manualAssets.find(a => a.id === assetId);
      if (asset && asset.category === "Jewelry") {
        setValue("item-type", asset.details?.itemType);
        setValue("description", asset.details?.description);
        setValue("value", asset.value);
      }
    }
  }, [assetId, setValue]);

  const onSubmit = (data:any) => {
    if (isEditing && assetId) {
        updateManualAsset(assetId, { 
            name: data['item-type'],
            value: Number(data.value),
            details: {
                itemType: data['item-type'],
                description: data.description,
            }
        });
        router.push('/dashboard');
    } else {
        // Handle new asset creation
        console.log(data);
    }
  };

  return (
    <AssetFormLayout title={isEditing ? "Edit Jewelry Asset" : "Submit Jewelry Asset"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Jewelry Details</CardTitle>
          <CardDescription>
            {isEditing ? "Update the details for your jewelry item." : "Please provide the details for your jewelry item."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="item-type">Item Type</Label>
            <Input id="item-type" placeholder="e.g., Diamond Ring, Gold Necklace, Luxury Watch" {...register("item-type")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe the item, including materials, brand, and any identifying marks." {...register("description")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Estimated Appraised Value ($)</Label>
            <Input id="value" type="number" placeholder="e.g., 15000" required {...register("value")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input id="documents" type="file" multiple {...register("documents")} />
            <p className="text-xs text-muted-foreground">
              Upload appraisal certificates, receipts, or high-quality photos.
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
