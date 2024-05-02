import Navbar from "@/components/Navigation/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import SearchBar from "@/components/SearchBar/SearchBar";
import Inventory from "@/components/Inventory/Inventory";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <div>
        <Navbar />
        <Hero />
        <SearchBar />
        <Inventory />
      </div>
      <Footer />
    </main>
  );
}
