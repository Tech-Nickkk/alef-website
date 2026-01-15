import Image from "next/image";
import AnimatedTitle from "../CommonCom/AnimatedTitle";

export default function PresidentialLetter() {

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1000px] mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-6 md:mb-12 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text="PRESIDENTIAL CORRESPONDENCE"
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        OFFICIAL COMMUNICATION
                    </div>
                </div>

                {/* Letter Image */}
                <div className="relative w-full shadow-2xl rounded-sm overflow-hidden border border-foreground/10 group">
                    <div className="absolute inset-0 bg-blue/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                    <Image
                        src="/home/presidentialLetter.jpg"
                        alt="Letter from President Donald J. Trump"
                        width={1000}
                        height={1400}
                        className="w-full h-auto object-cover"
                    />
                </div>

            </div>
        </section>
    );
}
