"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Camera,
  ShieldCheck,
  Home,
  Dumbbell,
  Trees,
  Building2,
  Waves,
  Users,
  BookOpen,
  Film,
  Footprints,
} from "lucide-react";
import ContactSidebar from "@/src/Properties/ContactSidebar";
import BookSiteVisitCard from "@/src/Properties/BookSiteVisitCard";
import SellerContactActions from "@/src/Properties/SellerContactActions";

/* ================= AMENITY ICON MAP ================= */

const AMENITY_ICONS = {
  "Video Door Phone": Camera,
  "Vitrified Tiles": Home,
  "Granite Kitchen": Home,
  "Branded Fittings": ShieldCheck,
  "D.G Backup": ShieldCheck,
  "CCTV Camera": Camera,

  "Swimming Pool": Waves,
  "Club House": Building2,
  "Jogging Track": Footprints,
  Garden: Trees,
  "Multipurpose Hall": Users,
  "Senior Citizen Area": Users,
  "Kids Pool": Waves,
  Library: BookOpen,
  "Movie Theatre": Film,
  Gym: Dumbbell,
};

/* ================= MAIN PAGE ================= */

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/v1/properties/${id}`);
        const data = await res.json();
        setProperty(data?.data || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Property not found
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            {property.propertyTitle}
          </h1>
          <p className="text-gray-600 mt-1">
            {property.locality}, {property.city}
          </p>
          <p className="text-2xl font-bold text-brickred mt-2">
            ₹ {(property.totalPrice / 10000000).toFixed(2)} Cr
          </p>
        </div>

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* IMAGE GALLERY */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3 h-[320px] md:h-[400px]">
              {/* Main Image */}
              <div className="col-span-2 md:col-span-1 row-span-2 relative rounded-xl overflow-hidden bg-gray-200">
                 {property.mainPropertyImage ? (
                    <img 
                        src={property.mainPropertyImage} 
                        alt="Main" 
                        className="w-full h-full object-cover"
                    />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                 )}
              </div>
              
              {/* Side Images */}
              <div className="hidden md:grid grid-rows-2 gap-3 h-full">
                 <div className="relative rounded-xl overflow-hidden bg-gray-200 h-full">
                    {property.imageGallery?.[0] && (
                        <img 
                            src={property.imageGallery[0]} 
                            alt="Gallery 1" 
                            className="w-full h-full object-cover"
                        />
                    )}
                 </div>
                 <div className="relative rounded-xl overflow-hidden bg-gray-200 h-full">
                     {property.imageGallery?.[1] && (
                        <img 
                            src={property.imageGallery[1]} 
                            alt="Gallery 2" 
                            className="w-full h-full object-cover"
                        />
                    )}
                 </div>
              </div>
            </div>
          </div>

          {/* CTA CARD */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              {/* <button className="w-full bg-brickred text-white py-3 rounded-lg font-semibold">
                Call Agent
              </button>
              <button className="w-full border border-brickred text-brickred py-3 rounded-lg font-semibold">
                Enquire Now
              </button>

              <div className="text-sm text-gray-600">
                ✔ Free Site Visit <br />
                ✔ Verified Property <br />✔ Best Price Guaranteed
              </div> */}
              <ContactSidebar property={property} />
              <BookSiteVisitCard property={property} />
            </div>
          </div>
        </div>

        {/* ================= OVERVIEW ================= */}
        <Section title="Overview">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Detail
              label="Built-up Area"
              value={`${property.builtUpArea} sq.ft`}
            />
            <Detail
              label="Carpet Area"
              value={`${property.carpetArea} sq.ft`}
            />
            <Detail
              label="Floor"
              value={`${property.floorNumber}/${property.totalFloors}`}
            />
            <Detail label="Facing" value={property.facingDirection} />
            <Detail label="Furnishing" value={property.furnishing} />
            <Detail label="Ownership" value={property.ownershipType} />
            <Detail label="Listing Type" value={property.listingType} />
            <Detail label="Builder" value={property.builderName} />
          </div>
        </Section>

        {/* ================= AMENITIES ================= */}
        {property.amenities?.length > 0 && (
          <AmenitiesSection amenities={property.amenities} />
        )}

        {/* ================= SELLER ================= */}
        <Section title="Seller Information">
          <div className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row gap-6 justify-between">
            <div className="flex gap-4 items-center">
              <div className="h-14 w-14 rounded-full bg-brickred text-white flex items-center justify-center font-bold text-lg">
                {property.seller?.sellerName?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {property.seller?.sellerName}
                </p>
                <p className="text-gray-600 text-sm">
                  {property.seller?.sellerType}
                </p>
              </div>
            </div>

            {/* <div className="flex gap-3">
              <button className="px-5 py-2 bg-brickred text-white rounded-lg">
                Call
              </button>
              <button className="px-5 py-2 border border-brickred text-brickred rounded-lg">
                Email
              </button>
            </div> */}

            <SellerContactActions
              phone={property.seller?.phone}
              email={property.seller?.email}
              propertyTitle={property.propertyTitle}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ================= AMENITIES COMPONENT ================= */

function AmenitiesSection({ amenities }) {
  const [showAll, setShowAll] = useState(false);

  const internalAmenities = amenities.filter((a) =>
    [
      "Video Door Phone",
      "Vitrified Tiles",
      "Granite Kitchen",
      "Branded Fittings",
      "D.G Backup",
      "CCTV Camera",
    ].includes(a),
  );

  const externalAmenities = amenities.filter(
    (a) => !internalAmenities.includes(a),
  );

  const visibleExternal = showAll
    ? externalAmenities
    : externalAmenities.slice(0, 8);

  return (
    <Section title="Amenities">
      {internalAmenities.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Internal Amenities
          </h3>
          <AmenityGrid items={internalAmenities} />
        </>
      )}

      {externalAmenities.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-10 mb-4 text-gray-700">
            External Amenities
          </h3>

          <AmenityGrid items={visibleExternal} />

          {externalAmenities.length > 8 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-semibold"
            >
              {showAll ? "Show Less" : `+${externalAmenities.length - 8} More`}
            </button>
          )}
        </>
      )}
    </Section>
  );
}

/* ================= AMENITY GRID ================= */

function AmenityGrid({ items }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((amenity, index) => {
        const Icon = AMENITY_ICONS[amenity] || Home;

        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2
                       bg-white border rounded-xl p-4 text-center
                       hover:shadow-md transition"
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-brickred/10 text-brickred">
              <Icon size={20} />
            </div>
            <p className="text-sm font-medium text-gray-700 leading-tight">
              {amenity}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ================= REUSABLE ================= */

function Section({ title, children }) {
  return (
    <div className="mt-14">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
