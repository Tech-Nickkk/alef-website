import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { ShieldCheck, Star, HeartHandshake } from "lucide-react";

export default function SponsorsPage() {
    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 px-4 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">
                            Our Supporters
                        </span>
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                    </div>

                    <AnimatedTitle
                        text="OUR SPONSORS"
                        className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    
                    <p className="font-oswald text-foreground/60 text-lg max-w-2xl mx-auto">
                        We are deeply grateful to the visionaries and partners who empower our mission.
                    </p>
                </div>

                {/* Static Placeholder Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="bg-foreground/5 border border-foreground/10 p-8 rounded-2xl text-center space-y-4">
                        <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto text-red">
                            <Star className="w-6 h-6" />
                        </div>
                        <h3 className="font-bebas text-2xl text-foreground">Community Partners</h3>
                        <p className="font-oswald text-foreground/60 text-sm">
                            Thank you to the individuals who support us every day.
                        </p>
                    </div>

                    <div className="bg-foreground/5 border border-foreground/10 p-8 rounded-2xl text-center space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-red/5 rounded-bl-full"></div>
                        <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto text-red">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="font-bebas text-2xl text-foreground">Strategic Allies</h3>
                        <p className="font-oswald text-foreground/60 text-sm">
                            Key partners helping us drive legislative change.
                        </p>
                    </div>

                    <div className="bg-foreground/5 border border-foreground/10 p-8 rounded-2xl text-center space-y-4">
                        <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto text-red">
                            <HeartHandshake className="w-6 h-6" />
                        </div>
                        <h3 className="font-bebas text-2xl text-foreground">Global Visionaries</h3>
                        <p className="font-oswald text-foreground/60 text-sm">
                            Leaders committed to a free and sovereign Lebanon.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center pt-12 border-t border-foreground/10">
                    <p className="font-oswald text-foreground/50 uppercase tracking-widest text-sm mb-6">
                        Want to become a sponsor?
                    </p>
                    <a href="/donate" className="inline-block bg-red hover:bg-[#c4151c] text-white px-8 py-3 uppercase font-oswald tracking-widest text-sm rounded transition-colors shadow-lg shadow-red/20">
                        Support Our Mission
                    </a>
                </div>

            </div>
        </main>
    );
}