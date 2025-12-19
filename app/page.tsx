// app/page.tsx
import Hero from "./components/HomeCom/Hero";
import AboutTeaser from "./components/HomeCom/AboutTeaser";
import ResearchTopics from "./components/HomeCom/ResearchTopics";
import TrendingRead from "./components/HomeCom/TrendingRead";
import Resources from "./components/HomeCom/Resources";
import SupportMission from "./components/CommonCom/SupportMission";
import Footer from "./components/CommonCom/Footer";

export default function Home() {
  return (
    <main className="w-full font-optima text-white">
      <Hero />
      <AboutTeaser />
      <ResearchTopics />
      <TrendingRead />
      <Resources />
      <SupportMission />
      <Footer />
    </main>
  );
}