export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12" role="status" aria-label="Memuat konten">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-white" />
      </div>
    </div>
  );
}
