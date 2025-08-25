import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const siteConfig = {
  title: "elsclean.id - Layanan Cuci Sepatu Profesional",
  description: "Solusi terbaik untuk perawatan sepatu kesayangan Anda. Kami menyediakan layanan Deep Cleaning, Fast Cleaning, Unyellowing, dan Repaint dengan hasil maksimal.",
  url: "https://elscleanid.netlify.app",
  ogImage: "https://i.imgur.com/rx25vM6.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: `/favicon.ico?v=${new Date().getTime()}`,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: "Solusi terbaik untuk perawatan sepatu kesayangan Anda.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: "Solusi terbaik untuk perawatan sepatu kesayangan Anda.",
    images: [siteConfig.ogImage],
  },
  // Adding the Facebook App ID to resolve the warning
  other: {
    'fb:app_id': '966242223397117', // A common placeholder ID
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
