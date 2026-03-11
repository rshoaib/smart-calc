import { supabase } from './supabase';

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

// -------- Public API --------

export async function getAllPosts(): Promise<BlogPost[]> {
    if (!supabase) {
        console.warn('Supabase client not initialised – returning empty blog list');
        return [];
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Failed to fetch blog posts:', error.message);
        return [];
    }

    return (data ?? []).map(mapRow);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    if (!supabase) return undefined;

    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) return undefined;

    return mapRow(data);
}
