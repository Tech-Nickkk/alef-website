"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HaaCampaignModal({ isFirstLoad }: { isFirstLoad: boolean }) {
  const t = useTranslations("HaaCampaignModal");
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!isFirstLoad) return;
    // Delay opening slightly for an elegant, premium intro feel
    const timer = setTimeout(() => {
      setIsRendered(true);
      // Small delay to allow the opacity transition to trigger smoothly
      setTimeout(() => setIsOpen(true), 50);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isFirstLoad]);

  const handleClose = () => {
    setIsOpen(false);
    // Wait for the transition to finish before unmounting
    setTimeout(() => {
      setIsRendered(false);
    }, 300);
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      {/* CSS Keyframes for Rotating Border Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-border {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-border {
          animation: spin-border 6s linear infinite;
        }
      `}} />

      {/* Card Wrapper with 1px padding for the border and overflow-hidden to clip the spinning gradient */}
      <div
        className={`relative max-w-md w-full bg-neutral-950 p-px rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Spinning Gradient Border Background */}
        <div className="absolute top-1/2 left-1/2 w-[180%] h-[180%] bg-[conic-gradient(#BF0A30_0deg,transparent_90deg,#3b82f6_180deg,transparent_270deg,#BF0A30_360deg)] animate-spin-border pointer-events-none z-0" />

        {/* Core Card Container (Solid Dark Background overlaying the spinning gradient) */}
        <div className="relative w-full bg-linear-to-b from-[#141415]/98 to-[#0d0d0e]/99 rounded-[15px] p-6 sm:p-8 text-center overflow-hidden z-10">
          {/* Subtle diagonal sheen reflex overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/2 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white hover:rotate-90 transition-all duration-300 p-1.5 rounded-full hover:bg-white/5 cursor-pointer z-20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* ALEF Premium Logo Container (Solid White Background) */}
          <div className="relative mx-auto w-20 h-20 mb-4 flex items-center justify-center bg-white rounded-full p-2.5 shadow-md border border-white/10 z-10">
            <Image
              src="/home/logo.png"
              alt="ALEF Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          {/* Glowing Status Badge */}
          <div className="text-[10px] font-bold tracking-widest text-red uppercase bg-red/10 border border-red/20 px-3.5 py-1 rounded-full w-fit mx-auto mb-4 flex items-center gap-1.5 z-10 relative">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red"></span>
            </span>
            {t("badge")}
          </div>

          {/* Campaign Title */}
          <h3 className="text-3xl sm:text-4xl font-normal font-bebas text-white leading-tight tracking-wider uppercase z-10 relative">
            {t("title")}
          </h3>

          {/* Gradient Divider */}
          <div className="w-20 h-px bg-linear-to-r from-transparent via-red/40 to-transparent mx-auto my-4 z-10 relative" />

          {/* Campaign Description */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-sm mx-auto font-light z-10 relative">
            {t("description")}
          </p>

          {/* Actions Section */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center z-10 relative">
            <Link
              href="/hezbollah-accountability-act"
              onClick={handleClose}
              className="group/btn w-full sm:w-auto px-6 py-3 bg-red hover:bg-[#c4151c] text-white font-semibold font-oswald rounded-xl transition-all duration-300 shadow-lg shadow-red/25 hover:shadow-red/40 flex items-center justify-center gap-2 uppercase tracking-widest text-xs cursor-pointer"
            >
              <span>{t("ctaAction")}</span>
              <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 text-white/70 font-semibold font-oswald rounded-xl hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 uppercase tracking-widest text-xs cursor-pointer"
            >
              {t("ctaDismiss")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
