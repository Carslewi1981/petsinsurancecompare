import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/lib/store";
import CompareModal from "@/components/CompareModal";
import ContactModal from "@/components/ContactModal";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PetPlan Compare — Pet Insurance Comparison",
  description:
    "Compare top pet insurance plans for dogs, cats, birds, reptiles, and exotic animals — in seconds.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
      className={`${bricolage.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <Navbar />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <CompareModal />
          <ContactModal />
        </StoreProvider>
      </body>
    </html>
  );
}
