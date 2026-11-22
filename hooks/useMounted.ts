import { useEffect, useState } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Prevents SSR/hydration mismatches for client-only animations.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}
