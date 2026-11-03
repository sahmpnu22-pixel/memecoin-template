/** Soft accent-colored blobs and a faint grid behind the page. */
export function GlowBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background: "radial-gradient(closest-side, rgb(var(--accent-rgb) / 0.55), transparent)",
          animation: "pulse-glow 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(closest-side, rgb(var(--accent-2-rgb) / 0.5), transparent)",
          animation: "pulse-glow 11s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
