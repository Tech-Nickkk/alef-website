import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import Image from "next/image";
import { Calendar, MapPin, Clock, Building2, User, Ticket, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">

            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse"></span>
                    <span className="font-oswald text-red tracking-[0.3em] uppercase text-xs font-bold">Inauguration Celebration</span>
                    <span className="w-1.5 h-1.5 bg-red rounded-full animate-pulse"></span>
                </div>
                <AnimatedTitle
                    text="GATHERING OF PATRIOTS"
                    className="text-6xl md:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                />
                <div className="h-1 w-24 bg-red mx-auto"></div>
                <p className="font-oswald text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
                    ALEF is preparing a special inauguration celebration and a prestigious gathering of patriots and friends of freedom. This milestone provides an important opportunity to define the path forward for 2026 and beyond.
                </p>
            </div>

            {/* UPCOMING EVENT DETAILS */}
            <div className="w-full mb-24">
                <div className="group relative bg-blue border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col">

                    {/* Image Section - Full Width, Uncropped */}
                    <div className="relative w-full h-auto">
                        <div className="absolute inset-0 bg-blue/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                        <Image
                            src="/events/event-img-1.jpg"
                            alt="ALEF Event"
                            width={1200}
                            height={800}
                            style={{ width: "100%", height: "auto" }}
                            className="object-contain"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="w-full p-8 md:p-12 lg:p-16 flex flex-col relative bg-blue">
                        <div className="space-y-8 relative z-10">

                            {/* Title & Description */}
                            <div>
                                <h3 className="text-3xl md:text-5xl font-bebas text-white leading-none mb-4">
                                    THE FUTURE OF <span className="text-red">LEBANON</span>
                                </h3>
                                <p className="font-oswald text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                    Join us for an evening of dialogue, unity, and vision. We will present the <span className="text-white">ALEF Brief and Action Driven Agenda on Lebanon & Middle East</span>.
                                </p>
                            </div>

                            {/* Logistics Grid */}
                            <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><Calendar className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">April 14, 2026</span>
                                            <span className="block font-oswald text-xs text-white/50 uppercase tracking-widest">Mark Your Calendar</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><Clock className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">6:00 PM Reception</span>
                                            <span className="block font-bebas text-xl text-white">8:00 PM Dinner</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-red/90 rounded text-white h-fit"><MapPin className="w-5 h-5" /></div>
                                        <div>
                                            <span className="block font-bebas text-xl text-white">3 West Club</span>
                                            <span className="block font-oswald text-sm text-white/70">3 West 51st Street, New York, NY 10019</span>
                                            <a href="tel:2125825454" className="block font-oswald text-xs text-red hover:text-white mt-1 transition-colors">(212) 582-5454</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                                <Link
                                    href="https://www.zeffy.com/"
                                    target="_blank"
                                    className="bg-red hover:bg-[#c4151c] text-white px-8 py-4 font-bebas text-lg tracking-widest uppercase transition-all shadow-lg hover:shadow-red/20 flex items-center gap-2"
                                >
                                    <Ticket className="w-4 h-4" /> Reserve Ticket
                                </Link>
                                <Link
                                    href="/contact"
                                    className="border border-white/20 hover:border-white text-white px-8 py-4 font-bebas text-lg tracking-widest uppercase transition-all flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    Contact Us
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* INVITED OFFICIALS SECTION */}
            <div className="w-full max-w-6xl mx-auto mb-24 reveal-anim">
                <div className="bg-white border border-black/5 shadow-xl rounded-sm overflow-hidden">
                    {/* Header Banner */}
                    <div className="bg-blue py-6 px-8 text-center border-b border-white/10">
                        <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-widest uppercase">
                            Invited U.S. and International Officials
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2">
                        {/* Column 1 */}
                        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/5 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red/20 to-transparent"></div>

                            <h4 className="font-bebas text-2xl text-blue mb-8 flex items-center gap-3">
                                <span className="bg-red/10 p-2 rounded text-red"><Building2 className="w-5 h-5" /></span>
                                Executive & Administration
                            </h4>

                            <ul className="space-y-8">
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">The White House</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block">
                                                President and Mrs. Trump; National Security Council officials
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">Department of State</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block">
                                                Special Envoy for Lebanon; Assistant Secretary for Near Eastern Affairs; Lebanon Desk Officers
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">Department of Defense</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block">
                                                Officials overseeing military assistance to Lebanon
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="p-8 md:p-12 relative">
                            <h4 className="font-bebas text-2xl text-blue mb-8 flex items-center gap-3">
                                <span className="bg-red/10 p-2 rounded text-red"><User className="w-5 h-5" /></span>
                                Legislative & International
                            </h4>

                            <ul className="space-y-8">
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">United Nations</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block">
                                                Leaders from OCHA and other Lebanon-focused agencies
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-2 h-2 bg-red rounded-full shrink-0"></div>
                                        <div>
                                            <strong className="block font-oswald text-lg text-foreground uppercase tracking-wide mb-1">U.S. Congress</strong>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block mb-1">
                                                The U.S.–Lebanon Friendship Caucus
                                            </span>
                                            <span className="font-oswald text-foreground/70 text-sm leading-relaxed block border-t border-black/5 pt-1 mt-1">
                                                Members and staff of House/Senate Foreign Affairs and Defense Committees
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* SPONSORSHIP TIERS */}
            <div className="w-full max-w-7xl mx-auto mb-24 reveal-anim">
                <div className="text-center mb-12">
                    <h3 className="font-bebas text-4xl lg:text-5xl text-foreground mb-4">Sponsorship Opportunities</h3>
                    <div className="flex items-center justify-center gap-4 text-foreground/60 font-oswald text-sm uppercase tracking-widest">
                        <span className="h-px w-12 bg-foreground/20"></span>
                        <span>Elevate Your Impact</span>
                        <span className="h-px w-12 bg-foreground/20"></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            level: "DIAMOND SPONSOR",
                            price: "$25,000",
                            color: "from-blue-400 to-blue-600",
                            accent: "border-blue-400",
                            features: [
                                "Diamond Sponsors are key partners and leaders in supporting ALEF’s mission.",
                                "Receive exclusive VIP access, prime seating, and custom recognition spotlighting your support for the 2026 ALEF Inauguration Dinner.",
                                "Your brand will be celebrated as an essential contributor to our continued success."
                            ]
                        },
                        {
                            level: "PLATINUM SPONSOR",
                            price: "$15,000",
                            color: "from-gray-100 to-gray-300",
                            accent: "border-gray-200",
                            features: [
                                "One table for 8 people (ALEF will seat 2 additional guests)",
                                "Seating with Honorees (as available)",
                                "Featured full page ad in program booklet",
                                "Name and logo recognition in event marketing materials and press release",
                                "Social media pre-post event presence",
                                "Prime placement of name and logo as Platinum Sponsor on ALEF website and social media"
                            ]
                        },
                        {
                            level: "GOLD SPONSOR",
                            price: "$10,000",
                            color: "from-yellow-400 to-yellow-600",
                            accent: "border-yellow-500",
                            features: [
                                "One table for 8 people (ALEF will seat 2 additional guests)",
                                "Full-page ad in program",
                                "Name and logo recognition on event marketing materials and press release",
                                "Social media pre-post event presence"
                            ]
                        },
                        {
                            level: "SAPPHIRE SPONSOR",
                            price: "$5,000",
                            color: "from-blue-500 to-blue-700",
                            accent: "border-blue-600",
                            features: [
                                "One table for 8 people (ALEF will seat 2 additional guests)",
                                "Full page ad in program",
                                "Name and logo recognition in event marketing materials and press release"
                            ]
                        },
                        {
                            level: "SILVER SPONSOR",
                            price: "$2,500",
                            color: "from-gray-300 to-gray-500",
                            accent: "border-gray-400",
                            features: [
                                "Half table for 4 people (ALEF will seat 2 additional guests)",
                                "Half page ad in program",
                                "Name and logo recognition as Silver Sponsor"
                            ]
                        },
                        {
                            level: "INDIVIDUAL TICKET",
                            price: "$250",
                            color: "from-red to-red/80",
                            accent: "border-red",
                            features: ["1 ticket package"]
                        },
                    ].map((tier, idx) => (
                        <div
                            key={idx}
                            className={`group relative overflow-hidden rounded-xl border bg-blue transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-2xl hover:z-10 ${idx === 0
                                ? 'md:col-span-2 lg:col-span-1 border-white/20 ring-1 ring-white/10'
                                : 'border-white/10'
                                } ${tier.accent ? `hover:${tier.accent}` : 'hover:border-red'}`}
                        >
                            {/* Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none"></div>

                            {/* Colored Glow Overlay at Bottom */}
                            <div className={`absolute inset-0 bg-linear-to-t ${tier.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`}></div>

                            <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                                <div className="mb-6 flex justify-between items-center">
                                    <h4 className={`font-bebas text-3xl tracking-wide transition-colors duration-300 ${idx === 0 ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                                        {tier.level}
                                    </h4>
                                    {idx === 0 && (
                                        <span className="bg-red text-white text-[8px] md:text-[10px] font-oswald font-bold px-1 md:px-2 py-1 rounded-sm tracking-widest uppercase animate-pulse">
                                            Most Exclusive
                                        </span>
                                    )}
                                </div>

                                <div className="text-4xl md:text-5xl font-bebas text-white mb-2">{tier.price}</div>

                                {/* Dynamic Separator Line */}
                                <div className={`h-1 mb-6 transition-all duration-500 ease-out w-12 group-hover:w-full ${tier.color ? `group-hover:bg-linear-to-r ${tier.color}` : 'group-hover:bg-white'} bg-white/20`}></div>

                                <div className="flex-1 mb-8">
                                    <ul className="space-y-3">
                                        {tier.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-white/70 font-oswald text-sm font-light">
                                                <span className="mt-1.5 w-1.5 h-1.5 bg-red rounded-full shrink-0"></span>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="https://www.zeffy.com/"
                                    target="_blank"
                                    className="w-full py-4 font-bebas text-xl tracking-widest uppercase text-center border transition-all duration-300 bg-transparent border-white/20 text-white hover:bg-white hover:text-blue relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10">Select Package</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ACCOMMODATIONS */}
            <div className="w-full max-w-6xl mx-auto reveal-anim">
                <div className="text-center mb-12">
                    <h3 className="font-bebas text-4xl lg:text-5xl text-foreground mb-4">Official Accommodations</h3>
                    <p className="font-oswald text-foreground/60 text-sm uppercase tracking-widest">Preferred Partners for Your Stay</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { name: "3 West Club", link: "https://3westclub.com/about-us/", address: "3 West 51st Street, NYC" },
                        { name: "Warwick New York", link: "https://www.warwickhotels.com/warwick-new-york", address: "65 West 54th Street, NYC" },
                        { name: "New York Hilton Midtown", link: "https://www.hilton.com/en/hotels/nycnhhh-new-york-hilton-midtown/", address: "1335 6th Ave, NYC" },
                    ].map((hotel, idx) => (
                        <a
                            key={idx}
                            href={hotel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-foreground/10 p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-blue/5 rounded-full flex items-center justify-center text-blue mb-6 group-hover:bg-red group-hover:text-white transition-colors duration-300">
                                <Building2 className="w-8 h-8" />
                            </div>
                            <h4 className="font-bebas text-2xl text-foreground mb-2 group-hover:text-blue transition-colors">{hotel.name}</h4>
                            <p className="font-oswald text-foreground/50 text-sm mb-6 uppercase tracking-wide">{hotel.address}</p>

                            <div className="mt-auto inline-flex items-center gap-2 text-sm font-oswald text-red uppercase tracking-widest font-bold border-b border-transparent group-hover:border-red pb-1 transition-all">
                                View Property
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </main>
    );
}
