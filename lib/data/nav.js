import { unstable_cache } from "next/cache";

export const getNavData = unstable_cache(
  async () => {
    try {
      const [devModule, locPageModule] = await Promise.all([
        import("@/lib/models/Developer").then((m) => m.default),
        import("@/lib/models/LocationPage").then((m) => m.default),
      ]);

      const [developers, locationPages] = await Promise.all([
        devModule.getAll(),
        locPageModule.getAll(),
      ]);

      const builders = developers
        .filter((d) => d.name && d.slug)
        .map((d) => ({ name: d.name.trim(), slug: d.slug }))
        .sort((a, b) => a.name.localeCompare(b.name));

      const locations = locationPages
        .filter((p) => p.city && p.slug)
        .map((p) => ({ city: p.city.trim(), slug: p.slug }));

      return { builders, locations };
    } catch {
      return { builders: [], locations: [] };
    }
  },
  ["nav-data"],
  { revalidate: 300, tags: ["developers", "location-pages"] },
);
