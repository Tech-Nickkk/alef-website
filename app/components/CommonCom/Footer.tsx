"use client";

import { Link } from "@/i18n/routing";
import SkeletonImage from "./SkeletonImage";
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navbar');
    // For nested keys like 'Navbar.menu', we can access them via the main tNav if we passed 'Navbar' 
    // but useTranslations return a function that can access nested keys if setup correctly, 
    // or we can just use useTranslations('Navbar.menu') separately.
    // However, simpler is just tNav('menu.ourProfile') if tNav is 'Navbar'.

    // Let's check how next-intl works: useTranslations('Namespace') -> t('key').
    // If I want 'Navbar.menu.ourProfile', I can use useTranslations('Navbar') -> t('menu.ourProfile')
    // OR useTranslations('Navbar.menu') -> t('ourProfile').
    // In the previous code, I used tMenu('ourProfile') where tMenu was 'Navbar.menu'.

    const tMenu = useTranslations('Navbar.menu');

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
                            {t('description')}
                        </p>
                        <div className="flex gap-3 pt-2">
                            <SocialButton icon={<Facebook className="w-4 h-4" />} href="https://www.facebook.com/share/g/1CAf9Dn4A3/" />
                            <SocialButton icon={<Linkedin className="w-4 h-4" />} href="https://www.linkedin.com/groups/16682004/" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">{t('explore')}</h3>
                        <ul className="space-y-4">
                            <li><NavLink href="/">{tNav('home')}</NavLink></li>
                            <li><NavLink href="/alef-profile">{tMenu('ourProfile')}</NavLink></li>
                            <li><NavLink href="/experts-corner">{tMenu('expertsCorner')}</NavLink></li>
                            <li><NavLink href="/congressional-advocacy">{tNav('congressional')}</NavLink></li>
                            <li><NavLink href="/contact">{tNav('contact')}</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">{t('resources')}</h3>
                        <ul className="space-y-4">
                            <li><NavLink href="/blogs-and-articles">{tMenu('blogsAndArticles')}</NavLink></li>
                            <li><NavLink href="/house-of-cards">{tMenu('houseOfCards')}</NavLink></li>
                            <li><NavLink href="/archives">{tMenu('archives')}</NavLink></li>
                            <li><NavLink href="/podcasts">{tMenu('podcasts')}</NavLink></li>
                            <li><NavLink href="/events">{tMenu('events')}</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">{t('contact')}</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-red shrink-0 mt-0.5" />
                                <span
                                    className="text-white/70 font-oswald text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: t.raw('address') }}
                                />
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-red shrink-0" />
                                <a href="mailto:info@alef.org" dir="ltr" className="text-white/70 hover:text-white transition-colors font-oswald text-sm">
                                    info@alef.org
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-red shrink-0" />
                                <a href="tel:+12025551234" dir="ltr" className="text-white/70 hover:text-white transition-colors font-oswald text-sm">
                                    +1 (202) 555-1234
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-[10px] font-oswald uppercase tracking-wider">
                        © {new Date().getFullYear()} {t('rights')}
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors">{t('privacy')}</Link>
                        <Link href="/terms" className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors">{t('terms')}</Link>
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