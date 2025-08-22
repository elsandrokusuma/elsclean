import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "5 Cara Merawat Sepatu Sneakers Putih Agar Tetap Kinclong",
    description: "Jaga sneakers putih kesayanganmu agar tidak menguning dengan tips mudah ini.",
    image: "https://placehold.co/600x400.png",
    imageHint: "white sneakers",
    link: "#",
  },
  {
    title: "Mengenal Jenis-Jenis Bahan Sepatu dan Cara Membersihkannya",
    description: "Beda bahan, beda cara penanganan. Pelajari cara membersihkan sepatu sesuai bahannya.",
    image: "https://placehold.co/600x400.png",
    imageHint: "shoe materials",
    link: "#",
  },
  {
    title: "DIY Repaint Sepatu: Bikin Sepatumu Jadi Baru Lagi!",
    description: "Ingin sepatumu tampil beda? Coba repaint sendiri di rumah dengan panduan lengkap ini.",
    image: "https://placehold.co/600x400.png",
    imageHint: "shoe painting",
    link: "#",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Blog Kami</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tips & Trik Perawatan Sepatu</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Dapatkan informasi terbaru seputar dunia perawatan sepatu, tips dari para ahli, dan ulasan produk terbaik.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="aspect-video w-full object-cover"
                  data-ai-hint={post.imageHint}
                />
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="mb-2 text-xl">{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="link" className="p-0 h-auto text-accent">
                  <Link href={post.link}>
                    Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
