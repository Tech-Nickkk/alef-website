export default function Newsletter() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl lg:text-5xl mb-4 font-cormorant text-[#1F2937]">
                    <span className="font-bold text-[#1a2b4b]">Subscribe To Get News About Us</span>
                </h2>

                <p className="text-gray-500 mb-10 font-optima max-w-2xl mx-auto">
                    Get The Latest Research And Updates On Terrorism In Lebanon Delivered To Your Inbox.
                </p>

                <form className="relative max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-6 py-4 rounded-full bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-red-100 transition-all font-optima text-gray-700 shadow-sm"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 bg-[#E31B23] hover:bg-[#c4151c] text-white px-8 rounded-full text-base font-semibold transition-all shadow-md"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}
