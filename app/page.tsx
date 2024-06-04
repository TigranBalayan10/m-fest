import Navbar from "@/components/Navigation/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import SearchBar from "@/components/SearchBar/SearchBar";
import Inventory from "@/components/Inventory/Inventory";
import InventoryPage from "./inventory/page";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <div>
        <Hero />
        <InventoryPage />
      </div>
    </main>
  );
}
