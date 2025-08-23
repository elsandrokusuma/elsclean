"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { db, type AdData } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, limit } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const placeholderAds: Omit<AdData, 'id'>[] = [
  {
    image: 'https://i.imgur.com/GM1QdyU.gif',
    imageHint: 'clean shoes',
    title: 'Sepatu Kinclong Seperti Baru!',
    description: 'Layanan cuci sepatu premium dengan hasil maksimal.',
    link: '#',
  },
  {
    image: 'https://i.imgur.com/q37ZBIr.gif',
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
  {
    image: 'https://i.imgur.com/50B9Zo2.gif',
    imageHint: 'special promotion',
    title: 'Promo Spesial Musim Hujan!',
    description: 'Dapatkan diskon 20% untuk layanan Deep Cleaning. Jangan biarkan sepatumu kotor!',
    link: '#',
  },
];

const placeholderDataWithIds = placeholderAds.map((ad, index) => ({ ...ad, id: `placeholder-${index}` }));

// Helper function to check if a string is a valid URL
const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

export default function AdSlider() {
  const [ads, setAds] = useState<AdData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAndSeedAds = async () => {
      setLoading(true);
      const adsCollection = collection(db, "ads");
      
      try {
        const q = query(adsCollection, limit(1));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          // If empty, seed the collection and then set the state
          console.log("Firestore 'ads' collection is empty. Seeding with placeholder data.");
          const seededAds: AdData[] = [];
          for (const ad of placeholderAds) {
            const docRef = await addDoc(adsCollection, ad);
            seededAds.push({ id: docRef.id, ...ad });
          }
          setAds(seededAds);
        } else {
          // If not empty, fetch all documents
          const allDocsSnapshot = await getDocs(adsCollection);
          const adsData = allDocsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdData));
          setAds(adsData);
        }
      } catch (error) {
        console.error("Error accessing Firestore, falling back to placeholder data:", error);
        setAds(placeholderDataWithIds);
        toast({
          variant: "destructive",
          title: "Gagal memuat iklan",
          description: "Tidak dapat terhubung ke database. Menampilkan data contoh.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAndSeedAds();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
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
            {ads.map((ad, index) => {
              // Fallback for invalid image URLs from Firestore
              const imageUrl = isValidUrl(ad.image) ? ad.image : 'https://i.imgur.com/gYKVL3s.png';
              
              return (
                <CarouselItem key={ad.id}>
                  <Link href={ad.link} className="outline-none ring-ring focus-visible:ring-2 rounded-lg">
                      <Card className="overflow-hidden">
                        <CardContent className="p-0 relative flex items-center justify-center text-center">
                          <Image
                            src={imageUrl}
                            alt={ad.title}
                            width={1200}
                            height={400}
                            className="aspect-[3/1] w-full object-cover"
                            data-ai-hint={ad.imageHint}
                            priority={index === 0}
                          />
                        </CardContent>
                      </Card>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
