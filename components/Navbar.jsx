"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
const links = [["Home","/"],["Search","/search"],["Discover","/discover"],["Watchlist","/watchlist"],["Favorites","/favorites"]];
export default function Navbar() {
  const p = usePathname(), r = useRouter();
  useEffect(() => { const f = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); r.push("/search"); } }; addEventListener("keydown", f); return () => removeEventListener("keydown", f); }, [r]);
  return (
    <nav className="absolute top-0 inset-x-0 z-30 flex items-center gap-6 px-4 sm:px-8 h-14 text-[13px]">
      <Link href="/" className="text-xl font-black tracking-tight"><span className="text-brand">CINE</span>SEARCH</Link>
      <div className="hidden sm:flex gap-5">
        {links.map(([n, h]) => <Link key={h} href={h} className={p === h ? "text-white" : "text-zinc-400 hover:text-white"}>{n}</Link>)}
      </div>
      <Link href="/search" className="ml-auto flex items-center gap-2 border border-zinc-600 rounded-md px-3 py-1 text-zinc-300">
        🔍 Search <kbd className="text-[10px] bg-zinc-700 rounded px-1">Ctrl K</kbd>
      </Link>
    </nav>
  );
}
