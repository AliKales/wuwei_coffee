"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditMenuPage() {
    const router = useRouter();
    const [menu, setMenu] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        const pass = sessionStorage.getItem("admin_pass");
        if (!pass) {
            router.push("/login");
            return;
        }
        setPassword(pass);

        const url = process.env.NEXT_PUBLIC_MENU_BLOB_URL as string;
        // Bust the Vercel Blob CDN cache so we always get the latest version.
        fetch(`${url}?t=${Date.now()}`, { cache: "no-store" })
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                // Make sure the expected shape is there so we don't edit a
                // blank object and overwrite the blob with an empty menu.
                if (!data || typeof data !== "object" || !Array.isArray(data.sections)) {
                    throw new Error("Menü dosyası geçersiz formatta.");
                }
                setMenu(data);
            })
            .catch((err) => {
                console.error(err);
                alert("Menü yüklenirken hata oluştu: " + err.message);
            });
    }, [router]);

    const handleSave = async () => {
        if (!menu || !Array.isArray(menu.sections)) {
            alert("Menü verisi eksik, kaydedilemiyor.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/update-menu-LTgi5OYVnzXztIGM", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, menuData: menu }),
            });

            const text = await res.text();
            if (res.ok) {
                alert("Menü başarıyla güncellendi!");
            } else {
                alert(`Kaydetme başarısız (${res.status}): ${text}`);
            }
        } catch (err) {
            alert("Kaydetme hatası: " + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const moveSection = (index: number, direction: "up" | "down") => {
        const newMenu = JSON.parse(JSON.stringify(menu));
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        const temp = newMenu.sections[targetIndex];
        newMenu.sections[targetIndex] = newMenu.sections[index];
        newMenu.sections[index] = temp;

        setMenu(newMenu);
    };

    const moveItem = (sIdx: number, iIdx: number, direction: "up" | "down") => {
        const newMenu = JSON.parse(JSON.stringify(menu));
        const targetIndex = direction === "up" ? iIdx - 1 : iIdx + 1;
        const items = newMenu.sections[sIdx].items;

        const temp = items[targetIndex];
        items[targetIndex] = items[iIdx];
        items[iIdx] = temp;

        setMenu(newMenu);
    };

    if (!menu) return <div className="p-10 text-center">Yükleniyor...</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 text-black bg-gray-50 min-h-screen">

            {/* PAGE HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Menü Düzenleyici</h1>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 sm:py-2 rounded-full font-bold hover:bg-green-700 transition-colors shadow-sm"
                >
                    {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </button>
            </div>

            {/* HEADER INFO */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border mb-8 space-y-4">
                <h2 className="text-lg sm:text-xl font-bold border-b pb-2">Ana Bilgiler</h2>
                <div>
                    <label className="block text-sm font-semibold mb-1">Başlık</label>
                    <input className="w-full border p-2 sm:p-3 rounded" value={menu.title} onChange={e => setMenu({ ...menu, title: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Slogan (Kicker)</label>
                    <input className="w-full border p-2 sm:p-3 rounded" value={menu.kicker} onChange={e => setMenu({ ...menu, kicker: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Giriş Metni (Intro)</label>
                    <textarea className="w-full border p-2 sm:p-3 rounded h-24" value={menu.intro} onChange={e => setMenu({ ...menu, intro: e.target.value })} />
                </div>
            </div>

            {/* SECTIONS */}
            <div className="space-y-8 sm:space-y-12">
                {menu.sections.map((section: any, sIdx: number) => (
                    <div key={section.id || sIdx} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">

                        {/* CATEGORY HEADER */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <input
                                className="text-xl sm:text-2xl font-bold border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full sm:w-1/2"
                                value={section.title}
                                onChange={(e) => {
                                    const newMenu = { ...menu };
                                    newMenu.sections[sIdx].title = e.target.value;
                                    setMenu(newMenu);
                                }}
                            />

                            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                                <div className="flex bg-gray-100 rounded overflow-hidden border border-gray-200">
                                    <button
                                        disabled={sIdx === 0}
                                        onClick={() => moveSection(sIdx, "up")}
                                        className="px-4 sm:px-3 py-2 sm:py-1 hover:bg-gray-200 disabled:opacity-30 border-r border-gray-300"
                                    >
                                        ↑
                                    </button>
                                    <button
                                        disabled={sIdx === menu.sections.length - 1}
                                        onClick={() => moveSection(sIdx, "down")}
                                        className="px-4 sm:px-3 py-2 sm:py-1 hover:bg-gray-200 disabled:opacity-30"
                                    >
                                        ↓
                                    </button>
                                </div>

                                <button
                                    className="text-red-500 text-sm font-semibold hover:bg-red-50 px-3 py-2 rounded"
                                    onClick={() => {
                                        if (confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
                                            const newMenu = { ...menu };
                                            newMenu.sections.splice(sIdx, 1);
                                            setMenu(newMenu);
                                        }
                                    }}
                                >
                                    Sil
                                </button>
                            </div>
                        </div>

                        {/* ITEMS LIST */}
                        <div className="space-y-4">
                            {section.items.map((item: any, iIdx: number) => (
                                <div key={iIdx} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center bg-gray-50 p-3 sm:p-4 rounded border border-gray-200 group">

                                    {/* TEXT INPUTS (Stack on mobile, expand on desktop) */}
                                    <div className="flex-1 w-full space-y-2">
                                        <input className="w-full border p-2 rounded text-sm font-bold" placeholder="Ürün Adı" value={item.name}
                                            onChange={(e) => {
                                                const newMenu = { ...menu };
                                                newMenu.sections[sIdx].items[iIdx].name = e.target.value;
                                                setMenu(newMenu);
                                            }}
                                        />
                                        <input className="w-full border p-2 rounded text-sm" placeholder="Açıklama" value={item.desc || ""}
                                            onChange={(e) => {
                                                const newMenu = { ...menu };
                                                newMenu.sections[sIdx].items[iIdx].desc = e.target.value;
                                                setMenu(newMenu);
                                            }}
                                        />
                                    </div>

                                    {/* CONTROLS (Price, Arrows, Delete - Row on mobile & desktop) */}
                                    <div className="flex items-center justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-gray-200">
                                        <div className="w-24 flex-shrink-0">
                                            <input className="w-full border p-2 rounded font-bold" placeholder="₺Fiyat" value={item.price}
                                                onChange={(e) => {
                                                    const newMenu = { ...menu };
                                                    newMenu.sections[sIdx].items[iIdx].price = e.target.value;
                                                    setMenu(newMenu);
                                                }}
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex bg-white border border-gray-300 rounded shadow-sm">
                                                <button
                                                    disabled={iIdx === 0}
                                                    onClick={() => moveItem(sIdx, iIdx, "up")}
                                                    className="px-3 py-2 sm:py-1 hover:bg-gray-100 disabled:opacity-20 border-r border-gray-200"
                                                >
                                                    ↑
                                                </button>
                                                <button
                                                    disabled={iIdx === section.items.length - 1}
                                                    onClick={() => moveItem(sIdx, iIdx, "down")}
                                                    className="px-3 py-2 sm:py-1 hover:bg-gray-100 disabled:opacity-20"
                                                >
                                                    ↓
                                                </button>
                                            </div>

                                            <button
                                                className="text-red-500 hover:bg-red-100 p-2 rounded transition-colors"
                                                onClick={() => {
                                                    const newMenu = { ...menu };
                                                    newMenu.sections[sIdx].items.splice(iIdx, 1);
                                                    setMenu(newMenu);
                                                }}>
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="mt-4 text-blue-600 text-sm font-semibold px-4 py-3 sm:py-2 hover:bg-blue-50 rounded transition-colors w-full sm:w-auto border border-blue-100 sm:border-transparent text-center sm:text-left"
                            onClick={() => {
                                const newMenu = { ...menu };
                                newMenu.sections[sIdx].items.push({ name: "", desc: "", price: "₺" });
                                setMenu(newMenu);
                            }}
                        >
                            + Yeni Ürün Ekle
                        </button>
                    </div>
                ))}
            </div>

            <button
                className="mt-8 w-full py-4 border-2 border-dashed border-gray-300 text-gray-500 font-bold rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-colors"
                onClick={() => {
                    const newMenu = { ...menu };
                    newMenu.sections.push({ id: `kategori-${Date.now()}`, title: "Yeni Kategori", image: "", items: [] });
                    setMenu(newMenu);
                }}
            >
                + Yeni Kategori Ekle
            </button>
        </div>
    );
}