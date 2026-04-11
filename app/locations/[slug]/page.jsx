import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ProjectGrid from "@/src/Developers/ProjectGrid";
import Link from "next/link";

function formatName(slug) {
  const value = Array.isArray(slug) ? slug[0] : slug;
  return value
    ?.split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function getData(city, selectedLocality) {
  try {
    const host = headers().get("host");
    const protocol = host.includes("localhost") ? "http" : "https";

    const res = await fetch(`${protocol}://${host}/api/v1/properties`, {
      cache: "no-store",
    });

    const data = await res.json();

    let filtered = data.data.filter((item) => {
      if (!item?.city) return false;

      return item.city.toLowerCase().trim() === city.toLowerCase().trim();
    });

    // ✅ apply locality filter
    if (selectedLocality) {
      filtered = filtered.filter(
        (item) =>
          item.locality?.toLowerCase() === selectedLocality.toLowerCase(),
      );
    }

    // ✅ unique localities for filter UI
    const localities = [
      ...new Set(filtered.map((item) => item.locality).filter(Boolean)),
    ];

    return { projects: filtered, localities };
  } catch (err) {
    console.error(err);
    return { projects: [], localities: [] };
  }
}

export default async function LocationPage({ params, searchParams }) {
  const city = formatName(params?.slug);
  const selectedLocality = searchParams?.locality;

  const { projects, localities } = await getData(city, selectedLocality);

  if (!projects.length) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-30">
      {/* TITLE */}
      <h1 className="text-2xl md:text-4xl font-bold mb-6">
        Properties in {city}
      </h1>

      {/* LOCALITY FILTER */}
      <div className="flex flex-wrap gap-2 mb-6  w-[100%]">
        <Link
          href={`/locations/${params.slug}`}
          className="px-5 py-2 rounded-sm text-md font-medium tracking-wide border-2"
        >
          All
        </Link>

        {localities.map((loc, i) => {
          const isActive = selectedLocality === loc.toLowerCase();

          return (
            <Link
              key={i}
              href={`/locations/${params.slug}?locality=${loc.toLowerCase()}`}
              className={`
          px-5 py-2 rounded-sm text-md font-medium tracking-wide
          transition-all duration-300 ease-in-out
          border backdrop-blur-md
          
          ${
            isActive
              ? "bg-brickred text-white border-ochre shadow-lg scale-105"
              : "bg-white/70 text-gray-700 border-gray-200 hover:bg-brickred hover:text-white hover:shadow-md hover:scale-105"
          }
        `}
            >
              {loc}
            </Link>
          );
        })}
      </div>

      {/* PROJECT GRID */}
      <ProjectGrid projects={projects} />
    </div>
  );
}
