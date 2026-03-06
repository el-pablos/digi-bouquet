import { render, screen, fireEvent } from '@testing-library/react';
import FlowerGrid from '@/components/FlowerGrid';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('FlowerGrid', () => {
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('merender judul PICK 6 TO 10 BLOOMS', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    expect(screen.getByText('Pick 6 to 10 Blooms')).toBeInTheDocument();
  });

  it('merender semua 12 bunga', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    expect(screen.getByText('Orchid')).toBeInTheDocument();
    expect(screen.getByText('Rose')).toBeInTheDocument();
    expect(screen.getByText('Tulip')).toBeInTheDocument();
    expect(screen.getByText('Peony')).toBeInTheDocument();
  });

  it('menampilkan counter 0/10 saat awal', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    expect(screen.getByText('0/10')).toBeInTheDocument();
  });

  it('mengupdate counter saat bunga diklik', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    const roseButton = screen.getByLabelText('Pilih bunga Rose');
    fireEvent.click(roseButton);
    expect(screen.getByText('1/10')).toBeInTheDocument();
  });

  it('tombol Next disabled saat kurang dari 6 bunga', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    const nextButton = screen.getByLabelText('Lanjut ke preview bouquet');
    expect(nextButton).toBeDisabled();
  });

  it('tombol Next aktif setelah memilih 6 bunga', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    const roseButton = screen.getByLabelText('Pilih bunga Rose');
    for (let i = 0; i < 6; i++) {
      fireEvent.click(roseButton);
    }
    const nextButton = screen.getByLabelText('Lanjut ke preview bouquet');
    expect(nextButton).not.toBeDisabled();
  });

  it('tidak menambah bunga melebihi 10', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    const roseButton = screen.getByLabelText('Pilih bunga Rose');
    for (let i = 0; i < 12; i++) {
      fireEvent.click(roseButton);
    }
    expect(screen.getByText('10/10')).toBeInTheDocument();
  });

  it('tombol reset menghapus semua pilihan', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    const roseButton = screen.getByLabelText('Pilih bunga Rose');
    fireEvent.click(roseButton);
    fireEvent.click(roseButton);
    expect(screen.getByText('2/10')).toBeInTheDocument();

    const resetButton = screen.getByLabelText('Reset semua pilihan bunga');
    fireEvent.click(resetButton);
    expect(screen.getByText('0/10')).toBeInTheDocument();
  });

  it('memanggil onNext dengan bunga yang dipilih', () => {
    render(<FlowerGrid mode="color" onNext={mockOnNext} />);
    const roseButton = screen.getByLabelText('Pilih bunga Rose');
    for (let i = 0; i < 6; i++) {
      fireEvent.click(roseButton);
    }
    const nextButton = screen.getByLabelText('Lanjut ke preview bouquet');
    fireEvent.click(nextButton);
    expect(mockOnNext).toHaveBeenCalledWith(
      expect.arrayContaining(['rose'])
    );
    expect(mockOnNext.mock.calls[0][0]).toHaveLength(6);
  });
});
