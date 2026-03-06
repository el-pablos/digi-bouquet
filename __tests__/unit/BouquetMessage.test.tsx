import { render, screen, fireEvent } from '@testing-library/react';
import BouquetMessage from '@/components/BouquetMessage';

describe('BouquetMessage', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('render semua input: dari, untuk, pesan', () => {
    render(<BouquetMessage onChange={mockOnChange} />);
    expect(screen.getByLabelText(/dari/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/untuk/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pesan/i)).toBeInTheDocument();
  });

  it('counter karakter update saat mengetik di textarea', () => {
    render(<BouquetMessage onChange={mockOnChange} />);
    const textarea = screen.getByLabelText(/pesan/i);
    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    const counter = screen.getByTestId('char-counter');
    expect(counter).toHaveTextContent('11 / 200');
  });

  it('counter warna berubah ke orange saat lebih dari 180 karakter', () => {
    render(<BouquetMessage onChange={mockOnChange} />);
    const textarea = screen.getByLabelText(/pesan/i);
    const longText = 'a'.repeat(185);
    fireEvent.change(textarea, { target: { value: longText } });

    const counter = screen.getByTestId('char-counter');
    expect(counter).toHaveClass('text-orange-400');
  });

  it('onChange dipanggil setiap ada perubahan input', () => {
    render(<BouquetMessage onChange={mockOnChange} />);

    const fromInput = screen.getByLabelText(/dari/i);
    fireEvent.change(fromInput, { target: { value: 'Alice' } });
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ fromName: 'Alice' })
    );

    const toInput = screen.getByLabelText(/untuk/i);
    fireEvent.change(toInput, { target: { value: 'Bob' } });
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ toName: 'Bob' })
    );

    const textarea = screen.getByLabelText(/pesan/i);
    fireEvent.change(textarea, { target: { value: 'Selamat!' } });
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Selamat!' })
    );
  });

  it('input nama max 50 char dan pesan max 200 char', () => {
    render(<BouquetMessage onChange={mockOnChange} />);

    const fromInput = screen.getByLabelText(/dari/i) as HTMLInputElement;
    expect(fromInput).toHaveAttribute('maxLength', '50');

    const toInput = screen.getByLabelText(/untuk/i) as HTMLInputElement;
    expect(toInput).toHaveAttribute('maxLength', '50');

    const textarea = screen.getByLabelText(/pesan/i) as HTMLTextAreaElement;
    expect(textarea).toHaveAttribute('maxLength', '200');
  });

  it('render judul section dan subtitle', () => {
    render(<BouquetMessage onChange={mockOnChange} />);
    expect(screen.getByText(/untuk siapa bouquet ini/i)).toBeInTheDocument();
    expect(screen.getByText(/opsional.*anonim/i)).toBeInTheDocument();
  });
});
