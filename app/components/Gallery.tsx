"use client";

import Image from "next/image";
import { useState } from "react";

type Item =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };

const items: Item[] = [
  { type: "image", src: "/photos/photo_coffee.webp", alt: "Özel kahve" },
  { type: "image", src: "/photos/photo_board_games.webp", alt: "Kutu oyunu koleksiyonu" },
  { type: "image", src: "/photos/photo_burger.webp", alt: "Burger" },
  { type: "image", src: "/photos/photo_bubble_tea.webp", alt: "Bubble tea" },
  { type: "image", src: "/photos/photo_tiramisu.webp", alt: "Tiramisu" },
  { type: "image", src: "/photos/photo_chicken_menu.webp", alt: "Tavuk menü" },
  { type: "image", src: "/photos/photo_sandwich.webp", alt: "Sandviç" },
  { type: "image", src: "/photos/photo_toast.webp", alt: "Tost" },
  { type: "image", src: "/photos/photo_cury_pasta.webp", alt: "Köri makarna" },
  { type: "video", src: "/photos/video_of_cafe.mp4", alt: "Kafe videosu" },
  { type: "video", src: "/photos/photo_location.mp4", alt: "Konum videosu" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<Item | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setLightbox(item)}
            className="relative aspect-square overflow-hidden rounded-xl group bg-brand-dark flex items-center justify-center"
            aria-label={item.alt}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <>
                <video
                  src={item.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-10">
                  ▶ Video
                </span>
              </>
            )}
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 z-10"
            onClick={() => setLightbox(null)}
            aria-label="Kapat"
          >
            ×
          </button>
          <div
            className="max-w-5xl w-full max-h-[90vh] relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === "image" ? (
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={1600}
                height={1200}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={lightbox.src}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
