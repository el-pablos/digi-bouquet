import { render, screen } from '@testing-library/react';
import BouquetCard from '@/components/BouquetCard';
import { BouquetItem } from '@/types';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, priority, unoptimized, ...props }: Record<string, unknown>) => {
    void fill; void priority; void unoptimized;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('BouquetCard', () => {
  const mockBouquet: BouquetItem = {
    id: 'test-id-123',
    flowers: ['rose', 'tulip', 'orchid', 'dahlia', 'peony', 'lily'],
    mode: 'color',
    bushIndex: 1,
    createdAt: '2026-02-15T10:00:00.000Z',
  };

  it('merender tanggal dengan format yang benar', () => {
    render(<BouquetCard bouquet={mockBouquet} />);
    expect(screen.getByText('2/15/2026')).toBeInTheDocument();
  });

  it('merender bush background', () => {
    render(<BouquetCard bouquet={mockBouquet} />);
    const bushBg = screen.getByAltText('Bush background');
    expect(bushBg).toBeInTheDocument();
    expect(bushBg).toHaveAttribute(
      'src',
      'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color/bush/bush-1.png'
    );
  });

  it('merender bush top overlay', () => {
    render(<BouquetCard bouquet={mockBouquet} />);
    const bushTop = screen.getByAltText('Bush top overlay');
    expect(bushTop).toBeInTheDocument();
  });

  it('merender semua bunga di bouquet', () => {
    render(<BouquetCard bouquet={mockBouquet} />);
    expect(screen.getByAltText('Bunga rose')).toBeInTheDocument();
    expect(screen.getByAltText('Bunga tulip')).toBeInTheDocument();
    expect(screen.getByAltText('Bunga orchid')).toBeInTheDocument();
  });

  it('merender dengan mode mono', () => {
    const monoBouquet: BouquetItem = {
      ...mockBouquet,
      mode: 'mono',
    };
    render(<BouquetCard bouquet={monoBouquet} />);
    const bushBg = screen.getByAltText('Bush background');
    expect(bushBg).toHaveAttribute(
      'src',
      'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/mono/bush/bush-1.png'
    );
  });

  it('merender dengan bushIndex berbeda', () => {
    const bouquetBush3: BouquetItem = {
      ...mockBouquet,
      bushIndex: 3,
    };
    render(<BouquetCard bouquet={bouquetBush3} />);
    const bushBg = screen.getByAltText('Bush background');
    expect(bushBg).toHaveAttribute('src', expect.stringContaining('bush-3.png'));
  });
});
