import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const siteConfig = {
  title: "elsclean.id - Layanan Cuci Sepatu Profesional",
  description: "Solusi terbaik untuk perawatan sepatu kesayangan Anda.",
  url: "https://elscleanid.netlify.app",
  // Menggunakan favicon sebagai gambar OG
  ogImage: "https://elscleanid.netlify.app/favicon.ico",
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
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 128, // Ukuran umum untuk favicon
        height: 128,
        alt: siteConfig.title,
      },
    ],
    // The correct key is `appId` (camelCase) to generate `property="fb:app_id"`
    appId: '966242223397117', 
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
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
