const KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
import MOCK from "./mock";
const live = !!KEY && !KEY.startsWith("BU_YERGA");
export const hasKey = true; // kalit bo'lmasa namunaviy ma'lumot ishlatiladi
export const img = (p, s = "w500") => (p ? `https://image.tmdb.org/t/p/${s}${p}` : null);
async function tmdb(path, params = {}) {
  const q = new URLSearchParams({ api_key: KEY, language: "en-US", ...params });
  const r = await fetch(`https://api.themoviedb.org/3${path}?${q}`);
  if (!r.ok) throw new Error("TMDB xato");
  return r.json();
}
export const GENRES = { 28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Sci-Fi",53:"Thriller",10752:"War",37:"Western",10759:"Action",10765:"Sci-Fi",10768:"War" };
const norm = (x, t) => ({
  id: x.id, type: x.media_type || t || (x.title ? "movie" : "tv"),
  title: x.title || x.name, overview: x.overview,
  rating: x.vote_average ? x.vote_average.toFixed(1) : "–",
  year: (x.release_date || x.first_air_date || "").slice(0, 4),
  genres: (x.genre_ids || []).slice(0, 3).map((g) => GENRES[g]).filter(Boolean),
  poster: img(x.poster_path), backdrop: img(x.backdrop_path, "original"),
});
const clean = (a, t) => a.filter((r) => r.media_type !== "person").map((r) => norm(r, t));
export const trending = async () => !live ? MOCK : clean((await tmdb("/trending/all/day")).results);
export const search = async (q) => !live ? MOCK.filter((m) => m.title.toLowerCase().includes(q.toLowerCase())) : clean((await tmdb("/search/multi", { query: q })).results);
export const discover = async (type, genre, page = 1) => !live ? (page > 1 ? [] : MOCK.filter((m) => m.type === type && (!genre || m.genres.includes(GENRES[genre])))) :
  clean((await tmdb(`/discover/${type}`, { with_genres: genre || "", sort_by: "popularity.desc", page })).results, type);
export async function trailer(type, id) {
  if (!live) return null;
  const v = (await tmdb(`/${type}/${id}/videos`)).results;
  return (v.find((x) => x.site === "YouTube" && x.type === "Trailer") || v.find((x) => x.site === "YouTube"))?.key || null;
}
