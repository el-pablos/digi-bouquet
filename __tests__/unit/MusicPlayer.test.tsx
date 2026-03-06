import { render, screen, fireEvent } from '@testing-library/react';
import MusicPlayer from '@/components/MusicPlayer';

describe('MusicPlayer', () => {
  it('render awal dalam state paused dengan icon play', () => {
    render(<MusicPlayer />);
    const button = screen.getByRole('button', { name: /putar musik/i });
    expect(button).toBeInTheDocument();
    // Iframe seharusnya tidak ada saat paused
    expect(screen.queryByTitle('Kacamata — Afgan')).not.toBeInTheDocument();
  });

  it('klik tombol play berubah ke state playing dengan icon pause', () => {
    render(<MusicPlayer />);
    const button = screen.getByRole('button', { name: /putar musik/i });
    fireEvent.click(button);

    // Sekarang harus ada tombol pause
    const pauseButton = screen.getByRole('button', { name: /hentikan musik/i });
    expect(pauseButton).toBeInTheDocument();

    // Iframe dengan src YouTube harus ada
    const iframe = screen.getByTitle('Kacamata — Afgan');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
  });

  it('klik dua kali kembali ke state paused', () => {
    render(<MusicPlayer />);
    const button = screen.getByRole('button', { name: /putar musik/i });

    // Play
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /hentikan musik/i })).toBeInTheDocument();

    // Pause
    fireEvent.click(screen.getByRole('button', { name: /hentikan musik/i }));
    expect(screen.getByRole('button', { name: /putar musik/i })).toBeInTheDocument();
    expect(screen.queryByTitle('Kacamata — Afgan')).not.toBeInTheDocument();
  });

  it('label "Kacamata — Afgan" selalu render', () => {
    render(<MusicPlayer />);
    expect(screen.getByText('Kacamata — Afgan')).toBeInTheDocument();
  });

  it('komponen memiliki fixed positioning class', () => {
    const { container } = render(<MusicPlayer />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass('fixed');
    expect(wrapper).toHaveClass('bottom-6');
    expect(wrapper).toHaveClass('right-6');
    expect(wrapper).toHaveClass('z-50');
  });
});
