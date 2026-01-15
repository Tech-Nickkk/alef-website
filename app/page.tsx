import Hero from "./components/HomeCom/Hero";
import PresidentialLetter from "./components/HomeCom/PresidentialLetter";
import ChairmanMessage from "./components/HomeCom/ChairmanMessage";
import WhoWeAre from "./components/HomeCom/WhoWeAre";
import BlogsAndArticles from "./components/HomeCom/BlogsAndArticles";
import AlliedOrganizations from "./components/HomeCom/AliiedOrganizations";
import HouseOfCorruption from "./components/HomeCom/HouseOfCorruption";
import HouseOfCards from "./components/HomeCom/HouseOfCards";
import Media from "./components/HomeCom/Media";
import CongressionalActions from "./components/HomeCom/CongressionalActions";
import CTASection from "./components/CommonCom/CTASection";

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