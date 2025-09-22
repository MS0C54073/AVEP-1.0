
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createManualAsset, manualAssets, updateManualAsset } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';


function RealEstateForm() {
  "use client";

  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const isEditing = !!assetId;

  useEffect(() => {
    if (isEditing) {
      const asset = manualAssets.find(a => a.id === assetId);
      if (asset && asset.category === "Real Estate") {
        setValue("property-type", asset.details?.propertyType);
        setValue("address", asset.details?.address);
        setValue("city", asset.details?.city);
        setValue("country", asset.details?.country);
        setValue("deed-number", asset.details?.deedNumber);
        setValue("value", asset.value);
        setValue("police-station", asset.details?.policeStation);
      }
    }
  }, [assetId, isEditing, setValue]);

  const onSubmit = (data:any) => {
    const name = `${data.address}, ${data.city}`;
    const assetData = { 
        name,
        value: Number(data.value),
        details: {
            propertyType: data['property-type'],
            address: data.address,
            city: data.city,
            country: data.country,
            deedNumber: data['deed-number'],
            policeStation: data['police-station'],
        }
    };
      
    if (isEditing && assetId) {
        updateManualAsset(assetId, assetData);
    } else {
        createManualAsset({ category: "Real Estate", ...assetData });
    }
    router.push('/dashboard');
  };

  return (
    <AssetFormLayout title={isEditing ? "Edit Real Estate Asset" : "Submit Real Estate Asset"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            {isEditing ? "Update the details for your real estate property." : "Please provide the details for your real estate property."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="property-type">Property Type</Label>
            <Select onValueChange={(value) => setValue('property-type', value)} defaultValue={watch('property-type')}>
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
            <Textarea id="address" placeholder="Enter the full property address" {...register("address")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="e.g., New York" {...register("city")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="e.g., USA" {...register("country")} />
            </div>
          </div>
          <div className="grid gap-2">
              <Label htmlFor="deed-number">Deed / Title Number</Label>
              <Input id="deed-number" placeholder="Enter the official title or deed number" {...register("deed-number")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Estimated Market Value ($)</Label>
            <Input id="value" type="number" placeholder="e.g., 750000" {...register("value", { required: "Value is required" })} />
            {errors.value && <p className="text-sm text-destructive">{errors.value.message as string}</p>}
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
              Upload deed copy, property tax bill, or other ownership documents.
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

export default function AddRealEstatePage() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <RealEstateForm />
        </Suspense>
    )
}
