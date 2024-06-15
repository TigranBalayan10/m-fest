import Hero from "@/components/Hero/Hero";
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
