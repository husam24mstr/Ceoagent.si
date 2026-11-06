import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";
import { engines } from "@/lib/engines";

describe("Public sitemap", () => {
  it("includes the homepage and all eight engine URLs but not the sitemap endpoint", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(sitemapStaticPaths(router)).toEqual(["/", "/pricing", ...engines.map(engine => `/engines/${engine.slug}`)].sort());
  });
  it("uses the published origin without fabricated modification dates", () => {
    const xml = sitemapXML("https://founder-strategy-copilot.lovable.app", [{ path: "/" }]);
    expect(xml).toContain("<loc>https://founder-strategy-copilot.lovable.app/</loc>");
    expect(xml).not.toContain("<lastmod>");
  });
});