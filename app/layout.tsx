import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digi-Bouquet — Digital Flower Bouquet Builder",
  description:
    "Buat, rangkai, dan bagikan karangan bunga digital yang indah. Pilih bunga favoritmu dan kirim ke garden untuk dilihat semua orang.",
  keywords: ["digital bouquet", "flower", "bunga digital", "bouquet builder"],
  openGraph: {
    title: "Digi-Bouquet",
    description: "Platform bouquet digital interaktif",
    type: "website",
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
