"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

const testimonials = [
  {
    name: "Andi R.",
    role: "Pecinta Sneakers",
    quote: "Hasilnya luar biasa! Sepatu Jordan saya yang kusam sekarang kelihatan seperti baru lagi setelah di-deep clean. Pelayanannya juga ramah dan cepat. Sangat direkomendasikan!",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "man portrait"
  },
  {
    name: "Bunga C.",
    role: "Karyawan Swasta",
    quote: "Layanan antar jemputnya sangat membantu di tengah kesibukan. Sepatu kerja saya kembali bersih dan wangi tanpa harus keluar rumah. Terima kasih elsclean.id!",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait"
  },
  {
    name: "Rian S.",
    role: "Mahasiswa",
    quote: "Awalnya ragu untuk repaint sepatu, tapi hasilnya melebihi ekspektasi. Warnanya solid dan rapi banget. Teman-teman sampai mengira saya beli sepatu baru. Keren!",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "man smiling"
  },
    {
    name: "Sari W.",
    role: "Ibu Rumah Tangga",
    quote: "Sepatu sekolah anak-anak jadi bersih lagi! Gak perlu beli baru tiap tahun ajaran. Praktis dan hemat banget layanan dari elsclean.id.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "smiling woman"
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <Card className="bg-secondary/50 border-0 shadow-none h-full">
      <CardContent className="p-6">
        <blockquote className="text-base italic text-foreground">
          “{testimonial.quote}”
        </blockquote>
      </CardContent>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
);

export default function Testimonials() {
  const isMobile = useIsMobile();

  return (
    <section id="testimonials" className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Apa Kata Pelanggan Kami</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Lihat bagaimana kami membantu para pelanggan setia merawat sepatu kesayangan mereka.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl pt-12">
          {isMobile ? (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-sm mx-auto"
            >
              <CarouselContent className="-ml-2">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 basis-1/2">
                    <div className="p-1 h-full">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="flex -left-4" />
              <CarouselNext className="flex -right-4" />
            </Carousel>
          ) : (
            <div className="grid items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}