import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { client } from "@/sanity/lib/client";
import BlogsFeed from "../../components/Blogs/BlogsFeed";

export default async function BlogsPage() {
    const query = `
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      author->{
        name,
        discloseName,
        image
      }
    }
  `;

    const blogs = await client.fetch(query);

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                <div className="mb-20 text-center max-w-5xl mx-auto">
                    <AnimatedTitle
                        text="BLOGS & ARTICLES"
                        className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <p className="font-oswald text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto">
                        In-depth analysis, geopolitical strategy, and critical updates.
                    </p>
                </div>

                <BlogsFeed initialBlogs={blogs} />

            </main>
        </div>
    );
}
