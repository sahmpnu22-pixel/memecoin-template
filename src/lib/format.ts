/** 1_000_000_000 → "1B" (compact) or "1,000,000,000". */
export function formatNumber(value: number, opts: { compact?: boolean; decimals?: number } = {}) {
  const { compact = false, decimals = 0 } = opts;
  return new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : decimals,
    minimumFractionDigits: compact ? 0 : decimals,
  }).format(value);
}

/** "PMoon1111…1pump" — shorten long addresses for small screens. */
export function shortenAddress(address: string, chars = 6) {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}
