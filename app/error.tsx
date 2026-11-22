"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="screen">
      <h1 className="heading">The page didn’t load</h1>
      <p>Try loading it again. If that fails, refresh the page.</p>
      <button type="button" className="button" onClick={reset}>
        <span>Try again</span>
      </button>
    </main>
  );
}
