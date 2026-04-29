// File-system-backed blog service. Reads Markdown files with YAML frontmatter
// from `content/blog/*.md`. No external markdown/YAML dependency — uses a tiny
// inline frontmatter parser scoped to the field set DailySmartCalc actually uses.

import * as fs from 'fs';
import * as path from 'path';

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
    /** ISO-8601 timestamp of the last meaningful refresh, if set in frontmatter. Optional. */
    updatedAt?: string;
    /** Raw `created_at` field if present in frontmatter; mostly retained for API compatibility. */
    created_at?: string;
}

// -------- Filesystem layout --------
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// -------- Tiny YAML frontmatter parser --------
interface ParsedFile {
    frontmatter: Record<string, string>;
    body: string;
}

function parseFrontmatter(raw: string): ParsedFile {
    if (!raw.startsWith('---')) {
        return { frontmatter: {}, body: raw };
    }
    const end = raw.indexOf('\n---', 3);
    if (end === -1) {
        return { frontmatter: {}, body: raw };
    }
    const fmBlock = raw.slice(4, end);
    let bodyStart = end + 4;
    if (raw[bodyStart] === '\n') bodyStart += 1;
    const body = raw.slice(bodyStart);

    const frontmatter: Record<string, string> = {};
    const lines = fmBlock.split('\n');
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (line.trim() === '' || line.trim().startsWith('#')) {
            i++;
            continue;
        }
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) {
            i++;
            continue;
        }
        const key = line.slice(0, colonIdx).trim();
        let valuePart = line.slice(colonIdx + 1).trim();

        if (valuePart === '|' || valuePart === '>' || valuePart === '|-' || valuePart === '>-') {
            const next = lines[i + 1] || '';
            const m0 = next.match(/^(\s*)/);
            const indent = m0 ? m0[1].length : 0;
            const collected: string[] = [];
            i++;
            while (i < lines.length) {
                const sub = lines[i];
                if (sub.trim() === '') { collected.push(''); i++; continue; }
                const m = sub.match(/^(\s*)/);
                const subIndent = m ? m[1].length : 0;
                if (subIndent < indent) break;
                collected.push(sub.slice(indent));
                i++;
            }
            frontmatter[key] = (valuePart.startsWith('>') ? collected.join(' ') : collected.join('\n')).trim();
            continue;
        }

        if ((valuePart.startsWith('"') && valuePart.endsWith('"')) ||
            (valuePart.startsWith("'") && valuePart.endsWith("'"))) {
            valuePart = valuePart.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        frontmatter[key] = valuePart;
        i++;
    }
    return { frontmatter, body };
}

// -------- File → BlogPost mapping --------
function mapFileToPost(slug: string, raw: string, indexId: number): BlogPost {
    const { frontmatter, body } = parseFrontmatter(raw);
    const finalSlug = (frontmatter.slug || slug).trim();
    const date = (frontmatter.date || '').trim();
    return {
        id: Number.parseInt(frontmatter.id || '', 10) || indexId,
        slug: finalSlug,
        title: frontmatter.title || '',
        excerpt: frontmatter.excerpt || '',
        content: body,
        date,
        displayDate: frontmatter.display_date || frontmatter.displayDate || date,
        readTime: frontmatter.read_time || frontmatter.readTime || '',
        category: frontmatter.category || '',
        relatedToolLink: frontmatter.related_tool_link || frontmatter.relatedToolLink || '',
        relatedToolName: frontmatter.related_tool_name || frontmatter.relatedToolName || '',
        updatedAt: frontmatter.updated_at || frontmatter.updatedAt || undefined,
        created_at: frontmatter.created_at || undefined,
    };
}

function listSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith('.md') && !f.startsWith('_') && !f.startsWith('.'))
        .map((f) => f.replace(/\.md$/, ''));
}

function readFile(slug: string): string | null {
    const file = path.join(BLOG_DIR, `${slug}.md`);
    if (!fs.existsSync(file)) return null;
    return fs.readFileSync(file, 'utf8');
}

// -------- Public API --------
export async function getAllPosts(): Promise<BlogPost[]> {
    const slugs = listSlugs();
    const posts: BlogPost[] = [];
    slugs.forEach((slug, idx) => {
        const raw = readFile(slug);
        if (!raw) return;
        try {
            posts.push(mapFileToPost(slug, raw, idx + 1));
        } catch (err) {
            console.error(`Failed to parse blog post ${slug}.md:`, err);
        }
    });
    posts.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const raw = readFile(slug);
    if (!raw) return undefined;
    try {
        return mapFileToPost(slug, raw, 0);
    } catch (err) {
        console.error(`Failed to parse blog post ${slug}.md:`, err);
        return undefined;
    }
}

export async function getPostByRelatedTool(toolLink: string): Promise<BlogPost | undefined> {
    const all = await getAllPosts();
    return all.find((p) => p.relatedToolLink === toolLink);
}
