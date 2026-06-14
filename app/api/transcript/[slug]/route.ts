import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    // Fetch the webinar's transcript file URL and title from Sanity
    const query = `*[_type == "webinar" && slug.current == $slug][0]{
        "fileUrl": transcriptFile.asset->url,
        "originalFilename": transcriptFile.asset->originalFilename,
        "mimeType": transcriptFile.asset->mimeType,
        "title": coalesce(title.en, title)
    }`;

    const result = await client.fetch(query, { slug });

    if (!result?.fileUrl) {
        return NextResponse.json(
            { error: "Transcript not found" },
            { status: 404 }
        );
    }

    // Fetch the actual file from Sanity CDN
    const fileResponse = await fetch(result.fileUrl);

    if (!fileResponse.ok) {
        return NextResponse.json(
            { error: "Failed to fetch transcript file" },
            { status: 502 }
        );
    }

    const fileBuffer = await fileResponse.arrayBuffer();
    const contentType = result.mimeType || fileResponse.headers.get("content-type") || "application/pdf";

    // Build a clean filename from the title
    const extension = result.originalFilename?.split(".").pop() || "pdf";
    const cleanTitle = (result.title || slug)
        .replace(/[^a-zA-Z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
    const filename = `${cleanTitle}-transcript.${extension}`;

    return new NextResponse(fileBuffer, {
        headers: {
            "Content-Type": contentType,
            "Content-Disposition": `inline; filename="${filename}"`,
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
    });
}
