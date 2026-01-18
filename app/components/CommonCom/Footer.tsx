import Link from "next/link";
import SkeletonImage from "./SkeletonImage";
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-blue pt-16 pb-8 px-6 md:px-12 lg:px-24 border-t border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    <div className="space-y-6">
                        <Link href="/" className="block relative w-32 h-12">
                            <SkeletonImage
                                src="/home/logo.png"
                                alt="ALEF Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-white/60 text-sm font-oswald leading-relaxed max-w-xs">
                            Educating communities and combating terrorism through research, awareness, and policy advocacy.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <SocialButton icon={<Facebook className="w-4 h-4" />} href="https://www.facebook.com/share/g/1CAf9Dn4A3/" />
                            <SocialButton icon={<Linkedin className="w-4 h-4" />} href="https://www.linkedin.com/groups/16682004/" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">EXPLORE</h3>
                        <ul className="space-y-4">
                            <li><NavLink href="/">Home</NavLink></li>
                            <li><NavLink href="/alef-profile">Who We Are</NavLink></li>
                            <li><NavLink href="/experts-corner">Our Experts</NavLink></li>
                            <li><NavLink href="/congressional-advocacy">Congressional Advocacy</NavLink></li>
                            <li><NavLink href="/contact">Contact Us</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">RESOURCES</h3>
                        <ul className="space-y-4">
                            <li><NavLink href="/blogs-and-articles">Blogs & Articles</NavLink></li>
                            <li><NavLink href="/house-of-cards">House of Cards</NavLink></li>
                            <li><NavLink href="/archives">Archives</NavLink></li>
                            <li><NavLink href="/podcasts">Podcasts</NavLink></li>
                            <li><NavLink href="/events">Events</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">CONTACT</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-red shrink-0 mt-0.5" />
                                <span className="text-white/70 font-oswald text-sm leading-relaxed">
                                    New York City,<br />United States
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-red shrink-0" />
                                <a href="mailto:info@alef.org" className="text-white/70 hover:text-white transition-colors font-oswald text-sm">
                                    info@alef.org
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-red shrink-0" />
                                <a href="tel:+12025551234" className="text-white/70 hover:text-white transition-colors font-oswald text-sm">
                                    +1 (202) 555-1234
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-[10px] font-oswald uppercase tracking-wider">
                        © {new Date().getFullYear()} A.L.E.F. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-white/60 hover:text-red transition-colors font-oswald text-sm tracking-wide uppercase block">
            {children}
        </Link>
    );
}

function SocialButton({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-red hover:border-red hover:text-white transition-all duration-300"
        >
            {icon}
        </a>
    );
}