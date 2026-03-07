import { blogPosts as localPosts, type BlogPost } from '@/data/blog';

// -------- public API --------
// Local data is the source of truth for this stateless site.
// Supabase was previously used but fell out of sync (13 DB rows vs 37 local articles).

export async function getAllPosts(): Promise<BlogPost[]> {
    return localPosts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return localPosts.find((p) => p.slug === slug);
}

