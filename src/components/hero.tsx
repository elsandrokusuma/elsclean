"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import React from "react";

const heroItems = [
  {
    headline: "Unleash Pure Sound.",
    description: "Experience music like never before with our state-of-the-art headphones.",
    image: "https://placehold.co/1200x800.png",
    imageHint: "professional headphones",
  },
  {
    headline: "Fill Your Space with Music.",
    description: "Powerful, crystal-clear studio monitors for creators and audiophiles.",
    image: "https://placehold.co/1200x800.png",
    imageHint: "studio speakers",
  },
  {
    headline: "Capture Every Nuance.",
    description: "Professional-grade microphones for podcasts, streaming, and recording.",
    image: "https://placehold.co/1200x800.png",
    imageHint: "condenser microphone",
  },
];

export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="w-full h-[70vh] min-h-[600px] relative">
      <Carousel 
        className="w-full h-full" 
        opts={{ loop: true }} 
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {heroItems.map((item, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="w-full h-full relative">
                <Image
                  src={item.image}
                  alt={item.headline}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-50"
                  data-ai-hint={item.imageHint}
                />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                      <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
                        {item.headline}
                      </h1>
                      <p className="text-lg text-gray-200 md:text-xl">
                        {item.description}
                      </p>
                      <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Link href="#catalog">
                            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                          <Link href="#advisor">
                            Get Advice
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 border-0" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 border-0" />
      </Carousel>
    </section>
  );
}
