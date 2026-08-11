// Serves the deterministic blog hero SVG for OG/Twitter cards and any
// external referrer (search engines, RSS readers, social previews).
// Same generator as the inline page render — guaranteed identical output.

import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/blogService';
import { buildHeroForPost } from '@/lib/blogHeroSvg';

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) {
        return new NextResponse('Not found', { status: 404 });
    }

    const svg = buildHeroForPost(post, { standalone: true });

    return new NextResponse(svg, {
        status: 200,
        headers: {
            'Content-Type': 'image/svg+xml; charset=utf-8',
            // Cache aggressively — the SVG is deterministic per slug.
            'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        },
    });
}
