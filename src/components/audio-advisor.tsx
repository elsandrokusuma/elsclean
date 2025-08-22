"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { audioAdvisor, type AudioAdvisorOutput } from "@/ai/flows/audio-advisor";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  usageScenario: z.string().min(10, {
    message: "Please describe your usage scenario in at least 10 characters.",
  }),
  budget: z.string().min(2, {
    message: "Please enter a budget.",
  }),
  soundPreferences: z.string().min(5, {
    message: "Please describe your sound preferences.",
  }),
});

export default function AudioAdvisor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AudioAdvisorOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usageScenario: "",
      budget: "",
      soundPreferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const recommendation = await audioAdvisor(values);
      setResult(recommendation);
    } catch (error) {
      console.error("Error getting recommendation:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get recommendation. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="advisor" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">AI Audio Advisor</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Find Your Perfect Sound</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Answer a few simple questions, and our AI will recommend the ideal audio equipment tailored to your needs and preferences.
            </p>
          </div>
          <Card className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Get Recommendation</CardTitle>
                  <CardDescription>Fill out the form below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="usageScenario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage Scenario</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Gaming, music production, commuting..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., $100 - $300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soundPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sound Preferences</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Bass-heavy, neutral, clear highs..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Get My Recommendation
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
        {result && (
          <div className="mt-12">
            <Card className="animate-in fade-in-50 duration-500">
              <CardHeader>
                <CardTitle>Your AI Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold font-headline">Recommended Equipment</h3>
                  <p className="text-muted-foreground">{result.recommendation}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-headline">Reasoning</h3>
                  <p className="text-muted-foreground">{result.reasoning}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
