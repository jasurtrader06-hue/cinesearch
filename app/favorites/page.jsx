"use client";
import { Grid } from "@/components/Card";
import { useStore } from "@/components/Store";
export default function Page() {
  const s = useStore();
  return (
    <main className="pt-20 px-4 sm:px-8 pb-10">
      <h1 className="text-2xl font-bold mb-5">Favorites</h1>
      <Grid items={s.fav} empty="Hozircha bo'sh. Kartani bosib qo'shing." />
    </main>
  );
}
