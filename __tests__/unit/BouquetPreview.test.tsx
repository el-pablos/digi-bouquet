import { render, screen } from '@testing-library/react';
import BouquetPreview from '@/components/BouquetPreview';
import { FlowerType } from '@/types';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, priority, unoptimized, ...props }: Record<string, unknown>) => {
    void fill; void priority; void unoptimized;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('BouquetPreview', () => {
  const defaultFlowers: FlowerType[] = ['rose', 'tulip', 'orchid', 'dahlia', 'peony', 'lily'];

  it('merender dengan aria-label yang benar', () => {
    render(
      <BouquetPreview flowers={defaultFlowers} mode="color" bushIndex={1} />
    );
    const preview = screen.getByLabelText('Preview bouquet color dengan 6 bunga');
    expect(preview).toBeInTheDocument();
  });

  it('merender bush background image', () => {
    render(
      <BouquetPreview flowers={defaultFlowers} mode="color" bushIndex={2} />
    );
    const bushBg = screen.getByAltText('Bush background');
    expect(bushBg).toBeInTheDocument();
    expect(bushBg).toHaveAttribute(
      'src',
      'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color/bush/bush-2.png'
    );
  });

  it('merender bush top overlay', () => {
    render(
      <BouquetPreview flowers={defaultFlowers} mode="color" bushIndex={1} />
    );
    const bushTop = screen.getByAltText('Bush top overlay');
    expect(bushTop).toBeInTheDocument();
    expect(bushTop).toHaveAttribute(
      'src',
      'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color/bush/bush-1-top.png'
    );
  });

  it('merender semua bunga yang dipilih', () => {
    render(
      <BouquetPreview flowers={defaultFlowers} mode="color" bushIndex={1} />
    );
    expect(screen.getByAltText('Bunga rose')).toBeInTheDocument();
    expect(screen.getByAltText('Bunga tulip')).toBeInTheDocument();
    expect(screen.getByAltText('Bunga orchid')).toBeInTheDocument();
  });

  it('menggunakan URL mono untuk mode mono', () => {
    render(
      <BouquetPreview flowers={['rose']} mode="mono" bushIndex={3} />
    );
    const bushBg = screen.getByAltText('Bush background');
    expect(bushBg).toHaveAttribute(
      'src',
      'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/mono/bush/bush-3.png'
    );
    const flowerImg = screen.getByAltText('Bunga rose');
    expect(flowerImg).toHaveAttribute(
      'src',
      'https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/mono/flowers/rose.webp'
    );
  });

  it('merender dengan bushIndex yang berbeda', () => {
    const { rerender } = render(
      <BouquetPreview flowers={defaultFlowers} mode="color" bushIndex={1} />
    );
    let bushBg = screen.getByAltText('Bush background');
    expect(bushBg).toHaveAttribute('src', expect.stringContaining('bush-1.png'));

    rerender(
      <BouquetPreview flowers={defaultFlowers} mode="color" bushIndex={3} />
    );
    bushBg = screen.getByAltText('Bush background');
    expect(bushBg).toHaveAttribute('src', expect.stringContaining('bush-3.png'));
  });
});
