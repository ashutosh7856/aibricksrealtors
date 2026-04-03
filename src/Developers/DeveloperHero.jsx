export default function DeveloperHero({ builderName, projects }) {
  return (
    <section className="relative h-[600px] md:h-[650px]">
      <img
        src="/developers/kolt_wagoh.jpg"
        className="w-full h-full object-cover"
        alt="developer"
      />

      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold">
          {builderName} Projects
        </h1>

        <p className="mt-2 text-sm md:text-lg">
          {projects.length} Projects Available
        </p>

        <button className="mt-4 bg-ochre px-6 py-2 rounded text-lg cursor-pointer">
          Get Details
        </button>
      </div>
    </section>
  );
}

// "use client";

// import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import PropertyEnquiryModal from "../Modal/PropertyEnquiryModal";

// export default function DeveloperHero({ builderName, projects }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const searchParams = useSearchParams();

//   const developerName =
//     searchParams.get("builder") || builderName || "Default Developer";

//   return (
//     <>
//       <section className="relative h-[600px] md:h-[650px]">
//         <img
//           src="/developers/kolt_wagoh.jpg"
//           className="w-full h-full object-cover"
//           alt="developer"
//         />

//         <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-4">
//           <h1 className="text-2xl md:text-5xl font-bold">
//             {developerName} Projects
//           </h1>

//           <p className="mt-2 text-sm md:text-lg">
//             {projects.length} Projects Available
//           </p>

//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="mt-4 bg-ochre px-6 py-2 rounded text-lg cursor-pointer"
//           >
//             Get Details
//           </button>
//         </div>
//       </section>

//       <PropertyEnquiryModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         propertyName={developerName} // 👈 pass developer name here
//       />
//     </>
//   );
// }
