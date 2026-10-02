import { unstable_cache } from "next/cache";
import propertyModel from "@/lib/models/Property";
import UpcomingProject from "@/lib/models/UpcomingProject";
import { convertTimestamps } from "@/lib/utils/timestampConverter";

const formatArea = (area) => {
  if (Array.isArray(area) && area.length) {
    const values = area.map((entry) => Number(entry.area)).filter((value) => Number.isFinite(value) && value > 0);
    if (!values.length) return "-";
    const min = Math.min(...values);
    const max = Math.max(...values);
    return min === max ? `${min} sq.ft` : `${min}-${max} sq.ft`;
  }
  return area ? `${area} sq.ft` : "-";
};

const formatPrice = (property) => {
  const value = Number(property.priceRangeMin || property.totalPrice || property.monthlyRent);
  if (!Number.isFinite(value) || value <= 0) return "Price on request";
  return value >= 10000000
    ? `Starts from ₹ ${(value / 10000000).toFixed(2)} Cr`
    : `Starts from ₹ ${(value / 100000).toFixed(0)} Lac`;
};

const formatTrending = (property) => ({
  id: property.id,
  slug: property.slug,
  name: property.projectName || property.propertyTitle,
  developer: property.builderName,
  type: property.propertyType,
  location: [property.city, property.state].filter(Boolean).join(", "),
  bedrooms: Array.isArray(property.subTypes) && property.subTypes.length
    ? property.subTypes.join(", ")
    : property.subType || "",
  area: formatArea(property.builtUpArea),
  completion: property.propertyStatus,
  price: formatPrice(property),
  image: property.imageGallery?.[0] || "/home/ajman.webp",
});

const formatDemand = (properties) => {
  const groups = new Map();
  for (const property of properties) {
    const city = property.city?.trim();
    const locality = property.locality?.trim();
    if (!city || !locality) continue;
    const key = `${city}::${locality}`;
    if (!groups.has(key)) {
      groups.set(key, {
        city,
        locality,
        image: property.image || property.mainPropertyImage || "/home/indemand/4.jpg",
      });
    }
  }

  const cityOrder = new Map([["pune", 0], ["mumbai", 1], ["dubai", 2]]);
  return [...groups.values()].sort((a, b) => {
    const rank = (city) => cityOrder.get(city.toLowerCase()) ?? 99;
    return rank(a.city) - rank(b.city) || a.city.localeCompare(b.city) || a.locality.localeCompare(b.locality);
  });
};

export const getHomeData = unstable_cache(
  async () => {
    const [trending, activeProperties, upcoming] = await Promise.all([
      propertyModel.getTrendingProjects(9),
      propertyModel.getAll({ activeStatus: "Yes", limit: 100 }),
      UpcomingProject.getAll({ activeOnly: true }),
    ]);

    return {
      trending: trending.map((property) => formatTrending(convertTimestamps(property))),
      demand: formatDemand(activeProperties.map(convertTimestamps)),
      upcoming: upcoming.map(convertTimestamps),
    };
  },
  ["home-data"],
  { revalidate: 300, tags: ["properties"] },
);
