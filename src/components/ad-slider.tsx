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
    image: "/clean-shoes.jpeg",
    imageHint: "clean shoes",
    title: "Sepatu Kinclong Seperti Baru!",
    description: "Layanan cuci sepatu premium dengan hasil maksimal.",
    link: "#",
  },
  {
    image: "https://placehold.co/1200x400.png",
    imageHint: "delivery service",
    title: "Layanan Antar Jemput",
    description: "Gratis antar jemput untuk wilayah Jakarta.",
    link: "#",
  },
  {
    image: "https://placehold.co/1200x400.png",
    imageHint: "satisfaction guarantee",
    title: "Garansi Kepuasan",
    description: "Tidak puas dengan hasilnya? Kami cuci ulang gratis.",
    link: "#",
  },
];

export default function AdSlider() {
    const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  return (
    <section className="w-full py-6 md:py-12 flex justify-center">
      <div className="container px-4 md:px-6">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
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
                    <CardContent className="p-0 relative flex items-center justify-center text-center">
                      <Image
                        src={ad.image}
                        alt={ad.title}
                        width={1200}
                        height={400}
                        className="aspect-[3/1] w-full object-cover"
                        data-ai-hint={ad.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
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
