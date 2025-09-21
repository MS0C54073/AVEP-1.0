
"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { manualAssets } from '@/lib/data';

export default function AddOtherAssetPage() {
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const { register, handleSubmit, setValue, watch } = useForm();
  const isEditing = !!assetId;

  useEffect(() => {
    if (assetId) {
      const asset = manualAssets.find(a => a.id === assetId);
      if (asset && asset.category === "Other") {
        setValue("asset-name", asset.name);
        setValue("asset-category", asset.details?.category);
        setValue("description", asset.details?.description);
        setValue("value", asset.value);
      }
    }
  }, [assetId, setValue]);

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <AssetFormLayout title={isEditing ? "Edit Custom Asset" : "Submit Custom Asset"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Asset Details</CardTitle>
          <CardDescription>
            {isEditing ? "Update the details for your custom asset." : "Please provide the details for your custom asset."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="asset-name">Asset Name</Label>
            <Input id="asset-name" placeholder="e.g., Fine Art Collection, Cryptocurrency Wallet" {...register("asset-name")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset-category">Asset Category</Label>
            <Input id="asset-category" placeholder="e.g., Art, Digital Asset, Collectible" {...register("asset-category")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Provide a detailed description of the asset, including any unique identifiers." {...register("description")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Estimated Value ($)</Label>
            <Input id="value" type="number" placeholder="e.g., 75000" required {...register("value")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input id="documents" type="file" multiple {...register("documents")} />
            <p className="text-xs text-muted-foreground">
              Upload any documents that can help verify the ownership and value of this asset.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto">{isEditing ? "Save Changes" : "Submit for Verification"}</Button>
        </CardFooter>
      </form>
    </AssetFormLayout>
  );
}
