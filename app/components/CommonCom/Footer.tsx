import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-blue py-10 md:py-12 px-6 md:px-12 lg:px-24 border-t border-white/10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">

                    {/* Left Column: Contact Info (Reach Out Directly Style) */}
                    <div className="space-y-8">
                        <div>
                            <Link href="/" className="block relative w-28 h-10 mb-6">
                                <Image
                                    src="/home/logo.png"
                                    alt="ALEF Logo"
                                    fill
                                    className="object-contain object-left"
                                />
                            </Link>
                            <h3 className="font-bebas text-3xl text-white mb-6 tracking-wide">
                                REACH OUT DIRECTLY
                            </h3>
                        </div>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-red/10 border border-red/30 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red/20 transition-colors">
                                    <Mail className="w-4 h-4 text-red" />
                                </div>
                                <div>
                                    <p className="font-oswald text-[10px] tracking-widest text-white/40 mb-1">EMAIL</p>
                                    <a href="mailto:info@alef.org" className="font-oswald text-lg text-white hover:text-red transition-colors">
                                        info@alef.org
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-red/10 border border-red/30 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red/20 transition-colors">
                                    <Phone className="w-4 h-4 text-red" />
                                </div>
                                <div>
                                    <p className="font-oswald text-[10px] tracking-widest text-white/40 mb-1">PHONE</p>
                                    <a href="tel:+12025551234" className="font-oswald text-lg text-white hover:text-red transition-colors">
                                        +1 (202) 555-1234
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-red/10 border border-red/30 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red/20 transition-colors">
                                    <MapPin className="w-4 h-4 text-red" />
                                </div>
                                <div>
                                    <p className="font-oswald text-[10px] tracking-widest text-white/40 mb-1">LOCATION</p>
                                    <p className="font-oswald text-lg text-white leading-tight">
                                        Washington, D.C.<br />
                                        <span className="text-white/60 text-sm">United States</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Links & Socials */}
                    <div className="lg:pl-10 lg:border-l border-white/10 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bebas text-xl text-white mb-6 tracking-wide">
                                QUICK LINKS
                            </h3>
                            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                                <li><Link href="/" className="text-white/60 hover:text-red transition-colors font-oswald text-xs tracking-widest uppercase">Home</Link></li>
                                <li><Link href="/about" className="text-white/60 hover:text-red transition-colors font-oswald text-xs tracking-widest uppercase">Who We Are</Link></li>
                                <li><Link href="/house-of-cards" className="text-white/60 hover:text-red transition-colors font-oswald text-xs tracking-widest uppercase">House of Cards</Link></li>
                                <li><Link href="/blogs-and-articles" className="text-white/60 hover:text-red transition-colors font-oswald text-xs tracking-widest uppercase">Blogs & Articles</Link></li>
                                <li><Link href="/podcasts" className="text-white/60 hover:text-red transition-colors font-oswald text-xs tracking-widest uppercase">Podcasts</Link></li>
                                <li><Link href="/contact" className="text-white/60 hover:text-red transition-colors font-oswald text-xs tracking-widest uppercase">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="mt-10 md:mt-0">
                            <h3 className="font-bebas text-xl text-white mb-4 tracking-wide">
                                CONNECT WITH US
                            </h3>
                            <div className="flex gap-3">
                                <SocialButton icon={<Instagram className="w-4 h-4" />} href="#" />
                                <SocialButton icon={<Facebook className="w-4 h-4" />} href="#" />
                                <SocialButton icon={<Twitter className="w-4 h-4" />} href="#" />
                            </div>
                            <p className="mt-6 text-white/40 text-xs font-oswald leading-relaxed max-w-sm">
                                Educating communities and combating terrorism through research, awareness, and policy advocacy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-[10px] font-oswald uppercase tracking-wider">
                        © 2025 A.L.E.F. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialButton({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-red hover:border-red hover:text-white transition-all duration-300 transform hover:scale-105"
        >
            {icon}
        </a>
    );
}