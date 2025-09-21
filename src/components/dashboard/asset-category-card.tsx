import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type AssetCategoryCardProps = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export function AssetCategoryCard({
  name,
  icon,
  href,
}: AssetCategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="group hover:bg-muted/50 transition-colors h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              {icon}
            </div>
            <CardTitle>{name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow"></CardContent>
        <div className="p-6 pt-0 flex justify-end">
            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Card>
    </Link>
  );
}
