
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { user } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";


export default function ProfilePage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
        }
    });

    const getInitials = (name: string) => {
        const names = name.split(" ");
        return names
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    };

    const avatarUrl = PlaceHolderImages.find(p => p.id === 'user-avatar')?.imageUrl ?? "https://picsum.photos/seed/1/100/100";

    const onSubmit = (data: any) => {
        // Handle profile update logic
        console.log(data);
    }

  return (
    <DashboardShell title="Profile" description="Manage your profile settings.">
        <Card>
            <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
                 <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={avatarUrl} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Change Photo</Button>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" {...register("name", { required: "Name is required" })} />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
                         {errors.email && <p className="text-sm text-destructive">{errors.email.message as string}</p>}
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                    </div>
                 </form>
            </CardContent>
        </Card>
    </DashboardShell>
  );
}
