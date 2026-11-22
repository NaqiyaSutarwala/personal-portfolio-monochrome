interface TagProps {
  label: string;
  accent?: boolean;
}

/** Monospace tag — sharp corners, minimal styling. */
export function Tag({ label, accent = false }: TagProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.22rem 0.6rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.04em",
        borderRadius: "var(--radius)",
        background: accent ? "var(--accent-dim)" : "var(--bg-alt)",
        color: accent ? "var(--accent)" : "var(--ink-2)",
        border: `1px solid ${accent ? "var(--accent)" : "var(--border)"}`,
      }}
    >
      {label}
    </span>
  );
}
