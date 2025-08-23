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
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { db, type AdData } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const placeholderAds: Omit<AdData, 'id'>[] = [
  {
    image: 'https://storage.googleapis.com/stella-images/elsclean/888a75e2-2a74-4217-a16f-124b611c385b.png',
    imageHint: 'clean shoes',
    title: 'Sepatu Kinclong Seperti Baru!',
    description: 'Layanan cuci sepatu premium dengan hasil maksimal.',
    link: '#',
  },
  {
    image: 'https://placehold.co/1200x400.png',
    imageHint: 'delivery service',
    title: 'Layanan Antar Jemput',
    description: 'Gratis antar jemput untuk wilayah Jakarta.',
    link: '#',
  },
  {
    image: 'https://placehold.co/1200x400.png',
    imageHint: 'satisfaction guarantee',
    title: 'Garansi Kepuasan',
    description: 'Tidak puas dengan hasilnya? Kami cuci ulang gratis.',
    link: '#',
  },
];

export default function AdSlider() {
  const [ads, setAds] = useState<AdData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSeedAds = async () => {
      setLoading(true);
      try {
        const adsCollection = collection(db, "ads");
        const snapshot = await getDocs(adsCollection);

        if (snapshot.empty) {
          console.log("Firestore 'ads' collection is empty. Seeding with placeholder data...");
          const seededAds: AdData[] = [];
          for (const ad of placeholderAds) {
            const docRef = await addDoc(adsCollection, ad);
            seededAds.push({ id: docRef.id, ...ad });
          }
          setAds(seededAds);
        } else {
          const adsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdData));
          setAds(adsData);
        }
      } catch (error) {
        console.error("Error fetching or seeding ads from Firestore:", error);
        // Fallback to placeholder data if Firestore is unreachable
        const placeholderDataWithIds = placeholderAds.map((ad, index) => ({ ...ad, id: `placeholder-${index}` }));
        setAds(placeholderDataWithIds);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSeedAds();
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
                <Link href={ad.link} legacyBehavior>
                  <a className="outline-none ring-ring focus-visible:ring-2 rounded-lg">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0 relative flex items-center justify-center text-center">
                        <Image
                          src={ad.image}
                          alt={ad.title}
                          width={1200}
                          height={400}
                          className="aspect-[3/1] w-full object-cover"
                          data-ai-hint={ad.imageHint}
                          priority={ads.indexOf(ad) === 0}
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
                  </a>
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
