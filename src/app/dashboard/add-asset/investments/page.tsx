
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


function InvestmentsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const isEditing = !!assetId;

  useEffect(() => {
    if (isEditing) {
      const asset = manualAssets.find(a => a.id === assetId);
      if (asset && asset.category === "Investments") {
        setValue("investment-name", asset.name);
        setValue("investment-type", asset.details?.investmentType);
        setValue("quantity", asset.details?.quantity);
        setValue("value", asset.value);
        setValue("description", asset.details?.description);
        setValue("police-station", asset.details?.policeStation);
      }
    }
  }, [assetId, isEditing, setValue]);

  const onSubmit = (data:any) => {
    const assetData = { 
        name: data['investment-name'],
        value: Number(data.value),
        details: {
            investmentType: data['investment-type'],
            quantity: data.quantity,
            description: data.description,
            company: data['investment-name'],
            policeStation: data['police-station'],
        }
    };

    if (isEditing && assetId) {
        updateManualAsset(assetId, assetData);
    } else {
        createManualAsset({ category: "Investments", ...assetData });
    }
    router.push('/dashboard');
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
            <Input id="value" type="number" placeholder="e.g., 50000" {...register("value", { required: "Value is required" })} />
            {errors.value && <p className="text-sm text-destructive">{errors.value.message as string}</p>}
          </div>
          <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Provide a brief description of the investment, including any key terms or conditions." {...register("description")} />
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

export default function AddInvestmentsPage() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <InvestmentsForm />
        </Suspense>
    )
}
