import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "The Ultimate Guide to Choosing Headphones",
    description: "Discover the key factors to consider when selecting the perfect pair of headphones for your lifestyle.",
    image: "https://placehold.co/600x400.png",
    imageHint: "headphones lifestyle",
    link: "#",
  },
  {
    title: "Setting Up Your Home Studio: A Beginner's Guide",
    description: "Everything you need to know to create a professional-sounding home studio on a budget.",
    image: "https://placehold.co/600x400.png",
    imageHint: "home studio",
    link: "#",
  },
  {
    title: "Hi-Fi vs. Lo-Fi: Understanding Audio Quality",
    description: "A deep dive into what high-fidelity audio means and how it compares to other formats.",
    image: "https://placehold.co/600x400.png",
    imageHint: "audio waves",
    link: "#",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Blog</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">News, Tips & Reviews</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay updated with the latest in audio technology, get expert tips, and read our in-depth product reviews.
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
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
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
