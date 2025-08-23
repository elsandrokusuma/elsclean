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
import React from "react";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { db, type AdData } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const placeholderAds: AdData[] = [
  {
    id: '1',
    image: 'https://i.imgur.com/v8n2M1b.png',
    imageHint: 'clean shoes',
    title: 'Sepatu Kinclong Seperti Baru!',
    description: 'Layanan cuci sepatu premium dengan hasil maksimal.',
    link: '#',
  },
  {
    id: '2',
    image: 'https://placehold.co/1200x400.png',
    imageHint: 'delivery service',
    title: 'Layanan Antar Jemput',
    description: 'Gratis antar jemput untuk wilayah Jakarta.',
    link: '#',
  },
  {
    id: '3',
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
  const { toast } = useToast();
  
  useEffect(() => {
    try {
      const q = query(collection(db, "ads"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const adsData: AdData[] = [];
        querySnapshot.forEach((doc) => {
          adsData.push({ id: doc.id, ...doc.data() } as AdData);
        });

        if (adsData.length > 0) {
          setAds(adsData);
        } else {
          // If Firestore is empty, use placeholder data
          setAds(placeholderAds);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching ads from Firestore in real-time:", error);
        toast({
          variant: "destructive",
          title: "Gagal Memuat Iklan",
          description: "Menggunakan data contoh. Pastikan konfigurasi Firebase Anda benar.",
        });
        // On error, fallback to placeholder data
        setAds(placeholderAds);
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } catch (error) {
        console.error("Firebase not configured or other error:", error);
        toast({
          variant: "destructive",
          title: "Konfigurasi Firebase Tidak Ditemukan",
          description: "Menggunakan data contoh. Harap isi konfigurasi Firebase Anda di src/lib/firebase.ts",
        });
        setAds(placeholderAds);
        setLoading(false);
    }
  }, [toast]);

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
