"use client";
import { useEffect, useState } from "react";
import { Grid } from "@/components/Card";
import NoKey from "@/components/NoKey";
import { hasKey, search } from "@/lib/tmdb";
export default function Search() {
  const [q, setQ] = useState(""); const [r, setR] = useState([]);
  useEffect(() => {
    if (!q.trim() || !hasKey) return setR([]);
    const t = setTimeout(() => search(q).then(setR).catch(() => {}), 350);
    return () => clearTimeout(t);
  }, [q]);
  return (
    <main className="pt-20 px-4 sm:px-8 pb-10">
      {!hasKey && <NoKey />}
      <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Film yoki serial nomi…" className="w-full max-w-xl bg-panel border border-zinc-700 rounded-md px-4 py-3 mb-6 outline-none focus:border-white" />
      <Grid items={r} empty={q ? "Hech narsa topilmadi." : "Qidirishni boshlang."} />
    </main>
  );
}
