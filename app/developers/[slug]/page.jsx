import { developersFaqs } from "@/data/faq";
import { formatBuilderName } from "@/lib/utils/formatBuilderName";
import AboutDeveloper from "@/src/Developers/AboutDeveloper";
import DeveloperHero from "@/src/Developers/DeveloperHero";
import DeveloperImpact from "@/src/Developers/DeveloperImpact";
import ProjectGrid from "@/src/Developers/ProjectGrid";
import FAQSection from "@/src/FAQSection";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

// async function getProjects(builderName) {
//   try {
//     const res = await fetch("http://localhost:3000/api/v1/properties", {
//       cache: "no-store",
//     });

//     const data = await res.json();

//     return data.data.filter((item) =>
//       item.builderName?.toLowerCase().includes(builderName.toLowerCase()),
//     );
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// }

async function getProjects(builderName) {
  try {
    const host = headers().get("host");
    const protocol = host.includes("localhost") ? "http" : "https";

    const res = await fetch(`${protocol}://${host}/api/v1/properties`, {
      cache: "no-store",
    });

    const data = await res.json();

    return data.data.filter((item) => {
      if (!item?.builderName || !builderName) return false;

      const apiName = item.builderName.toLowerCase().trim();
      const pageName = builderName.toLowerCase().trim();

      return apiName === pageName || apiName.includes(pageName);
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function DeveloperPage({ params }) {
  const slug = params?.slug; // ✅ FIX
  const builderName = formatBuilderName(slug);

  const projects = await getProjects(builderName);

  if (!projects.length) return notFound();

  return (
    <div>
      <DeveloperHero builderName={builderName} projects={projects} />

      <section id="about">
        <AboutDeveloper builderName={builderName} />
      </section>

      <section id="projects">
        <ProjectGrid projects={projects} />
      </section>

      <section id="impact">
        <DeveloperImpact />
      </section>

      <section id="faq">
        <FAQSection faqs={developersFaqs} />
      </section>
    </div>
  );
}
