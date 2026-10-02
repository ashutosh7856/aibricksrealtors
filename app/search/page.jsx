import SearchClient from "@/src/Search/SearchClient";
import { SearchSkeleton } from "@/src/skeletons/SearchSkeleton";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/utils/seo";
import propertyModel from "@/lib/models/Property";
import { convertTimestamps } from "@/lib/utils/timestampConverter";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Search Properties | AI Bricks Realtors",
  description: "Search residential and commercial properties across India on AI Bricks Realtors.",
  path: "/search",
  noIndex: true,
});

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const filters = Object.fromEntries(
    Object.entries(resolvedSearchParams || {}).filter(([, value]) => value !== "" && value != null),
  );
  const initialSearchKey = new URLSearchParams(resolvedSearchParams || {}).toString();
  const searchResult = await propertyModel.advancedSearch({
    propertyType: filters.propertyType,
    city: filters.city,
    developer: filters.developer || filters.builder,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    searchText: filters.q || filters.search,
    listingType: filters.listingType,
    propertyStatus: filters.handover || filters.propertyStatus,
    page: filters.page || 1,
    limit: filters.limit || 20,
    activeStatus: filters.activeStatus || "Yes",
  });

  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchClient
        initialProperties={searchResult.results.map(convertTimestamps)}
        initialSearchKey={initialSearchKey}
      />
    </Suspense>
  );
}
