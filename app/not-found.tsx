import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Not Found" };

export default function NotFound() {
  return (
    <main className="screen">
      <h1 className="heading">There’s nothing here</h1>
      <p>The page you opened doesn’t exist, or it has moved.</p>
      <Link href="/" className="button">
        <span>Go to the portfolio</span>
      </Link>
    </main>
  );
}
