import Image from "next/image";
import Link from "next/link";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src="/photos/photo_landing.webp"
          alt="Wu Wei Coffee iç mekan"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative z-10 text-center text-white px-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Konyaaltı · Antalya
          </div>
          <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] tracking-tight">
            Wu Wei Coffee
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-xl mx-auto leading-relaxed">
            Özel kahveler, samimi yemekler ve kutu oyunları. Zamanın yavaşladığı
            sakin bir köşe.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <Link
              href="/menu"
              className="px-7 py-3.5 rounded-full bg-white text-brand font-semibold hover:bg-accent hover:text-brand-dark transition-colors"
            >
              Menüyü Gör
            </Link>
            <a
              href="https://maps.app.goo.gl/KB6fz5vDFd5f6mjW8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Yol Tarifi Al
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-brand font-semibold">
              無為 · Wu Wei
            </span>
            <h2 className="font-display text-4xl sm:text-5xl mt-4 leading-tight text-brand-dark">
              Zahmetsiz anlar, özenle hazırlanır.
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed text-lg">
              Wu Wei, Taoizm&apos;in &quot;zahmetsiz eylem&quot; sanatıdır. Bizim
              için bu; güzel bir kahvenin, sıcak bir yemeğin ve iyi bir
              sohbetin kendi kendine akmasına izin vermektir. Bir sandalye çek,
              zarları yuvarla, biraz kal.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <Feature icon="☕" title="Kahve" text="Özel espresso ve demlemeler" />
              <Feature icon="🍽️" title="Yemek" text="Taze, ev yapımı menü" />
              <Feature icon="🎲" title="Oyunlar" text="Raflarda 100+ kutu oyunu" />
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/photos/photo_coffee.webp"
              alt="Wu Wei'de kahve"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS STRIP */}
      <section className="bg-brand text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-4xl font-display">☕</div>
            <h3 className="font-display text-2xl mt-3">Kahve Kültürü</h3>
            <p className="mt-2 text-white/75 leading-relaxed">
              Net bir espresso&apos;dan uzun bir filtre kahveye kadar her fincan
              özenle hazırlanır.
            </p>
          </div>
          <div>
            <div className="text-4xl font-display">🍔</div>
            <h3 className="font-display text-2xl mt-3">Yemek ve İçecek</h3>
            <p className="mt-2 text-white/75 leading-relaxed">
              Burger, tost, makarna, bubble tea ve tiramisu — taze yapılır,
              samimiyetle sunulur.
            </p>
          </div>
          <div>
            <div className="text-4xl font-display">🎲</div>
            <h3 className="font-display text-2xl mt-3">Kutu Oyunları</h3>
            <p className="mt-2 text-white/75 leading-relaxed">
              Bir oyun seç, ekibini topla ve öğleden sonranı unutulmaz bir anıya
              dönüştür.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="max-w-6xl mx-auto px-5 sm:px-8 py-24 md:py-32">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-brand font-semibold">
              Galeri
            </span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 text-brand-dark">
              İçeriden bir bakış.
            </h2>
          </div>
          <a
            href="https://instagram.com/wuweicoffee07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand hover:text-brand-dark underline underline-offset-4"
          >
            Daha fazlası Instagram&apos;da →
          </a>
        </div>
        <Gallery />
      </section>

      {/* VISIT */}
      <section id="visit" className="bg-brand-light">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-brand font-semibold">
              Bizi Ziyaret Et
            </span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 text-brand-dark leading-tight">
              Gelip merhaba de.
            </h2>
            <p className="mt-5 text-foreground/70 leading-relaxed text-lg">
              Konyaaltı&apos;nın kalbindeyiz.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-xs tracking-widest uppercase text-brand font-semibold">
                  Adres
                </dt>
                <dd className="mt-1 text-lg">
                  <a
                    href="https://maps.app.goo.gl/KB6fz5vDFd5f6mjW8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand"
                  >
                    Toros, Pınarbaşı Cd No:13A/A, 07070 Konyaaltı/Antalya
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest uppercase text-brand font-semibold">
                  Telefon
                </dt>
                <dd className="mt-1 text-lg">
                  <a href="tel:+905070556248" className="hover:text-brand">
                    0507 055 6248
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest uppercase text-brand font-semibold">
                  Instagram
                </dt>
                <dd className="mt-1 text-lg">
                  <a
                    href="https://instagram.com/wuweicoffee07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand"
                  >
                    @wuweicoffee07
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6301.55039571762!2d30.644567497081063!3d36.883372554243685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c391c23cefc21f%3A0x4b18e09316872f63!2sWu%20Wei%20Kitap%20%26%20Cafe!5e0!3m2!1sen!2str!4v1777025341550!5m2!1sen!2str"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="Wu Wei Coffee konumu"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div>
      <div className="text-2xl">{icon}</div>
      <h4 className="mt-2 font-semibold text-brand-dark">{title}</h4>
      <p className="text-sm text-foreground/60 mt-1">{text}</p>
    </div>
  );
}
