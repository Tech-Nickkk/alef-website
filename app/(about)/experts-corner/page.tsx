import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import ExpertsCornerClient from "./ExpertsCornerClient";

export default async function ExpertsCornerPage() {
    const query = `
    *[_type == "author" && category in ["officer", "director", "advisor"]] | order(_createdAt asc) {
      _id,
      name,
      discloseName,
      category,
      position,
      description,
      image
    }
  `;

    const { data: activists } = await sanityFetch({ query: query });

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
            <ExpertsCornerClient activists={activists || []} />
            <SanityLive />
        </div>
    );
}
