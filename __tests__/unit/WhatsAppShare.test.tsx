import { render, screen, fireEvent } from '@testing-library/react';
import WhatsAppShare from '@/components/WhatsAppShare';
import { BouquetItem } from '@/types';

// Mock the whatsapp lib
jest.mock('@/lib/whatsapp', () => ({
  generateWhatsAppMessage: jest.fn().mockReturnValue('Mock message'),
  generateWhatsAppUrl: jest.fn().mockReturnValue('https://wa.me/628123456789?text=Mock'),
}));

describe('WhatsAppShare', () => {
  const mockBouquet: BouquetItem = {
    id: 'test-123',
    flowers: ['rose', 'tulip', 'orchid', 'dahlia', 'peony', 'lily'],
    mode: 'color',
    bushIndex: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    toName: 'Anisa',
    fromName: 'Budi',
  };
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('merender modal dengan semua elemen utama', () => {
    render(<WhatsAppShare bouquet={mockBouquet} onClose={mockOnClose} />);
    expect(screen.getByText('Kirim via WhatsApp 💚')).toBeInTheDocument();
    expect(screen.getByLabelText('Nomor WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('KIRIM SEKARANG 💬')).toBeInTheDocument();
    expect(screen.getByText('Batal')).toBeInTheDocument();
  });

  it('klik tombol batal memanggil onClose', () => {
    render(<WhatsAppShare bouquet={mockBouquet} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Batal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('input nomor telepon menerima input', () => {
    render(<WhatsAppShare bouquet={mockBouquet} onClose={mockOnClose} />);
    const input = screen.getByPlaceholderText('628xxxxxxxxxx');
    fireEvent.change(input, { target: { value: '08123456789' } });
    expect(input).toHaveValue('08123456789');
  });

  it('tombol submit disabled jika nomor kosong', () => {
    render(<WhatsAppShare bouquet={mockBouquet} onClose={mockOnClose} />);
    const submitBtn = screen.getByLabelText('Kirim sekarang via WhatsApp');
    expect(submitBtn).toBeDisabled();
  });
});
