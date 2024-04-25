import Navbar from "@/components/Navigation/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import SearchBar from "@/components/SearchBar/SearchBar";
import CarCards from "@/components/CarCards/CarCards";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <div>
        <Navbar />
        <Hero />
        <SearchBar />
        <CarCards />
      </div>
      <Footer />
    </main>
  );
}
