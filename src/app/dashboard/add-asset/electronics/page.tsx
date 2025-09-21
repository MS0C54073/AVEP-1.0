
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { manualAssets, updateManualAsset } from '@/lib/data';

export default function AddElectronicsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const assetId = searchParams.get('assetId');
    const { register, handleSubmit, setValue, watch } = useForm();
    const isEditing = !!assetId;

    useEffect(() => {
        if (assetId) {
        const asset = manualAssets.find(a => a.id === assetId);
        if (asset && asset.category === "Electronics") {
            setValue("type", asset.details?.type.toLowerCase().replace(' ', ''));
            setValue("brand", asset.details?.brand);
            setValue("model", asset.details?.model);
            setValue("serial-number", asset.details?.serialNumber);
            setValue("purchase-date", asset.details?.purchaseDate);
            setValue("purchase-price", asset.details?.purchasePrice);
            setValue("value", asset.value);
        }
        }
    }, [assetId, setValue]);

    const onSubmit = (data:any) => {
        if (isEditing && assetId) {
            const name = `${data.brand} ${data.model}`;
            updateManualAsset(assetId, { 
                name,
                value: Number(data.value),
                details: {
                    type: data.type,
                    brand: data.brand,
                    model: data.model,
                    serialNumber: data['serial-number'],
                    purchaseDate: data['purchase-date'],
                    purchasePrice: data['purchase-price'],
                }
            });
            router.push('/dashboard');
        } else {
            // Handle new asset creation
            console.log(data);
        }
    };

  return (
    <AssetFormLayout title={isEditing ? "Edit Electronics Asset" : "Submit Electronics Asset"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Electronics Details</CardTitle>
          <CardDescription>
            {isEditing ? "Update the details for your electronic device." : "Please provide the details for your electronic device."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select onValueChange={(value) => setValue('type', value)} defaultValue={watch('type')}>
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
              <Input id="brand" placeholder="e.g., Apple" {...register("brand")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" placeholder="e.g., MacBook Pro 16&quot;" {...register("model")} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="serial-number">Serial Number</Label>
            <Input id="serial-number" placeholder="Enter the device's serial number" {...register("serial-number")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="purchase-date">Purchase Date</Label>
                  <Input id="purchase-date" type="date" {...register("purchase-date")} />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="purchase-price">Purchase Price ($)</Label>
                  <Input id="purchase-price" type="number" placeholder="e.g., 2500" {...register("purchase-price")} />
              </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Estimated Current Value ($)</Label>
            <Input id="value" type="number" placeholder="e.g., 1800" required {...register("value")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input id="documents" type="file" {...register("documents")} />
            <p className="text-xs text-muted-foreground">
              Upload purchase invoice, warranty card, or photos.
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
