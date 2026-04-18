import SearchClient from "@/src/Search/SearchClient";
import { SearchSkeleton } from "@/src/skeletons/SearchSkeleton";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchClient />
    </Suspense>
  );
}
