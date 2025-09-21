import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type AssetFormLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function AssetFormLayout({ title, children }: AssetFormLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/add-asset">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to Categories</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <Card>{children}</Card>
      </div>
    </div>
  );
}
