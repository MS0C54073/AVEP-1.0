
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
import { user } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: user.email,
      password: "password123",
    }
  });

  const handleLogin = (data: any) => {
    // In a real app, you'd have more secure authentication.
    // For now, we check against hardcoded data.
    if (data.email === user.email && data.password === "password123") {
      toast({
          title: "Login Successful",
          description: "Welcome back!",
      });
      router.push("/dashboard/home");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message as string}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
             {errors.password && <p className="text-sm text-destructive">{errors.password.message as string}</p>}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full" type="button">
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register/individual" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
