import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import JsonLd from "@/components/JsonLd";
import { AppSection } from "@/config/enums";
import { buildSiteMetadata } from "@/lib/metadata";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = buildSiteMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f6f3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${fraunces.variable} ${plusJakarta.variable} overflow-x-clip`}
    >
      <body
        className={`${plusJakarta.className} min-h-screen flex flex-col overflow-x-clip antialiased`}
      >
        <MotionProvider>
          <JsonLd />
          <a
            href={`#${AppSection.About}`}
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:shadow-lg focus:outline focus:outline-2 focus:outline-primary"
          >
            Przejdź do treści
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
