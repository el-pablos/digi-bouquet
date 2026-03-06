import { render, screen, fireEvent, act } from '@testing-library/react';
import ShareButtons from '@/components/ShareButtons';
import { BouquetItem } from '@/types';

// Mock WhatsAppShare to avoid nested dependency issues
jest.mock('@/components/WhatsAppShare', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="whatsapp-modal">
      <button onClick={onClose}>Close WA</button>
    </div>
  ),
}));

// Mock clipboard
Object.assign(navigator, {
  clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
});

describe('ShareButtons', () => {
  const mockBouquet: BouquetItem = {
    id: 'test-123',
    flowers: ['rose', 'tulip', 'orchid', 'dahlia', 'peony', 'lily'],
    mode: 'color',
    bushIndex: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    toName: 'Anisa',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('merender tombol COPY LINK selalu ada', () => {
    render(<ShareButtons bouquet={mockBouquet} />);
    expect(screen.getByText('COPY LINK')).toBeInTheDocument();
  });

  it('klik COPY LINK memanggil navigator.clipboard.writeText', async () => {
    render(<ShareButtons bouquet={mockBouquet} />);
    await act(async () => {
      fireEvent.click(screen.getByText('COPY LINK'));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
  });

  it('tombol KIRIM VIA WHATSAPP ada', () => {
    render(<ShareButtons bouquet={mockBouquet} />);
    expect(screen.getByText('KIRIM VIA WHATSAPP 💬')).toBeInTheDocument();
  });

  it('state copied berubah ke true lalu kembali false setelah 2 detik', async () => {
    render(<ShareButtons bouquet={mockBouquet} />);
    await act(async () => {
      fireEvent.click(screen.getByText('COPY LINK'));
    });
    expect(screen.getByText('✓ COPIED!')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('COPY LINK')).toBeInTheDocument();
  });
});
