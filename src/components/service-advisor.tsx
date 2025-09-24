"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { shoeAdvisor, type ShoeAdvisorOutput } from "@/ai/flows/shoe-advisor";

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
  shoeType: z.string().min(3, {
    message: "Jenis sepatu harus diisi.",
  }),
  material: z.string().min(3, {
    message: "Bahan sepatu harus diisi.",
  }),
  problem: z.string().min(10, {
    message: "Jelaskan masalah pada sepatu Anda secara singkat.",
  }),
});

export default function ServiceAdvisor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShoeAdvisorOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shoeType: "",
      material: "",
      problem: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const recommendation = await shoeAdvisor(values);
      setResult(recommendation);
    } catch (error) {
      console.error("Error getting recommendation:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Gagal mendapatkan rekomendasi. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="advisor" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Konsultasi AI</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Dapatkan Solusi Terbaik</h2>
            <p className="max-w-[600px] text-sm text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Jawab beberapa pertanyaan singkat, dan AI kami akan merekomendasikan perawatan yang paling tepat untuk sepatu kesayangan Anda.
            </p>
          </div>
          <Card className="w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Dapatkan Rekomendasi</CardTitle>
                  <CardDescription>Isi formulir di bawah ini.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="shoeType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Sepatu</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Sneakers, Boots, Pantofel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bahan</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Kanvas, Kulit, Suede" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="problem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Masalah</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Kotor, berjamur, warna pudar..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Dapatkan Rekomendasi Saya
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
                <CardTitle>Rekomendasi Perawatan AI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold font-headline">Layanan yang Direkomendasikan</h3>
                  <p className="text-muted-foreground">{result.recommendation}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-headline">Alasan</h3>
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
