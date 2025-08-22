import Header from '@/components/header';
import AdSlider from '@/components/ad-slider';
import Catalog from '@/components/catalog';
import AudioAdvisor from '@/components/audio-advisor';
import Testimonials from '@/components/testimonials';
import BlogPreview from '@/components/blog-preview';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AdSlider />
        <Catalog />
        <AudioAdvisor />
        <Testimonials />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
