
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function RegisterOrganizationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = () => {
     toast({
        title: "Registration Successful",
        description: "Your organization's account has been created.",
    });
    router.push("/dashboard/home");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Create an Organization Account
        </CardTitle>
        <CardDescription>
          Welcome! Please provide your organization&apos;s details below to
          create a new account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="organization-name">Organization Name</Label>
            <Input id="organization-name" placeholder="Acme Inc." {...register("organizationName", { required: "Organization name is required" })} />
            {errors.organizationName && <p className="text-sm text-destructive">{errors.organizationName.message as string}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tax-id">Tax ID</Label>
            <Input
              id="tax-id"
              placeholder="Your organization's tax identifier"
              {...register("taxId", { required: "Tax ID is required" })}
            />
            {errors.taxId && <p className="text-sm text-destructive">{errors.taxId.message as string}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message as string}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}/>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message as string}</p>}
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
          <div className="text-center text-sm">
            Registering as an individual?{" "}
            <Link href="/register/individual" className="underline">
              Click here
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
