export default function SupportMission() {
    return (
        <section className="px-6 md:px-12 lg:px-24 pb-24 bg-[#FAFAFA]">
            <div className="max-w-[1400px] mx-auto bg-[#1a2b4b] rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden flex flex-col items-center justify-center text-center">

                {/* Background Circles - Abstract Decoration */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-2xl space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-cormorant">
                        Support Our Mission
                    </h2>

                    <p className="text-white/80 text-lg leading-relaxed font-optima">
                        Help A.L.E.F. continue its independent research and awareness initiatives to eradicate terrorism in Lebanon.
                    </p>

                    <div className="pt-4">
                        <button className="bg-[#E31B23] hover:bg-[#c4151c] text-white px-10 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-red-900/50 hover:-translate-y-0.5">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
