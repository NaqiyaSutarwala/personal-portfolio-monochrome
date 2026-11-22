export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const ease = (value: number) => value * value * (3 - 2 * value);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
