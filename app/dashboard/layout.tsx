// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { DM_Sans } from 'next/font/google'
import './styles.css'
import DashboardNav from "@/components/DashboardNavigation/DashboardNav";
import DashboardSideBar from "@/components/DashboardNavigation/DashboardSideBar";

const dm_sans = DM_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-dm_sans',
})

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${dm_sans.variable} flex flex-col min-h-screen`}>
                <DashboardNav />
                <div className="flex flex-1">
                    <div className="hidden w-64 bg-gray-100 p-4 md:block">
                        <DashboardSideBar />
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 md:p-6">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}