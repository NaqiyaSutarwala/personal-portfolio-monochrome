/**
 * Merges class names, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a date range string for experience entries.
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null,
  isCurrent: boolean,
): string {
  if (isCurrent) return `${startDate} — Present`;
  return `${startDate} — ${endDate}`;
}
