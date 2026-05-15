function SkeletonCard() {
  return (
    <div className="rounded-card border border-border-soft bg-elevated p-5 shadow-card shadow-inner-soft">
      <div className="skeleton mb-3 h-4 w-3/4 rounded" />
      <div className="skeleton mb-2 h-3 w-full rounded" />
      <div className="skeleton mb-2 h-3 w-5/6 rounded" />
      <div className="skeleton mt-4 h-6 w-20 rounded-full" />
    </div>
  );
}

export default SkeletonCard;
