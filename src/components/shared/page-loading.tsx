export function PageLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-clay"
        aria-hidden
      />
      <p className="text-sm text-dim">{label}</p>
    </div>
  );
}
