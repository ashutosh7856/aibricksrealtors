// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   Camera,
//   ShieldCheck,
//   Home,
//   Dumbbell,
//   Trees,
//   Building2,
//   Waves,
//   Users,
//   BookOpen,
//   Film,
//   Footprints,
// } from "lucide-react";
// import ContactSidebar from "@/src/Properties/ContactSidebar";
// import BookSiteVisitCard from "@/src/Properties/BookSiteVisitCard";
// import SellerContactActions from "@/src/Properties/SellerContactActions";

// /* ================= AMENITY ICON MAP ================= */

// const AMENITY_ICONS = {
//   "Video Door Phone": Camera,
//   "Vitrified Tiles": Home,
//   "Granite Kitchen": Home,
//   "Branded Fittings": ShieldCheck,
//   "D.G Backup": ShieldCheck,
//   "CCTV Camera": Camera,

//   "Swimming Pool": Waves,
//   "Club House": Building2,
//   "Jogging Track": Footprints,
//   Garden: Trees,
//   "Multipurpose Hall": Users,
//   "Senior Citizen Area": Users,
//   "Kids Pool": Waves,
//   Library: BookOpen,
//   "Movie Theatre": Film,
//   Gym: Dumbbell,
// };

// /* ================= MAIN PAGE ================= */

// export default function PropertyDetailPage() {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProperty() {
//       try {
//         const res = await fetch(`/api/v1/properties/${id}`);
//         const data = await res.json();
//         setProperty(data?.data || null);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (id) fetchProperty();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
//         Loading property details...
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         Property not found
//       </div>
//     );
//   }

//   const hasSellerInfo =
//     property?.seller &&
//     (property.seller.sellerName ||
//       property.seller.phone ||
//       property.seller.email);

//   const overviewItems = [
//     {
//       label: "Built-up Area",
//       value: property.builtUpArea,
//       format: (v) => `${v} sq.ft`,
//     },
//     {
//       label: "Carpet Area",
//       value: property.carpetArea,
//       format: (v) => `${v} sq.ft`,
//     },
//     {
//       label: "Floor",
//       value:
//         property.floorNumber && property.totalFloors
//           ? `${property.floorNumber}/${property.totalFloors}`
//           : null,
//     },
//     {
//       label: "Facing",
//       value: property.facingDirection,
//     },
//     {
//       label: "Furnishing",
//       value: property.furnishing,
//     },
//     {
//       label: "Ownership",
//       value: property.ownershipType,
//     },
//     {
//       label: "Listing Type",
//       value: property.listingType,
//     },
//     {
//       label: "Builder",
//       value: property.builderName,
//     },
//   ];

//   const validOverviewItems = overviewItems.filter(
//     (item) =>
//       item.value !== null && item.value !== undefined && item.value !== "",
//   );

//   return (
//     <div className="bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
//         {/* ================= HEADER ================= */}
//         <div className="mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold">
//             {property.propertyTitle}
//           </h1>
//           <p className="text-gray-600 mt-1">
//             {property.locality}, {property.city}
//           </p>
//           <p className="text-2xl font-bold text-brickred mt-2">
//             ₹ {(property.totalPrice / 10000000).toFixed(2)} Cr
//           </p>
//         </div>

//         {/* ================= TOP GRID ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* IMAGE GALLERY */}
//           <div className="lg:col-span-2">
//             <div className="grid grid-cols-2 gap-3 h-[320px] md:h-[400px]">
//               {/* Main Image */}
//               <div className="col-span-2 md:col-span-1 row-span-2 relative rounded-xl overflow-hidden bg-gray-200">
//                 {property.mainPropertyImage ? (
//                   <img
//                     src={property.mainPropertyImage}
//                     alt="Main"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-400">
//                     No Image
//                   </div>
//                 )}
//               </div>

//               {/* Side Images */}
//               <div className="hidden md:grid grid-rows-2 gap-3 h-full">
//                 <div className="relative rounded-xl overflow-hidden bg-gray-200 h-full">
//                   {property.imageGallery?.[0] && (
//                     <img
//                       src={property.imageGallery[0]}
//                       alt="Gallery 1"
//                       className="w-full h-full object-cover"
//                     />
//                   )}
//                 </div>
//                 <div className="relative rounded-xl overflow-hidden bg-gray-200 h-full">
//                   {property.imageGallery?.[1] && (
//                     <img
//                       src={property.imageGallery[1]}
//                       alt="Gallery 2"
//                       className="w-full h-full object-cover"
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* CTA CARD */}
//           <div className="lg:sticky lg:top-28 h-fit">
//             <div className="bg-white rounded-2xl shadow p-6 space-y-4">
//               <ContactSidebar property={property} />
//               <BookSiteVisitCard property={property} />
//             </div>
//           </div>
//         </div>

//         {/* ================= OVERVIEW ================= */}
//         {/* <Section title="Overview">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <Detail
//               label="Built-up Area"
//               value={`${property.builtUpArea} sq.ft`}
//             />
//             <Detail
//               label="Carpet Area"
//               value={`${property.carpetArea} sq.ft`}
//             />
//             <Detail
//               label="Floor"
//               value={`${property.floorNumber}/${property.totalFloors}`}
//             />
//             <Detail label="Facing" value={property.facingDirection} />
//             <Detail label="Furnishing" value={property.furnishing} />
//             <Detail label="Ownership" value={property.ownershipType} />
//             <Detail label="Listing Type" value={property.listingType} />
//             <Detail label="Builder" value={property.builderName} />
//           </div>
//         </Section> */}
//         {validOverviewItems.length > 0 && (
//           <Section title="Overview">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {validOverviewItems.map((item, index) => (
//                 <Detail
//                   key={index}
//                   label={item.label}
//                   value={item.format ? item.format(item.value) : item.value}
//                 />
//               ))}
//             </div>
//           </Section>
//         )}

//         {/* ================= AMENITIES ================= */}
//         {property.amenities?.length > 0 && (
//           <AmenitiesSection amenities={property.amenities} />
//         )}

//         {/* ================= SELLER ================= */}
//         {/* <Section title="Seller Information">
//           <div className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row gap-6 justify-between">
//             <div className="flex gap-4 items-center">
//               <div className="h-14 w-14 rounded-full bg-brickred text-white flex items-center justify-center font-bold text-lg">
//                 {property.seller?.sellerName?.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-semibold text-lg">
//                   {property.seller?.sellerName}
//                 </p>
//                 <p className="text-gray-600 text-sm">
//                   {property.seller?.sellerType}
//                 </p>
//               </div>
//             </div>

//             <SellerContactActions
//               phone={property.seller?.phone}
//               email={property.seller?.email}
//               propertyTitle={property.propertyTitle}
//             />
//           </div>
//         </Section> */}
//         {hasSellerInfo && (
//           <Section title="Seller Information">
//             <div className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row gap-6 justify-between">
//               <div className="flex gap-4 items-center">
//                 <div className="h-14 w-14 rounded-full bg-brickred text-white flex items-center justify-center font-bold text-lg">
//                   {property.seller?.sellerName?.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-lg">
//                     {property.seller?.sellerName}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     {property.seller?.sellerType}
//                   </p>
//                 </div>
//               </div>

//               <SellerContactActions
//                 phone={property.seller?.phone}
//                 email={property.seller?.email}
//                 propertyTitle={property.propertyTitle}
//               />
//             </div>
//           </Section>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= AMENITIES COMPONENT ================= */

// function AmenitiesSection({ amenities }) {
//   const [showAll, setShowAll] = useState(false);

//   const internalAmenities = amenities.filter((a) =>
//     [
//       "Video Door Phone",
//       "Vitrified Tiles",
//       "Granite Kitchen",
//       "Branded Fittings",
//       "D.G Backup",
//       "CCTV Camera",
//     ].includes(a),
//   );

//   const externalAmenities = amenities.filter(
//     (a) => !internalAmenities.includes(a),
//   );

//   const visibleExternal = showAll
//     ? externalAmenities
//     : externalAmenities.slice(0, 8);

//   return (
//     <Section title="Amenities">
//       {internalAmenities.length > 0 && (
//         <>
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">
//             Internal Amenities
//           </h3>
//           <AmenityGrid items={internalAmenities} />
//         </>
//       )}

//       {externalAmenities.length > 0 && (
//         <>
//           <h3 className="text-lg font-semibold mt-10 mb-4 text-gray-700">
//             External Amenities
//           </h3>

//           <AmenityGrid items={visibleExternal} />

//           {externalAmenities.length > 8 && (
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="mt-4 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-semibold"
//             >
//               {showAll ? "Show Less" : `+${externalAmenities.length - 8} More`}
//             </button>
//           )}
//         </>
//       )}
//     </Section>
//   );
// }

// /* ================= AMENITY GRID ================= */

// function AmenityGrid({ items }) {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//       {items.map((amenity, index) => {
//         const Icon = AMENITY_ICONS[amenity] || Home;

//         return (
//           <div
//             key={index}
//             className="flex flex-col items-center justify-center gap-2
//                        bg-white border rounded-xl p-4 text-center
//                        hover:shadow-md transition"
//           >
//             <div className="h-10 w-10 flex items-center justify-center rounded-full bg-brickred/10 text-brickred">
//               <Icon size={20} />
//             </div>
//             <p className="text-sm font-medium text-gray-700 leading-tight">
//               {amenity}
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ================= REUSABLE ================= */

// function Section({ title, children }) {
//   return (
//     <div className="mt-14">
//       <h2 className="text-xl font-semibold mb-6">{title}</h2>
//       {children}
//     </div>
//   );
// }

// function Detail({ label, value }) {
//   return (
//     <div>
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="font-semibold">{value}</p>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  IndianRupee,
  Home,
  Waves,
  Trees,
  Dumbbell,
  ShieldCheck,
  Building2,
  Users,
  ChevronDown,
} from "lucide-react";

import ContactSidebar from "@/src/Properties/ContactSidebar";
import BookSiteVisitCard from "@/src/Properties/BookSiteVisitCard";
import SellerContactActions from "@/src/Properties/SellerContactActions";
import LoginModal from "@/src/Auth/LoginModal";
import toast from "react-hot-toast";

/* ================= UTIL ================= */

const formatPrice = (price) =>
  price ? `₹ ${(price / 10000000).toFixed(2)} Cr` : "Price on request";

/* ================= PAGE ================= */

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      const res = await fetch(`/api/v1/properties/${id}`);
      const data = await res.json();
      setProperty(data?.data || null);
      setLoading(false);
    }
    if (id) fetchProperty();
  }, [id]);

  if (loading) return <CenterMsg msg="Loading property details..." />;
  if (!property) return <CenterMsg msg="Property not found" />;

  return (
    <div className="bg-[#f4f6f9]">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
        {/* ================= TITLE ROW ================= */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{property.propertyTitle}</h1>

            <div className="flex flex-wrap items-center gap-3 text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {property.locality}, {property.city}
              </span>

              <Badge text={property.propertyStatus} color="green" />
              <Badge text={property.propertyType} color="blue" />
              <Badge text={property.listingType} color="purple" />
            </div>
          </div>

          <div className="bg-white border rounded-xl px-6 py-4 shadow-sm text-right">
            <p className="text-gray-500 text-sm">Starting Price</p>
            <p className="text-3xl font-bold text-brickred flex items-center gap-1 justify-end">
              <IndianRupee size={24} />
              {formatPrice(property.totalPrice)}
            </p>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-2 space-y-10">
            <HeroGallery property={property} />
            <HighlightStrip property={property} />
            <OverviewCard property={property} />
            <LocationMap property={property} />
            <VideoSection />
            {/* <ProsCons /> */}
            <AmenitiesGrid amenities={property.amenities} />
            <MasterPlan property={property} />
            <PricingCard property={property} />
            <LegalDetails property={property} />
            <DocumentsSection property={property} />
            {/* <QRSection /> */}
            <BuilderSection property={property} />
            <FAQSection />
            {/* <RelatedProjects /> */}
          </div>

          {/* ================= SIDEBAR ================= */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="space-y-4">
              <ContactSidebar property={property} />
              <BookSiteVisitCard property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= HERO GALLERY ================= */

function HeroGallery({ property }) {
  return (
    <div className="bg-white border rounded-xl p-3">
      <div className="grid grid-cols-2 gap-3 h-[420px]">
        <div className="row-span-2 bg-gray-200 rounded-lg flex items-center justify-center">
          {property.mainPropertyImage ? (
            <img
              src={property.mainPropertyImage}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            "No Image"
          )}
        </div>

        <GalleryItem src={property.imageGallery?.[0]} />
        <GalleryItem src={property.imageGallery?.[1]} />
      </div>
    </div>
  );
}

/* ================= INFO STRIP ================= */

function HighlightStrip({ property }) {
  const items = [
    ["Built-up", `${property.builtUpArea} sq.ft`],
    ["Carpet", `${property.carpetArea} sq.ft`],
    ["Facing", property.facingDirection],
    ["Furnishing", property.furnishing],
    ["Ownership", property.ownershipType],
  ];

  return (
    <div className="bg-white border rounded-xl p-5 grid grid-cols-2 md:grid-cols-5 text-center">
      {items.map(([label, value], i) => (
        <div key={i}>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
}

/* ================= OVERVIEW ================= */

function OverviewCard({ property }) {
  const items = [
    ["Builder", property.builderName],
    ["Project", property.projectName],
    ["City", property.city],
    ["State", property.state],
    ["Country", property.country],
    ["Landmark", property.landmark],
    ["Total Floors", property.totalFloors],
    ["Floor Number", property.floorNumber],
  ];

  return (
    <Card title="Overview">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(([label, value], i) => (
          <Detail key={i} label={label} value={value} />
        ))}
      </div>
    </Card>
  );
}

/* ================= LOCATION ================= */

function LocationMap({ property }) {
  const location = `${property.city}, ${property.state}`;

  return (
    <Card title="Location">
      <iframe
        width="100%"
        height="320"
        className="rounded-lg"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=14&output=embed`}
      />
    </Card>
  );
}

/* ================= VIDEO ================= */

function VideoSection() {
  return (
    <Card title="Project Video">
      <div className="h-[320px] bg-gray-100 rounded-lg flex items-center justify-center">
        Video player here
      </div>
    </Card>
  );
}

/* ================= PROS CONS ================= */

// function ProsCons() {
//   return (
//     <Card title="Pros & Cons">
//       <div className="space-y-3">
//         <Accordion title="Pros" />
//         <Accordion title="Cons" />
//       </div>
//     </Card>
//   );
// }

/* ================= AMENITIES ================= */

function AmenitiesGrid({ amenities = [] }) {
  return (
    <Card title="Amenities">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {amenities.map((a, i) => (
          <div key={i} className="border rounded-lg p-4 text-center bg-white">
            <div className="h-10 w-10 mx-auto flex items-center justify-center bg-brickred/10 text-brickred rounded-full">
              <Home size={20} />
            </div>
            <p className="text-sm mt-2">{a}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ================= MASTER PLAN ================= */

function MasterPlan({ property }) {
  const images =
    property?.floorPlanImages ||
    property?.data?.floorPlanImages ||
    property?.data?.[0]?.floorPlanImages ||
    [];

  const floorPlanImage = images[0];

  return (
    <Card title="Master & Floor Plan">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-72 bg-gray-100 rounded-lg flex items-center justify-center">
          Master Plan
        </div>

        <div className="h-72 bg-gray-100 rounded-lg overflow-hidden">
          {floorPlanImage ? (
            <img
              src={floorPlanImage}
              alt="Floor Plan"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Floor Plan Not Available
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ================= PRICING ================= */

function PricingCard({ property }) {
  return (
    <Card title="Pricing">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Detail label="Total Price" value={formatPrice(property.totalPrice)} />
        <Detail
          label="Price / Sq.ft"
          value={`₹ ${property.pricePerSquareFoot}`}
        />
        <Detail label="Type" value={property.subType} />
        <Detail label="Listing Type" value={property.listingType} />
      </div>
    </Card>
  );
}

/* ================= LEGAL ================= */

function LegalDetails({ property }) {
  const items = [
    ["Ownership", property.ownershipType],
    ["Property Status", property.propertyStatus],
    ["Furnishing", property.furnishing],
    ["Facing", property.facingDirection],
  ];

  return (
    <Card title="Legal Details">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(([l, v], i) => (
          <Detail key={i} label={l} value={v} />
        ))}
      </div>
    </Card>
  );
}

/* ================= DOCUMENTS ================= */

function DocumentsSection({ property }) {
  const brochures = property?.brochures || [];
  const [showLogin, setShowLogin] = useState(false);

  const isLoggedIn = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  };

  const handleDownload = (url, name) => {
    if (!isLoggedIn()) {
      setShowLogin(true);
      return;
    }

    if (!url) {
      toast.error("Document not available");
      return;
    }

    if (url) {
      window.open(url, "_blank");
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = name || "Property_Brochure";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Card title="Documents">
        {brochures.length === 0 ? (
          <p className="text-gray-600">No documents available</p>
        ) : (
          <div className="space-y-3">
            {brochures.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <p className="text-sm font-medium">{doc.name}</p>

                <button
                  onClick={() => handleDownload(doc.url, doc.name)}
                  className="bg-brickred text-white px-4 py-2 rounded-lg text-sm"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* LOGIN MODAL */}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

/* ================= QR ================= */

// function QRSection() {
//   return (
//     <Card title="QR Code">
//       <div className="h-32 w-32 bg-gray-200 rounded-lg" />
//     </Card>
//   );
// }

/* ================= BUILDER ================= */

/* ================= BUILDER ================= */

function BuilderSection({ property }) {
  return (
    <Card title="About Builder">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{property.sellerName}</p>
          <p className="text-gray-500 text-sm">Project Developer</p>
        </div>

        <SellerContactActions
          phone={property.phoneNumber}
          email={property.email}
          propertyTitle={property.propertyTitle}
        />
      </div>
    </Card>
  );
}

/* ================= FAQ ================= */

function FAQSection() {
  const faqs = [
    {
      q: "What is the possession timeline for this property?",
      a: "Possession depends on construction status. Ready-to-move properties are available immediately, while under-construction projects follow the RERA possession schedule. Contact our team for the latest timeline.",
    },
    {
      q: "Is home loan assistance available?",
      a: "Yes. Most properties are approved by leading banks and financial institutions. We assist buyers in securing home loans with competitive interest rates and quick processing.",
    },
    {
      q: "Are there additional charges beyond the listed price?",
      a: "The listed price usually covers the base cost. Additional charges may include registration, stamp duty, GST (if applicable), maintenance deposit, parking, and clubhouse fees.",
    },
    {
      q: "Can I schedule a site visit before booking?",
      a: "Absolutely. We encourage site visits so buyers can evaluate the property, amenities, and surroundings. Our team can arrange a guided visit at your convenience.",
    },
    {
      q: "Is the property legally verified and RERA registered?",
      a: "We prioritize transparency and list properties with proper documentation. Most projects are RERA registered and compliant with regulations. Document verification assistance is available on request.",
    },
  ];

  return (
    <Card title="Frequently Asked Questions">
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <Accordion key={i} title={item.q} content={item.a} />
        ))}
      </div>
    </Card>
  );
}

/* ================= RELATED ================= */

// function RelatedProjects() {
//   return (
//     <Card title="Explore Related Projects">
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="h-40 bg-gray-100 rounded-lg" />
//         <div className="h-40 bg-gray-100 rounded-lg" />
//       </div>
//     </Card>
//   );
// }

/* ================= REUSABLE ================= */

function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Badge({ text, color }) {
  const map = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-sm ${map[color]}`}>{text}</span>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value || "-"}</p>
    </div>
  );
}

function GalleryItem({ src }) {
  return (
    <div className="bg-gray-200 rounded-lg flex items-center justify-center">
      {src ? (
        <img src={src} className="w-full h-full object-cover rounded-lg" />
      ) : (
        "No Image"
      )}
    </div>
  );
}

function Accordion({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left font-medium text-md"
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 text-gray-600 text-md leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}

function CenterMsg({ msg }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
      {msg}
    </div>
  );
}
