// -------- Types --------
export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    displayDate: string;
    readTime: string;
    category: string;
    relatedToolLink: string;
    relatedToolName: string;
    image: string | null;
    created_at?: string;
}

// Maps snake_case DB columns → camelCase used by UI
function mapRow(row: Record<string, unknown>): BlogPost {
    return {
        id: row.id as number,
        slug: row.slug as string,
        title: row.title as string,
        excerpt: row.excerpt as string,
        content: row.content as string,
        date: row.date as string,
        displayDate: (row.display_date ?? row.displayDate) as string,
        readTime: (row.read_time ?? row.readTime) as string,
        category: row.category as string,
        relatedToolLink: (row.related_tool_link ?? row.relatedToolLink) as string,
        relatedToolName: (row.related_tool_name ?? row.relatedToolName) as string,
        image: (row.image as string) ?? null,
        created_at: row.created_at as string | undefined,
    };
}

// -------- Supabase REST Configuration --------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const REST_URL = `${SUPABASE_URL}/rest/v1`;

const headers = {
    'apikey': SUPABASE_ANON_KEY || '',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation' // For inserts, not strictly necessary for GET but good practice
};

// -------- Public API --------

export async function getAllPosts(): Promise<BlogPost[]> {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.warn('Supabase URL/Key not initialised – returning empty blog list');
        return [];
    }

    try {
        const res = await fetch(`${REST_URL}/blog_posts?select=*&order=date.desc`, {
            headers,
            // Next.js fetch options (ISR caching behavior usually handles this, but good to ensure fresh if needed or cache)
            next: { revalidate: 3600 } // Cache for 1 hour by default
        });

        if (!res.ok) {
            console.error('Failed to fetch blog posts:', await res.text());
            return [];
        }

        const data = await res.json();
        return (data ?? []).map(mapRow);
    } catch (error) {
        console.error('Error fetching getAllPosts via REST API:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return undefined;

    try {
        const res = await fetch(`${REST_URL}/blog_posts?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`, {
            headers,
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            console.error('Failed to fetch blog post by slug:', await res.text());
            return undefined;
        }

        const data = await res.json();
        if (!data || data.length === 0) return undefined;

        return mapRow(data[0]);
    } catch (error) {
        console.error('Error fetching getPostBySlug via REST API:', error);
        return undefined;
    }
}

export async function getPostByRelatedTool(toolLink: string): Promise<BlogPost | undefined> {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return undefined;

    try {
        const res = await fetch(`${REST_URL}/blog_posts?select=*&related_tool_link=eq.${encodeURIComponent(toolLink)}&limit=1`, {
            headers,
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            console.error('Failed to fetch blog post by tool link:', await res.text());
            return undefined;
        }

        const data = await res.json();
        if (!data || data.length === 0) return undefined;

        return mapRow(data[0]);
    } catch (error) {
        console.error('Error fetching getPostByRelatedTool via REST API:', error);
        return undefined;
    }
}
