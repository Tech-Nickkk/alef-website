import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { client } from "@/sanity/lib/client";
import ExpertsFeed from "./ExpertsFeed";

export default async function ExpertsCornerPage() {
  const query = `*[_type == "author" && category in ["officer", "director", "advisor"]] | order(order asc, _createdAt asc) {
                _id,
                name,
                discloseName,
                category,
                position,
                description,
                image
            }`;

  const activists = await client.fetch(query);

  return (
    <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
      <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

        {/* Header matches BlogsPage style */}
        <div className="mb-20 text-center max-w-5xl mx-auto">
          <AnimatedTitle
            text="EXPERTS CORNER"
            className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
          />
          <p className="font-oswald text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
            Meet the dedicated leadership team and our network of expert advisors driving the mission of the American Lebanon Education Foundation.
          </p>
        </div>

        <ExpertsFeed initialActivists={activists || []} />

      </main>
    </div>
  );
}