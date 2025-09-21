import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function RegisterOrganizationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create an organization account</CardTitle>
        <CardDescription>
          Enter your organization's details to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="organization-name">Organization Name</Label>
            <Input id="organization-name" placeholder="Acme Inc." required />
        </div>
         <div className="grid gap-2">
            <Label htmlFor="tax-id">Tax ID</Label>
            <Input id="tax-id" placeholder="Your organization's tax identifier" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
         <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
         <div className="text-center text-sm">
          Registering as an individual?{' '}
          <Link href="/auth/register/individual" className="underline">
            Click here
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
