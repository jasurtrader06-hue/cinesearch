const M = [
 ["Buddy","movie","7.8",2026,["Horror","Comedy","Fantasy"],["#3a0d0d","#121a14"],"A magical, singing orange unicorn holds his cast hostage in a surreal TV-show dimension, as he becomes more and more demented."],
 ["Hope","movie","7.1",2026,["Thriller","Sci-Fi"],["#14090a","#7a0a10"],"A remote village faces a force that feeds on the last thing its people have left."],
 ["The Chair Man","tv","6.9",2026,["Drama","Mystery"],["#2a2118","#0c0c0c"],"A quiet office hides a hierarchy where every seat is earned in secret."],
 ["Glitch Zoo","movie","6.5",2025,["Animation","Comedy"],["#ff7a2f","#2a6bff"],"A broken broadcast brings a cartoon menagerie to life."],
 ["Moonlit Blades","tv","8.2",2026,["Fantasy","Action"],["#dfe4ee","#556"],"Two swordsmen share one destiny across a thousand moonlit nights."],
 ["Practical Magic","movie","6.8",2026,["Romance","Fantasy"],["#b05a2a","#1a0f0a"],"Two sisters face the family curse that has followed them for generations."],
 ["Carrie","tv","7.4",2026,["Horror","Drama"],["#0f3a46","#05161c"],"A teenager with a terrible gift is pushed past her breaking point."],
 ["Animals","movie","7.0",2026,["Crime","Thriller"],["#6a7480","#111"],"Strangers in a city at night discover how thin the line between hunter and prey can be."],
 ["Greenwater","tv","7.6",2025,["Drama","Adventure"],["#35503a","#0a120c"],"A river journey reveals what each traveller left behind."],
 ["Iron Harbor","movie","7.3",2024,["Action","Crime"],["#243447","#0b1118"],"A dock foreman takes on the syndicate that owns the city."],
 ["Paper Moons","tv","8.0",2025,["Drama","Romance"],["#5b3a6b","#150d1a"],"Three friends, one summer, and a decision that changes everything."],
 ["Dune Runner","movie","6.7",2026,["Sci-Fi","Adventure"],["#a8742f","#1f1408"],"A courier crosses a dying desert planet with a package that could end a war."],
].map((m, i) => ({ id: i + 1, type: m[1], title: m[0], rating: m[2], year: String(m[3]), genres: m[4], grad: `linear-gradient(135deg,${m[5][0]},${m[5][1]})`, overview: m[6], poster: null, backdrop: null }));
export default M;
