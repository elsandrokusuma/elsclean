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
import { collection, onSnapshot, query, addDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const placeholderAds: Omit<AdData, 'id'>[] = [
  {
    image: 'https://i.imgur.com/v8n2M1b.png',
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
  const { toast } = useToast();
  
  useEffect(() => {
    // A function to seed the database if it's empty
    const seedDatabase = async () => {
        console.log("Firestore 'ads' collection is empty. Seeding with placeholder data...");
        try {
            const adsCollection = collection(db, "ads");
            for (const ad of placeholderAds) {
                await addDoc(adsCollection, ad);
            }
            console.log("Database seeded successfully.");
        } catch (seedError) {
            console.error("Error seeding database:", seedError);
             toast({
              variant: "destructive",
              title: "Gagal Membuat Data Contoh",
              description: "Tidak dapat menambahkan data awal ke Firestore.",
            });
        }
    };

    try {
      const q = query(collection(db, "ads"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // If the collection is empty, seed it with initial data.
        if (querySnapshot.empty) {
            seedDatabase();
            setLoading(false); // Stop loading, the new data will trigger a re-render
            return;
        }

        const adsData: AdData[] = [];
        querySnapshot.forEach((doc) => {
          adsData.push({ id: doc.id, ...doc.data() } as AdData);
        });

        setAds(adsData);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching ads from Firestore in real-time:", error);
        toast({
          variant: "destructive",
          title: "Gagal Memuat Iklan",
          description: "Menggunakan data contoh. Pastikan konfigurasi Firebase Anda benar.",
        });
        // On error, create AdData array from placeholderAds with dummy IDs
        const placeholderAdsWithIds = placeholderAds.map((ad, index) => ({...ad, id: `placeholder-${index}`}));
        setAds(placeholderAdsWithIds);
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
        const placeholderAdsWithIds = placeholderAds.map((ad, index) => ({...ad, id: `placeholder-${index}`}));
        setAds(placeholderAdsWithIds);
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
