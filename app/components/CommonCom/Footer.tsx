import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-theme-black py-12 px-6 md:px-12 lg:px-24 border-t border-theme-white/10">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Column 1: Brand & Info */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-6">
                        <Link href="/" className="block relative w-32 h-12">
                            <Image
                                src="/home/logo.png"
                                alt="ALEF Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-theme-white/60 text-sm leading-relaxed font-oswald max-w-sm">
                            Educating communities and combating terrorism through research, awareness, and policy advocacy.
                        </p>

                        <div className="flex items-center gap-3 pt-2">
                            <SocialIconWrapper>
                                <InstagramIcon className="w-3 h-3 text-theme-white/60 group-hover:text-theme-black transition-colors" />
                            </SocialIconWrapper>
                            <SocialIconWrapper>
                                <FacebookIcon className="w-3 h-3 text-theme-white/60 group-hover:text-theme-black transition-colors" />
                            </SocialIconWrapper>
                            <SocialIconWrapper>
                                <TwitterIcon className="w-3 h-3 text-theme-white/60 group-hover:text-theme-black transition-colors" />
                            </SocialIconWrapper>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="pt-2">
                        <h3 className="text-theme-white font-bold mb-6 font-bebas text-xl tracking-wider">Navigation</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-theme-white/60 hover:text-theme-accent transition-colors font-oswald text-sm tracking-wide">Home</Link></li>
                            <li><Link href="#who-we-are" className="text-theme-white/60 hover:text-theme-accent transition-colors font-oswald text-sm tracking-wide">Who We Are</Link></li>
                            <li><Link href="#house-of-corruption" className="text-theme-white/60 hover:text-theme-accent transition-colors font-oswald text-sm tracking-wide">Corruption Analysis</Link></li>
                            <li><Link href="#resources" className="text-theme-white/60 hover:text-theme-accent transition-colors font-oswald text-sm tracking-wide">Resources</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Initiatives */}
                    <div className="pt-2">
                        <h3 className="text-theme-white font-bold mb-6 font-bebas text-xl tracking-wider">Key Initiatives</h3>
                        <ul className="space-y-3">
                            <li><Link href="#chairman-message" className="text-theme-white/60 hover:text-theme-accent transition-colors font-oswald text-sm tracking-wide">Chairman's Message</Link></li>
                            <li><Link href="#house-of-cards" className="text-theme-white/60 hover:text-theme-accent transition-colors font-oswald text-sm tracking-wide">House of Cards</Link></li>
                            <li><Link href="#blogs" className="text-theme-white/60 hover:text-theme-accent transition-colors font-oswald text-sm tracking-wide">Blogs & Articles</Link></li>
                            <li><Link href="#media" className="text-theme-white/60 hover:text-theme-accent transition-colors font-oswald text-sm tracking-wide">Media Center</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="pt-2">
                        <h3 className="text-theme-white font-bold mb-6 font-bebas text-xl tracking-wider">Contact</h3>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-theme-white/40 text-xs font-oswald tracking-widest uppercase">Headquarters</p>
                                <p className="text-theme-white/80 text-sm font-oswald">445 Park Avenue, 9th Floor<br />New York, NY 10022</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-theme-white/40 text-xs font-oswald tracking-widest uppercase">Inquiries</p>
                                <p><a href="mailto:info@alef.org" className="text-theme-white/80 hover:text-theme-accent transition-colors font-oswald text-sm">info@alef.org</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-theme-white/10 pt-6 text-center">
                    <p className="text-theme-white/60 text-[10px] font-oswald uppercase tracking-wider">
                        © 2025 A.L.E.F. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialIconWrapper({ children }: { children: React.ReactNode }) {
    return (
        <a href="#" className="w-10 h-10 border border-theme-white/10 rounded-full flex items-center justify-center hover:bg-theme-white hover:border-theme-white hover:text-theme-black transition-all">
            {children}
        </a>
    );
}

function InstagramIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
}

function FacebookIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
}

function TwitterIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 7.8 4.5c2.1-.2 3.2-.4 3.2-.4.4-1.5 2.1-3 3.6-2.5 1.5.5 1.8 2.2 1.8 2.2s1.4-.2 2.7-.6c-1.7 1.2-2.3 2.5-2.2 2.9 2-.2 3.5-.8 3.5-.8z" /></svg>;
}