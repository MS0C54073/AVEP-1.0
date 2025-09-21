
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

export default function RegisterIndividualPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = () => {
    toast({
        title: "Registration Successful",
        description: "Your account has been created.",
    });
    router.push("/dashboard/home");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create an Individual Account</CardTitle>
        <CardDescription>
          Welcome! To get started, please enter your information below to
          create your secure account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" {...register("firstName", { required: "First name is required" })} />
               {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message as string}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" {...register("lastName", { required: "Last name is required" })} />
               {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message as string}</p>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
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
            Create account
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
          <div className="text-center text-sm">
            Registering as an organization?{" "}
            <Link href="/register/organization" className="underline">
              Click here
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
