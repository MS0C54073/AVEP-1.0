
"use client";

import { Suspense } from 'react';
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
import { createManualAsset, manualAssets, updateManualAsset } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';

function OtherAssetForm() {
  const router = useRouter();
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
        setValue("police-station", asset.details?.policeStation);
      }
    }
  }, [assetId, setValue]);

  const onSubmit = (data:any) => {
    const assetData = { 
        name: data['asset-name'],
        value: Number(data.value),
        details: {
            category: data['asset-category'],
            description: data.description,
            policeStation: data['police-station'],
        }
    };
      
    if (isEditing && assetId) {
        updateManualAsset(assetId, assetData);
    } else {
        createManualAsset({ category: "Other", ...assetData });
    }
    router.push('/dashboard');
  };

  return (
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

          <Separator />
          
          <div className="grid gap-4">
              <h3 className="text-lg font-medium">Police Clearance</h3>
              <div className="grid gap-2">
                  <Label htmlFor="police-station">Cleared From Police Station</Label>
                   <Select onValueChange={(value) => setValue('police-station', value)} defaultValue={watch('police-station')}>
                      <SelectTrigger id="police-station">
                          <SelectValue placeholder="Select police station" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="central">Central Police Station</SelectItem>
                          <SelectItem value="emmasdale">Emmasdale Police Station</SelectItem>
                          <SelectItem value="kabwata">Kabwata Police Station</SelectItem>
                          <SelectItem value="woodlands">Woodlands Police Station</SelectItem>
                          <SelectItem value="chelstone">Chelstone Police Station</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="police-clearance-form">Police Clearance Form</Label>
                  <Input id="police-clearance-form" type="file" {...register("police-clearance-form")} />
                  <p className="text-xs text-muted-foreground">
                      Upload the scanned copy of the police clearance form.
                  </p>
              </div>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input id="documents" type="file" multiple {...register("documents")} />
            <p className="text-xs text-muted-foreground">
              Upload any documents that can help verify the ownership and value of this asset.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full sm:w-auto">{isEditing ? "Save Changes" : "Submit for Verification"}</Button>
        </CardFooter>
      </form>
  );
}


export default function AddOtherAssetPage() {
    const searchParams = useSearchParams();
    const assetId = searchParams.get('assetId');
    const isEditing = !!assetId;

    return (
        <AssetFormLayout title={isEditing ? "Edit Custom Asset" : "Submit Custom Asset"}>
            <Suspense fallback={<div>Loading...</div>}>
                <OtherAssetForm />
            </Suspense>
        </AssetFormLayout>
    )
}
