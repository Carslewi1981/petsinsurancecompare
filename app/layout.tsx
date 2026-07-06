import type { Metadata } from "next";
import { Bebas_Neue, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/lib/store";
import CompareModal from "@/components/CompareModal";
import ContactModal from "@/components/ContactModal";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-next",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-next",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-next",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PetPlan Compare — Pet Insurance Comparison",
  description:
    "Compare top pet insurance plans for dogs, cats, birds, reptiles, and exotic animals — in seconds.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${playfairDisplay.variable} antialiased`}
    >
      <body className="bg-ivory text-text-primary font-[var(--font-inter)] min-h-screen flex flex-col">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CompareModal />
          <ContactModal />
        </StoreProvider>
      </body>
    </html>
  );
}
