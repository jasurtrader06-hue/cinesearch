"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import NoKey from "@/components/NoKey";
import { hasKey, trending } from "@/lib/tmdb";
export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => { if (hasKey) trending().then(setItems).catch(() => {}); }, []);
  if (!hasKey) return <div className="pt-20 px-4"><NoKey /></div>;
  return (
    <main>
      <Hero items={items.filter((x) => x.backdrop || x.grad).slice(0, 6)} />
      <section className="px-4 sm:px-8 -mt-10 relative z-10 pb-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">Trending Today</h2>
          <Link href="/discover" className="text-xs text-zinc-400">See All</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto noscroll pb-2">{items.map((i) => <Card key={i.type + i.id} item={i} />)}</div>
      </section>
    </main>
  );
}
