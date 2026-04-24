"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#about", label: "Hakkımızda" },
  { href: "/menu", label: "Menü" },
  { href: "/#gallery", label: "Galeri" },
  { href: "/#visit", label: "Ziyaret" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/logo_wu.png"
            alt="Wu Wei Coffee"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-display text-lg tracking-wide text-brand">
            Wu Wei Coffee
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-brand transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+905070556248"
            className="text-sm font-medium px-4 py-2 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors"
          >
            Bizi Ara
          </a>
        </nav>

        <button
          className="md:hidden p-2 -mr-2"
          aria-label="Menüyü aç/kapat"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
          <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
          <span className="block w-6 h-0.5 bg-foreground" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-background">
          <div className="px-5 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+905070556248"
              className="text-base font-medium text-brand"
            >
              0507 055 6248
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
