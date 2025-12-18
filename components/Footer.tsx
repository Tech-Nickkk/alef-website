import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#F2F2F2] pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
                    {/* Column 1: Brand & Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <Link href="/" className="block relative w-64 h-24">
                            {/* Assuming logo.png is the colored version based on earlier usage context (inverted for white text) */}
                            <Image
                                src="/home/logo.png"
                                alt="ALEF Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-gray-500 text-base leading-relaxed font-optima max-w-sm">
                            The American Lebanese Education Foundation is dedicated to educating communities and combating terrorism through research, awareness, and policy advocacy.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <SocialIconWrapper>
                                <InstagramIcon className="w-5 h-5 text-gray-700" />
                            </SocialIconWrapper>
                            <SocialIconWrapper>
                                <FacebookIcon className="w-5 h-5 text-gray-700" />
                            </SocialIconWrapper>
                            <SocialIconWrapper>
                                <TwitterIcon className="w-5 h-5 text-gray-700" />
                            </SocialIconWrapper>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-start-2 pt-4">
                        <h3 className="text-[#1a2b4b] font-bold mb-8 font-cormorant text-xl">Quick Links</h3>
                        <ul className="space-y-5">
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Home</Link></li>
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base flex items-center gap-1">
                                    About Us <ChevronDown className="w-3.5 h-3.5" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base flex items-center gap-1">
                                    Research <ChevronDown className="w-3.5 h-3.5" />
                                </Link>
                            </li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Experts</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Events</Link></li>
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base flex items-center gap-1">
                                    Resources <ChevronDown className="w-3.5 h-3.5" />
                                </Link>
                            </li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Events */}
                    <div className="lg:col-start-3 pt-4">
                        <h3 className="text-[#1a2b4b] font-bold mb-8 font-cormorant text-xl">Events</h3>
                        <ul className="space-y-5">
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Upcoming Events</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Webinars</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Conferences</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Past Events</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Resources */}
                    <div className="lg:col-start-4 pt-4">
                        <h3 className="text-[#1a2b4b] font-bold mb-8 font-cormorant text-xl">Resources</h3>
                        <ul className="space-y-5">
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Reports</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Newsletters</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Media Kit</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Contact */}
                    <div className="lg:col-start-5 pt-4">
                        <h3 className="text-[#1a2b4b] font-bold mb-8 font-cormorant text-xl">Contact</h3>
                        <ul className="space-y-5">
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">About Us</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Our Team</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Careers</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Press</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-base">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 pt-10 text-center">
                    <p className="text-gray-500 text-sm font-optima">
                        © 2025 A.L.E.F. (American Lebanese Education Foundation). All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialIconWrapper({ children }: { children: React.ReactNode }) {
    return (
        <a href="#" className="w-11 h-11 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
            {children}
        </a>
    );
}

function ChevronDown({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function FacebookIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function TwitterIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 7.8 4.5c2.1-.2 3.2-.4 3.2-.4.4-1.5 2.1-3 3.6-2.5 1.5.5 1.8 2.2 1.8 2.2s1.4-.2 2.7-.6c-1.7 1.2-2.3 2.5-2.2 2.9 2-.2 3.5-.8 3.5-.8z" />
        </svg>
    );
}
