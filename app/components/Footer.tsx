import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand text-white/90 mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo_wu.png"
              alt="Wu Wei Coffee"
              width={44}
              height={44}
              className="rounded-full bg-white"
            />
            <span className="font-display text-xl">Wu Wei Coffee</span>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
            Özel kahveler, samimi yemekler ve kutu oyunları — Konyaaltı&apos;nda
            sakin bir köşe.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Ziyaret</h4>
          <a
            href="https://maps.app.goo.gl/KB6fz5vDFd5f6mjW8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 hover:text-white leading-relaxed block"
          >
            Toros, Pınarbaşı Cd No:13A/A
            <br />
            07070 Konyaaltı / Antalya
          </a>
          <a
            href="tel:+905070556248"
            className="mt-3 inline-block text-sm text-white/80 hover:text-white"
          >
            0507 055 6248
          </a>
        </div>

        <div>
          <h4 className="font-display text-lg mb-3">Takip Et</h4>
          <a
            href="https://instagram.com/wuweicoffee07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            @wuweicoffee07
          </a>
          <div className="mt-4 flex gap-3 text-sm">
            <Link href="/menu" className="text-white/80 hover:text-white">
              Menü
            </Link>
            <span className="text-white/30">·</span>
            <Link href="/#gallery" className="text-white/80 hover:text-white">
              Galeri
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 text-xs text-white/60 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Wu Wei Coffee. Tüm hakları saklıdır.</span>
          <span>Konyaaltı, Antalya</span>
        </div>
      </div>
    </footer>
  );
}
