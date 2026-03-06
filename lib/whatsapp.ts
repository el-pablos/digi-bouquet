import { BouquetItem } from '@/types';

export function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateWhatsAppMessage(bouquet: BouquetItem): string {
  const siteUrl = typeof window !== 'undefined'
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_SITE_URL || 'https://digibouquet.tams.codes');

  const dear = bouquet.toName
    ? `💌 Dear *${bouquet.toName}*,`
    : '💌 Dear kamu,';

  const msg = bouquet.message
    ? `"${bouquet.message}"\n`
    : 'Semoga harimu seindah bunga-bunga ini 🌷\n';

  const flowerList = bouquet.flowers
    .map((f) => `  • ${capitalizeFirst(f)}`)
    .join('\n');

  const modeText = bouquet.mode === 'color'
    ? 'Bouquet berwarna-warni penuh semangat'
    : 'Bouquet elegan hitam putih';

  const from = bouquet.fromName
    ? `🌷 *Dengan cinta,*\n*${bouquet.fromName}*`
    : '🌷 *Dengan cinta,*\n*Seseorang yang peduli*';

  return [
    '🌸 *Hei, ada karangan bunga digital buat kamu!* 🌸',
    '',
    dear,
    '',
    msg,
    '🌺 *Isi karangan bunga:*',
    flowerList,
    '',
    `✨ ${modeText} ini dibuat khusus untukmu.`,
    '',
    'Lihat bouquet-nya di:',
    `${siteUrl}/bouquet/${bouquet.id}`,
    '',
    from,
    '',
    '_Dibuat dengan Digi-Bouquet 🌸_',
  ].join('\n');
}

export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  let normalized = phoneNumber.replace(/\D/g, '');
  if (normalized.startsWith('0')) {
    normalized = '62' + normalized.slice(1);
  }
  if (!normalized.startsWith('62')) {
    normalized = '62' + normalized;
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
}
