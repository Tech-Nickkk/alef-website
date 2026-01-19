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

    // Check if we're on the Sanity Studio route or Donate Success page or Login page
    const isStudioRoute = pathname?.startsWith("/studio");
    const isDonateSuccess = pathname?.startsWith("/donate/success");
    const isLoginPage = pathname?.startsWith("/login");

    // If we're on these routes, render only the children without the site layout
    if (isStudioRoute || isDonateSuccess || isLoginPage) {
        return <>{children}</>;
    }

    // For all other routes, render the full site layout
    return (
        <ThemeProvider>
            <SmoothScroll />
            <Navbar />
            {children}
            <JoinUs />
            <Footer />
        </ThemeProvider>
    );
}
