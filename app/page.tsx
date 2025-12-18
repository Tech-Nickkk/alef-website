import Image from "next/image";
import Navbar from "../components/Navbar";
import RecentArticles from "../components/RecentArticles";
import ResearchTopics from "../components/ResearchTopics";
import TrendingRead from "../components/TrendingRead";
import Newsletter from "../components/Newsletter";
import SupportMission from "../components/SupportMission";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="w-full font-optima text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/home/hero-img.png"
            alt="Lebanon Coastline"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <Navbar />

        {/* Hero Content - Placed like Reference Image 1 */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 pb-20 w-full max-w-[1920px] mx-auto">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[0.9] font-cormorant uppercase">
              Exposing Hezbollah’s<br />
              <span className="text-white">Grip Latest Analysis</span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-200 max-w-2xl leading-relaxed border-l-2 border-[#E31B23] pl-6 ml-1 font-optima">
              Educating to Eradicate Terrorism in Lebanon <br />
              <span className="text-gray-200">Quality. Independence. Impact.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
              <button className="group bg-[#E31B23] hover:bg-[#c4151c] text-white px-8 py-3 text-sm font-semibold transition-all shadow-lg shadow-red-900/30 flex items-center gap-3 w-full sm:w-auto justify-center uppercase tracking-widest rounded-none font-optima">
                Explore Research
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group border border-white hover:bg-white hover:text-black text-white px-8 py-3 text-sm font-medium transition-all backdrop-blur-sm w-full sm:w-auto justify-center uppercase tracking-widest rounded-none font-optima">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <RecentArticles />

      {/* Research Topics Section */}
      <ResearchTopics />

      {/* Trending & Most Read Section */}
      <TrendingRead />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Support Mission Section */}
      <SupportMission />

      {/* Footer */}
      <Footer />
    </main>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
