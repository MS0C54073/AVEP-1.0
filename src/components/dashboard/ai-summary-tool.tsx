"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BotMessageSquare, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getAssetDataForAI } from "@/lib/data";
import { getSummary } from "@/app/actions";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  assetData: z.string().min(10, {
    message: "Asset data must be at least 10 characters.",
  }),
});

export default function AiSummaryTool() {
  const { toast } = useToast();
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetData: getAssetDataForAI(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSummary("");
    try {
      const result = await getSummary(values.assetData);
      if (result.success && result.summary) {
        setSummary(result.summary);
        toast({
          title: "Success",
          description: "Summary generated successfully.",
        });
      } else {
        throw new Error(result.error || "An unknown error occurred.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate summary.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>AI-Powered Asset Summary</CardTitle>
              <CardDescription>
                Provide asset and transaction data to generate a financial health summary.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="assetData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verified Asset & Transaction Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste asset and transaction data here..."
                        className="min-h-[300px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BotMessageSquare className="text-primary"/>
            Generated Summary
            </CardTitle>
          <CardDescription>
            This is an AI-generated assessment of financial health.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Analyzing data...</p>
              </div>
            </div>
          )}
          {!isLoading && !summary && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground p-4">
                <p>Your summary will appear here once generated.</p>
              </div>
            </div>
          )}
          {summary && (
             <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {summary.split('\n').map((line, index) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                        return <h3 key={index} className="font-semibold text-foreground !mt-4 !mb-2">{line.replaceAll('**', '')}</h3>
                    }
                    if (line.startsWith('* ')) {
                         return <p key={index} className="!my-1 ml-4 text-muted-foreground">{line}</p>
                    }
                     if (line.trim() === '---') {
                         return <Separator key={index} className="my-4" />
                     }
                    return <p key={index} className="text-muted-foreground !my-1">{line}</p>
                })}
            </div>
          )}
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">
                *This summary is for informational purposes only.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
