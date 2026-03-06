import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://digibouquet.tams.codes'),
  title: {
    default: 'Digi-Bouquet — Digital Flower Bouquet Builder | Send Beautiful Flowers Online',
    template: '%s | Digi-Bouquet',
  },
  description:
    'Create and send a beautiful digital flower bouquet online for free. Choose from roses, peonies, sunflowers, tulips, orchids, and more. Build your digital bouquet and share it with someone you love. Made by Tama.',
  keywords: [
    'digital bouquet',
    'digital flower bouquet',
    'bouquet builder',
    'send digital flowers',
    'online flower bouquet',
    'virtual bouquet',
    'digital roses',
    'digital flower arrangement',
    'send flowers online free',
    'digital peony bouquet',
    'create digital bouquet',
    'share bouquet online',
    'digi bouquet',
    'digibouquet',
  ],
  authors: [{ name: 'Tama', url: 'https://github.com/el-pablos' }],
  creator: 'Tama',
  publisher: 'Tama',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://digibouquet.tams.codes',
    siteName: 'Digi-Bouquet',
    title: 'Digi-Bouquet — Create & Send Digital Flower Bouquets',
    description:
      'Build a beautiful digital flower bouquet and send it to someone you love. Free, beautiful, and made with care.',
    images: [
      {
        url: 'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/other/digibouquet.png',
        width: 512,
        height: 512,
        alt: 'Digi-Bouquet — Digital Flower Bouquet Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digi-Bouquet — Digital Flower Bouquet Builder',
    description: 'Create and send a beautiful digital flower bouquet for free.',
    images: ['https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/other/digibouquet.png'],
    creator: '@el_pablos',
  },
  alternates: {
    canonical: 'https://digibouquet.tams.codes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
