"use client";

import {
  Building,
  HandPlatter,
  Landmark,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function AddAssetDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add a New Asset</DialogTitle>
          <DialogDescription>
            How would you like to add your asset for verification?
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <Link href="#">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-4">
                   <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Landmark className="w-6 h-6" />
                    </div>
                  <CardTitle>Link Financial Account</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect to your bank or financial institution to automatically verify assets like cash, stocks, and investments.
                </p>
              </CardContent>
               <div className="p-6 pt-0 flex justify-end">
                    <ArrowRight className="w-5 h-5 text-primary" />
                </div>
            </Card>
          </Link>
           <Link href="/dashboard/add-asset">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                 <div className="flex items-center gap-4">
                     <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <HandPlatter className="w-6 h-6" />
                    </div>
                  <CardTitle>Manual Asset Submission</CardTitle>
                 </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Submit details and documents for physical assets like vehicles, real estate, electronics, and more.
                </p>
              </CardContent>
               <div className="p-6 pt-0 flex justify-end">
                    <ArrowRight className="w-5 h-5 text-primary" />
                </div>
            </Card>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
