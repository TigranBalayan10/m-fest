import Navbar from "@/components/Navigation/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import SearchBar from "@/components/SearchBar/SearchBar";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <div>
        <Navbar />
        <Hero />
        <SearchBar />
      </div>
      <Footer />
    </main>
  );
}
