
import { AddAssetDialog } from "@/components/dashboard/add-asset-dialog";
import { GlobalSearch } from "@/components/dashboard/global-search";
import { Button } from "@/components/ui/button";
import { user } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AuthenticatedHomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          Welcome back, {user.name}!
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          You are in the right place. What would you like to do today?
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="w-full sm:w-auto">
             <GlobalSearch />
          </div>
          <AddAssetDialog />
        </div>
        <div className="mt-12">
            <Button variant="link" asChild>
                <Link href="/dashboard">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
