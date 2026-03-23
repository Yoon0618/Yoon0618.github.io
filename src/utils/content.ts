import type { CollectionEntry } from "astro:content";

export type PostEntry = CollectionEntry<"posts">;

export type TermGroup = {
  label: string;
  slug: string;
  count: number;
};

export type SeriesGroup = {
  label: string;
  slug: string;
  count: number;
  posts: PostEntry[];
};

export function slugifyTerm(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function isPublished(post: PostEntry) {
  return !post.data.draft;
}

export function sortPosts(posts: PostEntry[]) {
  return [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export function getPublishedPosts(posts: PostEntry[]) {
  return sortPosts(posts.filter(isPublished));
}

export function getTypeLabel(type: PostEntry["data"]["type"]) {
  return type === "article" ? "Article" : "Note";
}

export function formatDate(date: Date, locale: string = "ko-KR") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function groupTerms(
  posts: PostEntry[],
  pick: (post: PostEntry) => string[]
) {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    pick(post).forEach((term) => {
      counts.set(term, (counts.get(term) ?? 0) + 1);
    });
  });

  return [...counts.entries()]
    .map(([label, count]) => ({
      label,
      slug: slugifyTerm(label),
      count
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getCategories(posts: PostEntry[]) {
  return groupTerms(posts, (post) => [post.data.category]);
}

export function getTags(posts: PostEntry[]) {
  return groupTerms(posts, (post) => post.data.tags);
}

export function getSeries(posts: PostEntry[]): SeriesGroup[] {
  const map = new Map<string, PostEntry[]>();

  posts.forEach((post) => {
    if (!post.data.series) {
      return;
    }

    const current = map.get(post.data.series) ?? [];
    current.push(post);
    map.set(post.data.series, current);
  });

  return [...map.entries()]
    .map(([label, entries]) => ({
      label,
      slug: slugifyTerm(label),
      count: entries.length,
      posts: [...entries].sort((a, b) => {
        const orderA = a.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        return a.data.pubDate.getTime() - b.data.pubDate.getTime();
      })
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
