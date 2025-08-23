"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { getAds, type AdData } from "@/lib/firebase";

export default function AdSlider() {
  const [ads, setAds] = useState<AdData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      const adsData = await getAds();
      setAds(adsData);
      setLoading(false);
    }
    fetchAds();
  }, []);
  
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  if (loading) {
    return (
       <section className="w-full py-6 md:py-12 flex justify-center">
        <div className="container px-4 md:px-6">
            <div className="w-full aspect-[3/1] bg-muted animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6 md:py-12 flex justify-center">
      <div className="container px-4 md:px-6">
        <Carousel
          className="w-full"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {ads.map((ad) => (
              <CarouselItem key={ad.id}>
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
                        priority
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
