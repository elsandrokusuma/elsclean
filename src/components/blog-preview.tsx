"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { getAllPosts } from "@/lib/blog-data";
import type { BlogPost } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function BlogPreview() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const posts = await getAllPosts(false); // Fetch from firestore
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts from Firestore:", error);
        toast({
          variant: "destructive",
          title: "Gagal memuat artikel",
          description: "Tidak dapat terhubung ke database.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="blog" className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Blog Kami</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Tips & Trik Perawatan Sepatu</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Dapatkan informasi terbaru seputar dunia perawatan sepatu, tips dari para ahli, dan ulasan produk terbaik.
            </p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center pt-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
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
                  <CardFooter className="p-6 pt-0 mt-auto">
                    <Button asChild variant="link" className="p-0 h-auto text-accent">
                      <span className="flex items-center">
                        Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
