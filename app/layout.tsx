import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Footer/Footer";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "M-Fest Motorsport - Premium BMW and Used Car Dealership in Cleveland, Ohio",
  description: "M-Fest Motorsport is a leading car dealership in Cleveland, Ohio, specializing in new and used cars, with an emphasis on BMW. Explore our wide selection of high-quality vehicles and experience exceptional customer service.",
  openGraph: {
    title: "M-Fest Motorsport - Premium BMW and Used Car Dealership in Cleveland, Ohio",
    description: "M-Fest Motorsport is a leading car dealership in Cleveland, Ohio, specializing in new and used cars, with an emphasis on BMW. Explore our wide selection of high-quality vehicles and experience exceptional customer service.",
    url: "https://m-fest.vercel.app/",
    siteName: "M-Fest Motorsport",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M-Fest Motorsport - Premium BMW and Used Car Dealership in Cleveland, Ohio",
    description: "M-Fest Motorsport is a leading car dealership in Cleveland, Ohio, specializing in new and used cars, with an emphasis on BMW. Explore our wide selection of high-quality vehicles and experience exceptional customer service.",
    creator: "@M-FestMotorsport",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  keywords: [
    "M-Fest Motorsport",
    "Car Dealership",
    "Cleveland",
    "Ohio",
    "BMW",
    "New Cars",
    "Used Cars",
    "Premium Vehicles",
    "Luxury Cars",
    "Car Sales",
    "Auto Financing",
    "Car Service",
    "Car Maintenance",
  ],
  authors: [
    {
      name: "M-Fest Motorsport",
      url: "https://m-fest.vercel.app/",
    },
  ],
  creator: "M-Fest Motorsport",
  publisher: "M-Fest Motorsport",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://m-fest.vercel.app/",
    languages: {
      "en-US": "https://m-fest.vercel.app/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
