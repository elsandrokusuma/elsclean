"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespon pesan Anda.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Hubungi Kami</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Punya pertanyaan tentang layanan kami atau butuh bantuan? Kami siap membantu. Kirim pesan atau temukan detail kontak kami di bawah.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-md bg-muted p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-muted-foreground">support@elsclean.id</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-md bg-muted p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Telepon</h3>
                  <p className="text-muted-foreground">(+62) 855-3697-9866</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-md bg-muted p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Lokasi</h3>
                  <p className="text-muted-foreground">
                    Perum Griya Persada, JI. Werkudoro no 21 Mojorejo, <br/>
                    Ngemplak, Kab.Boyolali</p>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Form Kontak</CardTitle>
              <CardDescription>Isi form di bawah dan kami akan segera menghubungi Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Nama</FormLabel><FormControl><Input placeholder="Nama Anda" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="email@anda.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem><FormLabel>Subjek</FormLabel><FormControl><Input placeholder="Pertanyaan tentang..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem><FormLabel>Pesan</FormLabel><FormControl><Textarea placeholder="Tuliskan pesan Anda..." rows={5} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                    <Send className="mr-2 h-4 w-4" /> Kirim Pesan
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
