import React from "react";
import DemandSection from "@/src/Home/DemandSection";
import HeroSection from "@/src/Home/HeroSection";
import LogoSlider from "@/src/Home/LogoSlider";
import PropertyTypeSlider from "@/src/Home/PropertyTypeSlider";
import UpcomingProjects from "@/src/Home/UpcomingProjects";
import Cta from "@/src/Home/Cta";
import EasyForYou from "@/src/Home/EasyForYou";
import StatsSection from "@/src/Home/StatsSection";
import TrendingProjectsClient from "@/src/Home/TrendingProjectsClient";

export const metadata = {
  title: "India’s First AI-Driven Real Estate Platform | AI Bricks Realtors",
  description:
    "AI Bricks Realtors is India’s first AI-driven real estate platform, empowering buyers, sellers, and investors to make smarter property decisions with data-backed insights.",

  alternates: {
    canonical: "https://aibricksrealtors.com",
  },

  openGraph: {
    title: "India’s First AI-Driven Real Estate Platform | AI Bricks Realtors",
    description:
      "Discover smarter ways to buy, sell, and invest in real estate with India’s first AI-driven property platform.",
    url: "https://aibricksrealtors.com",
    siteName: "AI Bricks Realtors",
    images: [
      {
        url: "https://aibricksrealtors.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Bricks Realtors – India’s First AI-Driven Real Estate Platform",
      },
    ],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className=" bg-background">
      <HeroSection />
      <UpcomingProjects />
      <TrendingProjectsClient />
      <PropertyTypeSlider />
      <LogoSlider />
      <DemandSection />
      <Cta />
      <EasyForYou />
      <StatsSection />
    </main>
  );
}
