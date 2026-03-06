import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Garden — Lihat Semua Digital Bouquet',
  description:
    'Lihat semua karangan bunga digital yang sudah dibuat. Bergabunglah dan buat digital bouquet-mu sendiri di Digi-Bouquet!',
  alternates: {
    canonical: 'https://digibouquet.tams.codes/garden',
  },
  openGraph: {
    title: 'Garden — Digi-Bouquet',
    description: 'Lihat koleksi karangan bunga digital yang dibuat orang-orang.',
    type: 'website',
    url: 'https://digibouquet.tams.codes/garden',
  },
};

export default function GardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
