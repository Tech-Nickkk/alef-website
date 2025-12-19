import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#F2F2F2] pt-24 pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
                    {/* Column 1: Brand & Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Link href="/" className="block relative w-48 h-16">
                            <Image
                                src="/home/logo.png"
                                alt="ALEF Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed font-optima max-w-sm">
                            The American Lebanese Education Foundation is dedicated to educating communities and combating terrorism through research, awareness, and policy advocacy.
                        </p>
                        
                        {/* Added Contact Details per Plan */}
                        <div className="text-sm font-optima text-gray-600 space-y-2 pt-2">
                             <p>445 Park Avenue, 9th Floor<br/>New York, NY 10022</p>
                             <p><a href="mailto:info@alef.org" className="hover:text-[#E31B23] transition-colors">info@alef.org</a></p>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <SocialIconWrapper>
                                <InstagramIcon className="w-4 h-4 text-gray-700" />
                            </SocialIconWrapper>
                            <SocialIconWrapper>
                                <FacebookIcon className="w-4 h-4 text-gray-700" />
                            </SocialIconWrapper>
                            <SocialIconWrapper>
                                <TwitterIcon className="w-4 h-4 text-gray-700" />
                            </SocialIconWrapper>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-start-2 pt-4">
                        <h3 className="text-[#1a2b4b] font-bold mb-6 font-cormorant text-xl">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Home</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">About Us</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Research</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Experts</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Events */}
                    <div className="lg:col-start-3 pt-4">
                        <h3 className="text-[#1a2b4b] font-bold mb-6 font-cormorant text-xl">Events</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Upcoming Events</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Webinars</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Conferences</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Past Events</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Resources */}
                    <div className="lg:col-start-4 pt-4">
                        <h3 className="text-[#1a2b4b] font-bold mb-6 font-cormorant text-xl">Resources</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Reports</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Podcasts</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Newsletters</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Media Kit</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Legal */}
                    <div className="lg:col-start-5 pt-4">
                        <h3 className="text-[#1a2b4b] font-bold mb-6 font-cormorant text-xl">Legal</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Terms of Service</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Cookie Policy</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-[#E31B23] transition-colors font-optima text-sm">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 pt-8 text-center">
                    <p className="text-gray-400 text-xs font-optima">
                        © 2025 A.L.E.F. (American Lebanese Education Foundation). All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialIconWrapper({ children }: { children: React.ReactNode }) {
    return (
        <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#1a2b4b] hover:border-[#1a2b4b] hover:text-white transition-all">
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