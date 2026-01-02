import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import { Star } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

interface Author {
    _id: string;
    name?: string;
    discloseName?: boolean;
    category?: 'officer' | 'director' | 'advisor' | 'blogAuthor';
    position?: string;
    description?: string;
    image?: any;
}

export default async function ResidentActivistsPage() {
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

    const officers = (activists || []).filter((a: Author) => a.category === 'officer');
    const directors = (activists || []).filter((a: Author) => a.category === 'director');
    const advisors = (activists || []).filter((a: Author) => a.category === 'advisor');

    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">

            <main className="grow pt-32 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full z-10 relative">

                {/* Header */}
                <div className="mb-20 text-center max-w-4xl mx-auto">
                    <AnimatedTitle
                        text="ALEF Officers, Directors & Advisors"
                        className="text-5xl md:text-7xl font-bebas text-foreground mb-6 justify-center flex text-center"
                    />
                    <div className="h-1 w-24 bg-red mx-auto mb-8"></div>
                    <p className="font-oswald text-xl text-foreground/80 leading-relaxed">
                        Meet the dedicated leadership team and our network of expert advisors driving the mission of the American Lebanon Education Foundation.
                    </p>
                </div>

                {/* Section 1: ALEF Officers */}
                {officers.length > 0 && (
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="h-px bg-red w-12"></span>
                            <h2 className="text-3xl font-bebas text-foreground tracking-wide">ALEF Officers</h2>
                            <span className="h-px bg-foreground/10 grow"></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {officers.map((officer: Author) => (
                                <div key={officer._id} className="bg-blue border border-light-blue p-6 rounded-sm hover:-translate-y-1 transition-transform duration-300 group">
                                    <div className="w-full aspect-4/5 bg-black/30 mb-6 rounded-sm relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                                        {officer.image ? (
                                            <Image
                                                src={urlFor(officer.image).width(400).height(500).url()}
                                                alt={officer.discloseName === true ? (officer.name || 'Officer') : 'Officer'}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <Image
                                                src="/home/default-avatar.svg"
                                                alt="Default Avatar"
                                                fill
                                                className="object-contain p-12 opacity-20"
                                            />
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bebas text-white mb-2 group-hover:text-red transition-colors">
                                        {officer.discloseName === true ? (officer.name || <Star className="w-6 h-6 fill-white inline-block" />) : <Star className="w-6 h-6 fill-white inline-block" />}
                                    </h3>
                                    {officer.position && (
                                        <p className="font-oswald text-red text-sm tracking-wide uppercase">{officer.position}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 2: ALEF Directors */}
                {directors.length > 0 && (
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="h-px bg-red w-12"></span>
                            <h2 className="text-3xl font-bebas text-foreground tracking-wide">ALEF Directors</h2>
                            <span className="h-px bg-foreground/10 grow"></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {directors.map((director: Author) => (
                                <div key={director._id} className="bg-blue border border-light-blue p-6 rounded-sm hover:bg-light-blue transition-colors duration-300 flex flex-col items-center text-center h-full">
                                    <div className="w-full aspect-4/5 bg-black/30 mb-6 rounded-sm relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent shrink-0">
                                        {director.image ? (
                                            <Image
                                                src={urlFor(director.image).width(400).height(500).url()}
                                                alt={director.discloseName === true ? (director.name || 'Director') : 'Director'}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <Image
                                                src="/home/default-avatar.svg"
                                                alt="Default Avatar"
                                                fill
                                                className="object-contain p-12 opacity-20"
                                            />
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bebas text-white mb-3 tracking-wide">
                                        {director.discloseName === true ? (director.name || <Star className="w-6 h-6 fill-white inline-block" />) : <Star className="w-6 h-6 fill-white inline-block" />}
                                    </h3>
                                    <p className="font-oswald text-white/70 text-sm leading-relaxed">
                                        {director.description || director.position}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 3: ALEF Expert Advisors */}
                {advisors.length > 0 && (
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="h-px bg-red w-12"></span>
                            <h2 className="text-3xl font-bebas text-foreground tracking-wide">ALEF Expert Advisors</h2>
                            <span className="h-px bg-foreground/10 grow"></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {advisors.map((advisor: Author) => (
                                <div key={advisor._id} className="bg-blue border border-light-blue p-6 rounded-sm hover:bg-light-blue transition-colors duration-300 flex flex-col items-center text-center h-full">
                                    <div className="w-full aspect-4/5 bg-black/30 mb-6 rounded-sm relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent shrink-0">
                                        {advisor.image ? (
                                            <Image
                                                src={urlFor(advisor.image).width(400).height(500).url()}
                                                alt={advisor.discloseName === true ? (advisor.name || 'Advisor') : 'Advisor'}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <Image
                                                src="/home/default-avatar.svg"
                                                alt="Default Avatar"
                                                fill
                                                className="object-contain p-12 opacity-20"
                                            />
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bebas text-white mb-3 tracking-wide">
                                        {advisor.discloseName === true ? (advisor.name || <Star className="w-6 h-6 fill-white inline-block" />) : <Star className="w-6 h-6 fill-white inline-block" />}
                                    </h3>
                                    <p className="font-oswald text-white/70 text-sm leading-relaxed">
                                        {advisor.description || advisor.position}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </main>
            <SanityLive />
        </div>
    );
}
