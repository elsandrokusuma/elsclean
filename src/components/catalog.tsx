"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { db, type ServiceData } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, limit } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const initialServices: Omit<ServiceData, 'id'>[] = [
  {
    name: "Deep Cleaning",
    price: "Rp 50.000",
    image: "https://i.imgur.com/WoCMx73.png",
    imageHint: "deep clean shoes",
    specs: ["Cuci Mendalam", "Sol Dalam & Luar", "Penghilang Noda", "Proses 2-3 Hari"],
    badge: "Paling Laris",
  },
  {
    name: "Fast Cleaning",
    price: "Rp 35.000",
    image: "https://i.imgur.com/WoCMx73.png",
    imageHint: "fast clean shoes",
    specs: ["Cuci Cepat", "Bagian Luar", "Wangi Menyegarkan", "Bisa Ditunggu"],
    badge: "Layanan Cepat",
  },
  {
    name: "Unyellowing",
    price: "Rp 75.000",
    image: "https://i.imgur.com/WoCMx73.png",
    imageHint: "shoe unyellowing",
    specs: ["Hilangkan Kuning", "Sol Karet", "Kembali Putih", "Aman Untuk Bahan"],
  },
  {
    name: "Repaint",
    price: "Rp 150.000",
    image: "https://i.imgur.com/WoCMx73.png",
    imageHint: "shoe repaint",
    specs: ["Ganti Warna", "Cat Premium", "Tahan Lama", "Banyak Pilihan Warna"],
  },
];

const placeholderDataWithIds = initialServices.map((service, index) => ({ ...service, id: `placeholder-${index}` }));

export default function Catalog() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAndSeedServices = async () => {
      setLoading(true);
      const servicesCollection = collection(db, "layanan");
      
      try {
        const snapshot = await getDocs(query(servicesCollection, limit(1)));

        if (snapshot.empty) {
          console.log("Firestore 'layanan' collection is empty. Seeding with initial data.");
          for (const service of initialServices) {
            await addDoc(servicesCollection, service);
          }
          // After seeding, fetch all data to display
          const allDocsSnapshot = await getDocs(servicesCollection);
          const servicesData = allDocsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceData));
          setServices(servicesData);
        } else {
          const allDocsSnapshot = await getDocs(servicesCollection);
          const servicesData = allDocsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceData));
          setServices(servicesData);
        }
      } catch (error) {
        console.error("Error accessing Firestore, falling back to placeholder data:", error);
        setServices(placeholderDataWithIds);
        toast({
          variant: "destructive",
          title: "Gagal memuat layanan",
          description: "Tidak dapat terhubung ke database. Menampilkan data contoh.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAndSeedServices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateWhatsAppLink = (serviceName: string) => {
    const text = `Halo, saya tertarik dengan layanan *${serviceName}* dari elsclean.id. Bisa tolong berikan info lebih lanjut?`;
    return `https://wa.me/6285536979866?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catalog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Layanan Kami</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Pilih layanan yang paling sesuai untuk membuat sepatumu kembali bersih dan prima seperti baru.
            </p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center pt-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-2 gap-4 pt-12 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {services.map((service) => (
              <Card key={service.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="relative p-0">
                  <Image
                    alt={service.name}
                    className="aspect-square w-full object-cover"
                    height={300}
                    src={service.image}
                    width={300}
                    data-ai-hint={service.imageHint}
                  />
                  {service.badge && (
                    <Badge className="absolute top-2 right-2 text-xs px-2 py-0.5 md:top-4 md:right-4 md:text-sm md:px-2.5 md:py-0.5 bg-accent text-accent-foreground">{service.badge}</Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-grow p-3 md:p-4">
                  <CardTitle className="text-base md:text-lg">{service.name}</CardTitle>
                  <p className="text-lg md:text-2xl font-semibold text-primary mt-1 md:mt-2">{service.price}</p>
                  <ul className="mt-3 space-y-1 text-xs text-muted-foreground md:mt-4 md:space-y-2 md:text-sm">
                    {service.specs.map((spec) => (
                      <li key={spec} className="flex items-center">
                        <svg className="mr-2 h-3 w-3 md:h-4 md:w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-3 pt-0 md:p-4 md:pt-0">
                    <Button asChild className="w-full text-xs h-9 md:text-sm md:h-10">
                        <Link href={generateWhatsAppLink(service.name)} target="_blank" rel="noopener noreferrer">
                            Pesan Layanan
                        </Link>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
