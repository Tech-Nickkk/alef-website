import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { client } from "@/sanity/lib/client";
import { getTranslations } from 'next-intl/server'; // Import from next-intl/server

export const revalidate = 60;
import ExpertsFeed from "./ExpertsFeed";

export default async function ExpertsCornerPage() {
  const t = await getTranslations('ExpertsCornerPage'); // Async translation fetching
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
            text={t('title')}
            className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
          />
          <p className="font-oswald text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
            {t('desc')}
          </p>
        </div>

        <ExpertsFeed initialActivists={activists || []} />

      </main>
    </div>
  );
}