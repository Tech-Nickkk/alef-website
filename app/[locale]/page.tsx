import Hero from "@/app/components/HomeCom/Hero";

export const revalidate = 60;
import PresidentialLetter from "@/app/components/HomeCom/PresidentialLetter";
import ChairmanMessage from "@/app/components/HomeCom/ChairmanMessage";
import WhoWeAre from "@/app/components/HomeCom/WhoWeAre";
import BlogsAndArticles from "@/app/components/HomeCom/BlogsAndArticles";
import AlliedOrganizations from "@/app/components/HomeCom/AliiedOrganizations";
import HouseOfCorruption from "@/app/components/HomeCom/HouseOfCorruption";
import HouseOfCards from "@/app/components/HomeCom/HouseOfCards";
import Media from "@/app/components/HomeCom/Media";
import CongressionalActions from "@/app/components/HomeCom/CongressionalActions";
import CTASection from "@/app/components/CommonCom/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <PresidentialLetter />
      <ChairmanMessage />
      <WhoWeAre />
      <CTASection type="subscribe" />
      <HouseOfCorruption />
      <HouseOfCards />
      <CTASection type="donate" />
      <CongressionalActions />
      <BlogsAndArticles />
      <CTASection type="join" />
      <AlliedOrganizations />
      <Media />
    </main>
  );
}