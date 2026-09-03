"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        // Disable Lenis on touch/mobile devices to avoid forced reflows and high TBT
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
        if (isTouch) return;

        const lenis = new Lenis();

        let reqId: number;
        function raf(time: number) {
            lenis.raf(time);
            reqId = requestAnimationFrame(raf);
        }

        reqId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(reqId);
            lenis.destroy();
        };
    }, []);

    return null;
}
