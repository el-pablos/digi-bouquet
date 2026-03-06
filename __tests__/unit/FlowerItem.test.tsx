import { render, screen, fireEvent } from '@testing-library/react';
import FlowerItem from '@/components/FlowerItem';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, priority, unoptimized, ...props }: Record<string, unknown>) => {
    void fill; void priority; void unoptimized;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('FlowerItem', () => {
  const defaultProps = {
    flower: 'rose' as const,
    label: 'Rose',
    mode: 'color' as const,
    count: 0,
    onSelect: jest.fn(),
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('merender dengan benar', () => {
    render(<FlowerItem {...defaultProps} />);
    expect(screen.getByText('Rose')).toBeInTheDocument();
  });

  it('menampilkan gambar bunga dengan alt text', () => {
    render(<FlowerItem {...defaultProps} />);
    const img = screen.getByAltText('Bunga Rose');
    expect(img).toBeInTheDocument();
  });

  it('memanggil onSelect saat diklik', () => {
    render(<FlowerItem {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onSelect).toHaveBeenCalledWith('rose');
  });

  it('tidak memanggil onSelect saat disabled', () => {
    render(<FlowerItem {...defaultProps} disabled={true} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onSelect).not.toHaveBeenCalled();
  });

  it('menampilkan badge counter saat count > 0', () => {
    render(<FlowerItem {...defaultProps} count={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('tidak menampilkan badge counter saat count 0', () => {
    render(<FlowerItem {...defaultProps} count={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('memiliki aria-label yang sesuai', () => {
    render(<FlowerItem {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Pilih bunga Rose');
  });

  it('menampilkan aria-label dengan jumlah pilihan', () => {
    render(<FlowerItem {...defaultProps} count={2} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Pilih bunga Rose, sudah dipilih 2 kali');
  });
});
