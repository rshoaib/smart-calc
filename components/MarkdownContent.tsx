import React from 'react';
import Link from 'next/link';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  let cleanContent = content;

  // 1. Strip YAML frontmatter aggressively
  if (cleanContent.startsWith('---')) {
    cleanContent = cleanContent.replace(/^---[\s\S]*?---\n*/, '');
  }

  // 2. Clean turndown artifacts and block escapes
  cleanContent = cleanContent.replace(/\\-/g, '-').replace(/\\\*/g, '*').replace(/\\_/g, '_').replace(/\\\./g, '.');
  cleanContent = cleanContent.replace(/^[\-\\_]{3,}$/gm, '');

  const lines = cleanContent.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const parseRow = (row: string) => row.split('|').filter(c => c.trim() !== '').map(c => c.trim());
      const headers = parseRow(tableLines[0]);
      const dataRows = tableLines.slice(2).map(parseRow);
      elements.push(
        <div key={i} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-50 dark:bg-indigo-900/30">
                {headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">{parseContent(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">{parseContent(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100">{line.replace('### ', '')}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{line.replace('## ', '')}</h2>);
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4 bg-gray-50 dark:bg-gray-800/50 py-2 pr-2 rounded-r">
          {parseContent(line.replace('> ', ''))}
        </blockquote>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex gap-2 ml-4 mb-2">
          <span className="text-indigo-600 font-bold">•</span>
          <span>{parseContent(line.replace('- ', ''))}</span>
        </div>
      );
    } else if (line.trim().match(/^\d+\. /)) {
      elements.push(
        <div key={i} className="flex gap-2 ml-4 mb-2">
          <span className="text-indigo-600 font-bold">{line.split(' ')[0]}</span>
          <span>{parseContent(line.replace(/^\d+\. /, ''))}</span>
        </div>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-4"></div>);
    } else {
      elements.push(<p key={i} className="leading-7 mb-4 text-gray-700 dark:text-gray-300">{parseContent(line)}</p>);
    }
    i++;
  }

  return <>{elements}</>;
}

// ---------- Inline markdown helpers ----------

function parseContent(text: string) {
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const parts = text.split(linkRegex);
  if (parts.length === 1) return parseBold(text);

  const elements: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) {
      elements.push(<span key={`text-${i}`}>{parseBold(parts[i])}</span>);
    }
    if (i + 1 < parts.length) {
      const linkText = parts[i + 1];
      const linkUrl = parts[i + 2];
      elements.push(
        <Link key={`link-${i}`} href={linkUrl} className="text-indigo-600 font-bold hover:underline">
          {parseBold(linkText)}
        </Link>
      );
    }
  }
  return elements;
}

function parseBold(text: string): React.ReactNode {
  const boldParts = text.split(/(\*\*.*?\*\*)/);
  return boldParts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    const italicParts = part.split(/(\*[^*]+?\*)/);
    if (italicParts.length === 1) return part;
    return italicParts.map((seg, j) => {
      if (seg.startsWith('*') && seg.endsWith('*') && seg.length > 2) {
        return <em key={`${i}-${j}`} className="italic">{seg.slice(1, -1)}</em>;
      }
      return seg;
    });
  });
}
