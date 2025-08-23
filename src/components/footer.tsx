import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center space-x-2">
               <Image src="https://i.imgur.com/VDew6A8.png" alt="elsclean.id logo" width={120} height={40} data-ai-hint="company logo" className="brightness-0 invert"/>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/80">
              Solusi terbaik untuk perawatan sepatu kesayangan Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-2">
            <div>
              <h3 className="font-headline font-semibold uppercase tracking-wider">Layanan</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#catalog" className="text-sm text-primary-foreground/80 hover:text-accent">Deep Cleaning</Link></li>
                <li><Link href="#catalog" className="text-sm text-primary-foreground/80 hover:text-accent">Fast Cleaning</Link></li>
                <li><Link href="#catalog" className="text-sm text-primary-foreground/80 hover:text-accent">Unyellowing</Link></li>
                <li><Link href="#catalog" className="text-sm text-primary-foreground/80 hover:text-accent">Repaint</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold uppercase tracking-wider">Dukungan</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#contact" className="text-sm text-primary-foreground/80 hover:text-accent">Hubungi Kami</Link></li>
                <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-accent">FAQ</Link></li>
                <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-accent">Pengiriman</Link></li>
                <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-accent">Garansi</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold uppercase tracking-wider">Perusahaan</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-accent">Tentang Kami</Link></li>
                <li><Link href="#blog" className="text-sm text-primary-foreground/80 hover:text-accent">Blog</Link></li>
                <li><Link href="#" className="text-sm text-primary-foreground/80 hover:text-accent">Karir</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-8 flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-primary-foreground/80">&copy; {new Date().getFullYear()} elsclean.id. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-primary-foreground/80 hover:text-accent"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-accent"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-accent"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
