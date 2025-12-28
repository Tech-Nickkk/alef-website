import Hero from "./components/HomeCom/Hero";
import ChairmanMessage from "./components/HomeCom/ChairmanMessage";
import WhoWeAre from "./components/HomeCom/WhoWeAre";
import BlogsAndArticles from "./components/HomeCom/BlogsAndArticles";
import AlliedOrganizations from "./components/HomeCom/AliiedOrganizations";
import HouseOfCorruption from "./components/HomeCom/HouseOfCorruption";
import HouseOfCards from "./components/HomeCom/HouseOfCards";
import Media from "./components/HomeCom/Media";
import CongressionalActions from "./components/HomeCom/CongressionalActions";

export default function Home() {
  return (
    <main>
      <Hero />
      <ChairmanMessage />
      <WhoWeAre />
      <HouseOfCorruption />
      <HouseOfCards />
      <CongressionalActions />
      <BlogsAndArticles />
      <AlliedOrganizations />
      <Media />
    </main>
  );
}