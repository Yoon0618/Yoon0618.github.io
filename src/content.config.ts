import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      type: z.enum(["note", "article"]),
      category: z.string(),
      tags: z.array(z.string()),
      series: z.string().optional(),
      seriesOrder: z.number().int().positive().optional(),
      lang: z.enum(["ko", "en"]).default("ko"),
      draft: z.boolean().default(false),
      heroImage: image().optional()
    })
});

export const collections = { posts };
