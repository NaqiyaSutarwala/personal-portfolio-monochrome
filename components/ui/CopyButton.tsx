"use client";

import { useEffect, useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timeout);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const label = {
    idle: "Copy email",
    copied: "Email copied",
    failed: "Select the address to copy it",
  }[status];

  return (
    <button type="button" className="button" onClick={copy}>
      <span aria-live="polite">{label}</span>
    </button>
  );
}
