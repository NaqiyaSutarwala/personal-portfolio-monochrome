"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { NavLink } from "@/types/portfolio";

export function Navbar({ name, links }: { name: string; links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 821px)");
    const close = () => setOpen(false);

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  const allLinks = [...links, { label: "Contact", href: "#contact" }];

  return (
    <>
      <nav className={open ? "nav is-open" : "nav"} aria-label="Main navigation">
        <a className="brand" href="/#home" onClick={() => setOpen(false)}>
          <i aria-hidden="true" />
          {name}
        </a>
        <div className="nav-links">
          {allLinks.map((link) => (
            <a key={link.href} href={`/${link.href}`}>
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      <div id="menu" className={open ? "menu is-open" : "menu"} inert={!open}>
        {allLinks.map((link, index) => (
          <a
            key={link.href}
            href={`/${link.href}`}
            onClick={() => setOpen(false)}
            style={{ "--order": index } as CSSProperties}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
