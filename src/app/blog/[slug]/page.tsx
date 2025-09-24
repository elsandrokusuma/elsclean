import { getPostBySlug } from '@/lib/blog-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// By removing generateStaticParams, we are making this a dynamic page.
// Next.js will render the page on-demand for each request.

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: `${post.title} | elsclean.id Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-foreground">
              <Link href="/#blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Artikel
              </Link>
            </Button>
          </div>
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{post.title}</h1>
              <p className="text-lg text-muted-foreground">{post.description}</p>
              <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{post.author}</span>
                <span>&bull;</span>
                <span>{post.date}</span>
              </div>
            </header>

            <Card className="overflow-hidden mb-8">
              <CardHeader className="p-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="w-full object-cover aspect-video"
                  priority
                  data-ai-hint={post.imageHint}
                />
              </CardHeader>
            </Card>

            <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-accent hover:prose-a:text-accent/90 prose-strong:text-foreground">
                {post.content.map((block, index) => {
                    switch (block.type) {
                        case 'paragraph':
                            return <p key={index} className="mb-6 text-lg leading-relaxed">{block.text}</p>;
                        case 'heading':
                            return <h2 key={index} className="text-3xl font-bold mt-10 mb-4">{block.text}</h2>;
                        default:
                            return null;
                    }
                })}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
