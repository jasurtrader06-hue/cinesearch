"use client";
import { useEffect, useState } from "react";
import { Grid } from "@/components/Card";
import NoKey from "@/components/NoKey";
import { GENRES, discover, hasKey } from "@/lib/tmdb";
const list = Object.entries(GENRES).filter(([id]) => +id < 10000);
export default function Discover() {
  const [type, setType] = useState("movie"); const [genre, setGenre] = useState(""); const [page, setPage] = useState(1); const [items, setItems] = useState([]);
  useEffect(() => { setPage(1); setItems([]); }, [type, genre]);
  useEffect(() => { if (hasKey) discover(type, genre, page).then((n) => setItems((o) => (page === 1 ? n : [...o, ...n]))).catch(() => {}); }, [type, genre, page]);
  return (
    <main className="pt-20 px-4 sm:px-8 pb-10">
      {!hasKey && <NoKey />}
      <div className="flex gap-2 mb-6 flex-wrap text-sm">
        {[["movie", "Movies"], ["tv", "TV Shows"]].map(([v, n]) => <button key={v} onClick={() => setType(v)} className={`rounded-full px-4 py-1.5 ${type === v ? "bg-white text-black" : "bg-panel"}`}>{n}</button>)}
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="bg-panel rounded-full px-4 py-1.5">
          <option value="">All genres</option>{list.map(([id, n]) => <option key={id} value={id}>{n}</option>)}
        </select>
      </div>
      <Grid items={items} empty="Yuklanmoqda…" />
      {items.length > 0 && <button onClick={() => setPage(page + 1)} className="mt-8 mx-auto block bg-panel rounded-md px-6 py-2 text-sm">Load more</button>}
    </main>
  );
}
