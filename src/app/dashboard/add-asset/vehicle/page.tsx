
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

export default function AddVehiclePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('assetId');
  const { register, handleSubmit, setValue, watch, control } = useForm();
  const isEditing = !!assetId;

  useEffect(() => {
    if (assetId) {
      const asset = manualAssets.find(a => a.id === assetId);
      if (asset && asset.category === "Vehicle") {
        setValue("vehicle-type", asset.details?.vehicleType);
        setValue("make", asset.details?.make);
        setValue("model", asset.details?.model);
        setValue("year", asset.details?.year);
        setValue("vin", asset.details?.vin);
        setValue("registration-number", asset.details?.registrationNumber);
        setValue("value", asset.value);
      }
    }
  }, [assetId, setValue]);

  const onSubmit = (data:any) => {
    if (isEditing && assetId) {
        const name = `${data.make} ${data.model} ${data.year}`;
        updateManualAsset(assetId, { 
            name,
            value: Number(data.value),
            details: {
                vehicleType: data['vehicle-type'],
                make: data.make,
                model: data.model,
                year: data.year,
                vin: data.vin,
                registrationNumber: data['registration-number'],
            }
        });
        router.push('/dashboard');
    } else {
        // Handle new asset creation
        console.log(data);
    }
  };

  return (
    <AssetFormLayout title={isEditing ? "Edit Vehicle Asset" : "Submit Vehicle Asset"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
          <CardDescription>
            {isEditing ? "Update the details for your vehicle." : "Please provide the details for your vehicle."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="vehicle-type">Vehicle Type</Label>
            <Select onValueChange={(value) => setValue('vehicle-type', value)} defaultValue={watch('vehicle-type')}>
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
              <Input id="make" placeholder="e.g., Honda" {...register("make")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <Input id="model" placeholder="e.g., Civic" {...register("model")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" placeholder="e.g., 2022" {...register("year")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vin">VIN / Chassis Number</Label>
              <Input id="vin" placeholder="Enter VIN" {...register("vin")} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="registration-number">Registration Number</Label>
            <Input id="registration-number" placeholder="Enter registration number" {...register("registration-number")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Estimated Value ($)</Label>
            <Input id="value" type="number" placeholder="e.g., 22000" required {...register("value")} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <Input id="documents" type="file" multiple {...register("documents")} />
            <p className="text-xs text-muted-foreground">
              Upload registration, proof of ownership, or insurance documents.
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
