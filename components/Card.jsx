"use client";
import { useStore } from "./Store";
export default function Card({ item, wide }) {
  const { setInfo } = useStore();
  return (
    <button onClick={() => setInfo(item)} style={!item.poster ? { background: item.grad } : undefined} className={`relative shrink-0 text-left rounded-md overflow-hidden bg-panel aspect-[2/3] hover:ring-2 ring-white/70 transition ${wide ? "w-full" : "w-[120px] sm:w-[150px]"}`}>
      {item.poster ? <img src={item.poster} alt={item.title} loading="lazy" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-end p-2.5 text-[15px] font-bold leading-tight">{item.title}</div>}
      <span className="absolute top-1.5 left-1.5 bg-black/80 text-[9px] font-semibold rounded px-1.5 py-0.5">{item.type === "tv" ? "TV" : "MOVIE"}</span>
    </button>
  );
}
export function Grid({ items, empty }) {
  if (!items.length) return <p className="text-zinc-400 py-10">{empty}</p>;
  return <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4">{items.map((i) => <Card wide key={i.type + i.id} item={i} />)}</div>;
}
