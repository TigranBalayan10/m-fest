
import { DM_Sans } from "next/font/google";
import "./styles.css";
import DashboardNav from "@/components/DashboardNavigation/DashboardNav";
import DashboardSideBar from "@/components/DashboardNavigation/DashboardSideBar";
import { Toaster } from "@/components/ui/toaster";


const dm_sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm_sans",
});


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dm_sans.variable} flex flex-col min-h-screen`}>
      <DashboardNav />
      <div className="flex flex-1">
        <div className="hidden w-64 bg-gray-100 p-4 md:block">
          <DashboardSideBar />
        </div>
        <div className="flex-1 bg-gray-50 p-4 md:p-6">{children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}
