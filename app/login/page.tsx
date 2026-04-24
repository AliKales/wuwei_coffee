"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                const data = await res.json();

                // Save password temporarily for the save function
                sessionStorage.setItem("admin_pass", password);

                // Redirect using the URL provided securely by the API
                router.push(data.redirectUrl);
            } else {
                setError("Yanlış şifre (Incorrect password)");
                setLoading(false);
            }
        } catch (err) {
            setError("Bir hata oluştu.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96 text-black">
                <h1 className="text-2xl font-bold mb-6 text-center">Yönetici Girişi</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre"
                    className="w-full border p-3 rounded mb-4"
                    required
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-black text-white p-3 rounded font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </button>
            </form>
        </div>
    );
}