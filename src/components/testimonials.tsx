"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React from "react";
import testimonialsData from '@/lib/placeholder-images.json';

const testimonials = testimonialsData.avatars;

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <Card className="flex flex-col bg-primary text-primary-foreground border-0 shadow-none h-full">
      <CardContent className="p-6 flex-grow">
        <blockquote className="text-base italic">
          “{testimonial.quote}”
        </blockquote>
      </CardContent>
      <CardHeader className="mt-auto p-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-primary-foreground/80">{testimonial.role}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
);

export default function Testimonials() {

  return (
    <section id="testimonials" className="w-full py-12 md:py-16">
       <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Apa Kata Pelanggan Kami</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Lihat bagaimana kami membantu para pelanggan setia merawat sepatu kesayangan mereka.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl pt-5 md:pt-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-12px] sm:left-0" />
              <CarouselNext className="right-[-12px] sm:right-0" />
            </Carousel>
        </div>
      </div>
    </section>
  );
}
