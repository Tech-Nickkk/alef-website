"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "./SmoothScroll";
import Navbar from "./Navbar";
import Footer from "./Footer";
import JoinUs from "./JoinUs";
import { ThemeProvider } from "./ThemeProvider";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Check if we're on the Sanity Studio route
    const isStudioRoute = pathname?.startsWith("/studio");

    // If we're on the studio route, render only the children without the site layout
    if (isStudioRoute) {
        return <>{children}</>;
    }

    // For all other routes, render the full site layout
    return (
        <ThemeProvider>
            <SmoothScroll />
            {/* <Preloader /> */}
            <Navbar />
            {children}
            <JoinUs />
            <Footer />
        </ThemeProvider>
    );
}
