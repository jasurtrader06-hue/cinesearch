"use client";
import { useEffect, useState } from "react";
import { useStore } from "./Store";
export default function Hero({ items }) {
  const [i, setI] = useState(0);
  const s = useStore();
  const n = items.length;
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % n), 8000); return () => clearInterval(t); }, [n, i]);
  const it = items[i];
  if (!it) return null;
  return (
    <section style={!it.backdrop ? { background: it.grad } : undefined} className="relative h-[470px] sm:h-[520px] overflow-hidden">
      {it.backdrop && <img key={it.id} src={it.backdrop} alt="" className="absolute inset-0 w-full h-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/40" />
      <button aria-label="Play" onClick={() => s.playTrailer(it)} className="absolute right-[18%] top-1/2 -translate-y-1/2 hidden md:grid place-items-center w-32 h-32 rounded-full bg-black/60 hover:bg-black/75 text-5xl">▶</button>
      <div className="relative z-10 px-4 sm:px-8 pt-24 max-w-xl">
        <div className="flex gap-2 text-[10px] font-semibold mb-3">
          <span className="bg-brand rounded-full px-2 py-0.5">{it.type === "tv" ? "TV" : "MOVIE"}</span>
          <span className="text-zinc-300 py-0.5">TRENDING TODAY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{it.title}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
          <span className="text-yellow-400">★ {it.rating}</span><span>{it.year}</span>
          {it.genres.map((g) => <span key={g} className="border border-zinc-500 rounded-full px-2 py-0.5">{g}</span>)}
        </div>
        <p className="mt-3 text-sm text-zinc-200 line-clamp-3">{it.overview}</p>
        <div className="flex gap-2 mt-5 flex-wrap text-sm">
          <button onClick={() => s.playTrailer(it)} className="bg-white text-black font-semibold rounded-md px-4 py-2">▶ Play Trailer</button>
          <button onClick={() => s.toggleWl(it)} className="bg-white/15 rounded-md px-4 py-2">{s.inWl(it) ? "✓ In Watchlist" : "+ Add to Watchlist"}</button>
          <button onClick={() => s.setInfo(it)} className="bg-white/15 rounded-md px-4 py-2">ⓘ More Info</button>
        </div>
      </div>
      <div className="absolute z-10 bottom-14 right-8 flex items-center gap-2">
        <button onClick={() => setI((i - 1 + n) % n)} className="w-5 h-5 rounded-full bg-white/20 text-xs">‹</button>
        {items.map((_, k) => <span key={k} onClick={() => setI(k)} className={`h-[3px] w-6 cursor-pointer ${k === i ? "bg-brand" : "bg-white/40"}`} />)}
        <button onClick={() => setI((i + 1) % n)} className="w-5 h-5 rounded-full bg-white/20 text-xs">›</button>
      </div>
    </section>
  );
}
