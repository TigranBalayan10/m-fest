import Navbar from "@/components/Navigation/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
// import SearchBar from "@/components/SearchBar/SearchBar";
import ComboboxDemo from "@/components/SearchBar/ComboboxDemo";


export default function Home() {
  return (
<main className="flex flex-col min-h-screen">
    <Navbar />
    <Hero />
    {/* <SearchBar /> */}
    
    <ComboboxDemo />
    <Footer />
</main>
  );
}
