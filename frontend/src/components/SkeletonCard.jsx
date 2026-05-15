function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border-dark bg-bg-card p-5 shadow-card">
      <div className="skeleton-shimmer mb-3 h-4 w-3/4 rounded" />
      <div className="skeleton-shimmer mb-2 h-3 w-full rounded" />
      <div className="skeleton-shimmer mb-2 h-3 w-5/6 rounded" />
      <div className="skeleton-shimmer mt-4 h-6 w-20 rounded-full" />
    </div>
  );
}

export default SkeletonCard;
