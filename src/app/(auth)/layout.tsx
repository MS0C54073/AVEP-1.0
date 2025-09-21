import Link from "next/link";
import { Landmark } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <Landmark className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold">AVEP</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
