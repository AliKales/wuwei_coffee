import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import menu from "../../data/menu.json";

export const metadata: Metadata = {
  title: "Menü — Wu Wei Coffee",
  description:
    "Konyaaltı, Antalya'daki Wu Wei Coffee'de kahveler, içecekler, yemekler ve tatlılar.",
};

export default function MenuPage() {
  const { title, kicker, intro, sections } = menu;

  return (
    <>
      {/* HEADER */}
      <section className="bg-brand text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="text-xs tracking-[0.2em] uppercase text-accent font-semibold">
            {title}
          </span>
          <h1 className="font-display text-5xl sm:text-6xl mt-4 leading-tight whitespace-pre-line">
            {kicker}
          </h1>
          <p className="mt-6 text-white/80 max-w-xl text-lg leading-relaxed">
            {intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BOARD GAMES CALLOUT */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-12">
        <div className="relative overflow-hidden rounded-2xl bg-brand-light p-6 sm:p-10 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative w-full md:w-56 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src="/photos/photo_board_games.webp"
              alt="Kutu oyunları"
              fill
              sizes="(max-width: 768px) 100vw, 224px"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-brand font-semibold">
              Her siparişle ücretsiz
            </span>
            <h3 className="font-display text-2xl sm:text-3xl mt-2 text-brand-dark">
              Raflarda 100+ kutu oyunu.
            </h3>
            <p className="mt-2 text-foreground/70">
              Personele sor — grubuna ve havaya uygun bir oyun seçmene yardımcı
              oluruz.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28 space-y-24">
        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 grid md:grid-cols-5 gap-10"
          >
            <div className={`md:col-span-2 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              {section.image && (
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg sticky top-24">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <div className="md:col-span-3">
              <span className="text-xs tracking-[0.2em] uppercase text-brand font-semibold">
                {String(i + 1).padStart(2, "0")} / {sections.length.toString().padStart(2, "0")}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl mt-3 text-brand-dark">
                {section.title}
              </h2>
              <ul className="mt-8 divide-y divide-black/5">
                {section.items.map((item) => (
                  <li key={item.name} className="py-5 flex gap-6 items-baseline">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-brand-dark">
                        {item.name}
                      </h3>
                      {item.desc && (
                        <p className="text-sm text-foreground/60 mt-1">
                          {item.desc}
                        </p>
                      )}
                    </div>
                    <span className="font-display text-lg text-brand whitespace-nowrap">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* FOOTER CTA */}
      <section className="bg-brand-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-brand-dark">
            Acıktın mı?
          </h2>
          <p className="mt-3 text-foreground/70">
            Uğra ya da masa ayırtmak için bizi ara.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a
              href="tel:+905070556248"
              className="px-6 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors"
            >
              Ara: 0507 055 6248
            </a>
            <Link
              href="/#visit"
              className="px-6 py-3 rounded-full border border-brand/30 text-brand font-semibold hover:bg-white transition-colors"
            >
              Bize nasıl ulaşırsın
            </Link>
          </div>
          <p className="mt-6 text-xs text-foreground/50">
            Fiyatlar değişebilir. Menü mevcudiyeti mevsime göre farklılık
            gösterebilir.
          </p>
        </div>
      </section>
    </>
  );
}
