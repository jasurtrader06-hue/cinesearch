"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { trailer } from "@/lib/tmdb";
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);
const same = (a, b) => a.id === b.id && a.type === b.type;
export function StoreProvider({ children }) {
  const [wl, setWl] = useState([]);
  const [fav, setFav] = useState([]);
  const [info, setInfo] = useState(null);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    try { setWl(JSON.parse(localStorage.getItem("wl") || "[]")); setFav(JSON.parse(localStorage.getItem("fav") || "[]")); } catch {}
  }, []);
  const toggler = (list, set, key) => (item) => {
    const n = list.some((x) => same(x, item)) ? list.filter((x) => !same(x, item)) : [item, ...list];
    set(n); localStorage.setItem(key, JSON.stringify(n));
  };
  const playTrailer = async (item) => {
    setVideo("loading");
    try { setVideo((await trailer(item.type, item.id)) || "none"); } catch { setVideo("none"); }
  };
  const v = {
    wl, fav, info, setInfo, playTrailer,
    toggleWl: toggler(wl, setWl, "wl"), toggleFav: toggler(fav, setFav, "fav"),
    inWl: (i) => wl.some((x) => same(x, i)), inFav: (i) => fav.some((x) => same(x, i)),
  };
  return (
    <Ctx.Provider value={v}>
      {children}
      {info && <InfoModal item={info} />}
      {video && <VideoModal video={video} close={() => setVideo(null)} />}
    </Ctx.Provider>
  );
}
function Shell({ close, children }) {
  useEffect(() => { const f = (e) => e.key === "Escape" && close(); addEventListener("keydown", f); return () => removeEventListener("keydown", f); }, [close]);
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={close}>
      <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} className="absolute -top-9 right-0 text-2xl">✕</button>{children}
      </div>
    </div>
  );
}
function VideoModal({ video, close }) {
  return (
    <Shell close={close}>
      <div className="aspect-video bg-black rounded-lg overflow-hidden grid place-items-center">
        {video === "loading" ? <p>Yuklanmoqda…</p> : video === "none" ? <p>Treyler topilmadi</p> :
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />}
      </div>
    </Shell>
  );
}
function InfoModal({ item }) {
  const s = useStore();
  const close = () => s.setInfo(null);
  return (
    <Shell close={close}>
      <div className="bg-panel rounded-xl overflow-hidden">
        {item.backdrop ? <img src={item.backdrop} alt="" className="w-full h-56 object-cover" /> : <div className="w-full h-40" style={{ background: item.grad }} />}
        <div className="p-5">
          <h2 className="text-2xl font-bold">{item.title}</h2>
          <p className="text-sm text-zinc-400 mt-1">★ {item.rating} · {item.year} · {item.type === "tv" ? "TV" : "Movie"} · {item.genres.join(", ")}</p>
          <p className="mt-3 text-sm text-zinc-300">{item.overview || "Tavsif yo'q."}</p>
          <div className="flex gap-2 mt-4 flex-wrap">
            <button className="bg-white text-black rounded-md px-4 py-2 text-sm font-semibold" onClick={() => s.playTrailer(item)}>▶ Play Trailer</button>
            <button className="bg-zinc-700 rounded-md px-4 py-2 text-sm" onClick={() => s.toggleWl(item)}>{s.inWl(item) ? "✓ In Watchlist" : "+ Add to Watchlist"}</button>
            <button className="bg-zinc-700 rounded-md px-4 py-2 text-sm" onClick={() => s.toggleFav(item)}>{s.inFav(item) ? "♥ Favorited" : "♡ Favorite"}</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
