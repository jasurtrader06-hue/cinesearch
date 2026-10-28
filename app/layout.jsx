import "./globals.css";
import Navbar from "@/components/Navbar";
import { StoreProvider } from "@/components/Store";
export const metadata = { title: "CineSearch", description: "Filmlar va seriallarni qidiring" };
export default function RootLayout({ children }) {
  return (
    <html lang="uz"><body>
      <StoreProvider><Navbar />{children}</StoreProvider>
    </body></html>
  );
}
