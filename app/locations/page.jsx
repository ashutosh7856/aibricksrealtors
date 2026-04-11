import Link from "next/link";
import { headers } from "next/headers";

function createSlug(name) {
  return name?.toLowerCase().replace(/\s+/g, "-");
}

async function getCities() {
  try {
    const host = headers().get("host");
    const protocol = host.includes("localhost") ? "http" : "https";

    const res = await fetch(`${protocol}://${host}/api/v1/properties`, {
      cache: "no-store",
    });

    const data = await res.json();

    // ✅ unique cities
    const cities = [
      ...new Set(data.data.map((item) => item?.city).filter(Boolean)),
    ];

    return cities;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function LocationsPage() {
  const cities = await getCities();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Explore Cities
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cities.map((city, i) => (
          <Link
            key={i}
            href={`/locations/${createSlug(city)}`}
            className="border rounded-xl p-4 text-center hover:shadow-md"
          >
            {city}
          </Link>
        ))}
      </div>
    </div>
  );
}
