import Navbar from "@/components/Navigation/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";


export default function Home() {
  return (
<main className="flex flex-col min-h-screen">
    <Navbar />
    <Hero />
    <Footer />
</main>
  );
}
