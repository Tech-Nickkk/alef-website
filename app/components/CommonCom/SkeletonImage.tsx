"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-shimmer rounded-md ${className}`}
            role="status"
            aria-label="Loading..."
        />
    );
}

export default function SkeletonImage({ className = "", onLoad, ...props }: ImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <Skeleton className={`absolute inset-0 z-10 ${className}`} />}
            <Image
                {...props}
                className={`${className} transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"
                    }`}
                onLoad={(e) => {
                    setIsLoading(false);
                    if (onLoad) onLoad(e);
                }}
            />
        </>
    );
}
