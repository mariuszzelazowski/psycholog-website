import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import { seo } from "@/config/content";

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Resources />
      <Contact />
    </>
  );
}
