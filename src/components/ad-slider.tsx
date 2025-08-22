"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const ads = [
  {
    image: "https://placehold.co/1200x400/E8D9FC/2274A5",
    imageHint: "headphone sale",
    title: "Diskon Musim Panas!",
    description: "Diskon hingga 50% untuk headphone dan speaker pilihan.",
    link: "#",
  },
  {
    image: "https://placehold.co/1200x400/FFC4D6/2274A5",
    imageHint: "new speakers",
    title: "Pendatang Baru: AudioFlow X-Bass",
    description: "Rasakan bass yang dalam tidak seperti sebelumnya.",
    link: "#",
  },
  {
    image: "https://placehold.co/1200x400/A5D8FF/2274A5",
    imageHint: "free shipping",
    title: "Gratis Ongkir Seluruh Indonesia",
    description: "Nikmati gratis ongkir untuk semua pesanan di atas Rp500.000.",
    link: "#",
  },
];

export default function AdSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="w-full py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {ads.map((ad, index) => (
              <CarouselItem key={index}>
                <Link href={ad.link}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 relative">
                      <Image
                        src={ad.image}
                        alt={ad.title}
                        width={1200}
                        height={400}
                        className="aspect-[3/1] w-full object-cover"
                        data-ai-hint={ad.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                        <h3 className="text-2xl md:text-4xl font-bold text-white font-headline">
                          {ad.title}
                        </h3>
                        <p className="text-sm md:text-lg text-gray-200 mt-2">
                          {ad.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
