import { render, screen, fireEvent } from '@testing-library/react';
import MusicPlayer from '@/components/MusicPlayer';

describe('MusicPlayer', () => {
  it('render awal dalam state muted dengan iframe autoplay muted', () => {
    render(<MusicPlayer />);
    const button = screen.getByRole('button', { name: /klik untuk unmute/i });
    expect(button).toBeInTheDocument();
    // Iframe harus ada saat muted (autoplay muted)
    const iframe = screen.getByTitle('Kacamata — Afgan');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('mute=1'));
  });

  it('label muted ditampilkan saat state awal', () => {
    render(<MusicPlayer />);
    expect(screen.getByText('Kacamata — Afgan (muted)')).toBeInTheDocument();
  });

  it('klik dari muted berubah ke state playing dengan unmute', () => {
    render(<MusicPlayer />);
    const button = screen.getByRole('button', { name: /klik untuk unmute/i });
    fireEvent.click(button);

    // Sekarang harus ada tombol hentikan musik
    const pauseButton = screen.getByRole('button', { name: /hentikan musik/i });
    expect(pauseButton).toBeInTheDocument();

    // Iframe dengan mute=0
    const iframe = screen.getByTitle('Kacamata — Afgan');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('mute=0'));

    // Label playing
    expect(screen.getByText('Kacamata — Afgan ♪')).toBeInTheDocument();
  });

  it('klik dari playing berubah ke paused tanpa iframe', () => {
    render(<MusicPlayer />);
    // muted → playing
    fireEvent.click(screen.getByRole('button', { name: /klik untuk unmute/i }));
    // playing → paused
    fireEvent.click(screen.getByRole('button', { name: /hentikan musik/i }));

    expect(screen.getByRole('button', { name: /putar musik/i })).toBeInTheDocument();
    expect(screen.queryByTitle('Kacamata — Afgan')).not.toBeInTheDocument();
    expect(screen.getByText('Kacamata — Afgan')).toBeInTheDocument();
  });

  it('klik dari paused kembali ke playing', () => {
    render(<MusicPlayer />);
    // muted → playing → paused
    fireEvent.click(screen.getByRole('button', { name: /klik untuk unmute/i }));
    fireEvent.click(screen.getByRole('button', { name: /hentikan musik/i }));
    // paused → playing
    fireEvent.click(screen.getByRole('button', { name: /putar musik/i }));

    expect(screen.getByRole('button', { name: /hentikan musik/i })).toBeInTheDocument();
    const iframe = screen.getByTitle('Kacamata — Afgan');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('mute=0'));
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
