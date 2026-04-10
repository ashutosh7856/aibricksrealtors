"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useParams } from "next/navigation";

const sections = [
  { id: "overview", label: "OVERVIEW" },
  { id: "location", label: "LOCATION" },
  { id: "amenities", label: "AMENITIES" },
  { id: "pricing", label: "PRICING" },
  { id: "gallery", label: "GALLERY" },
  { id: "faq", label: "FAQ" },
];

export default function PropertySectionNav() {
  const [active, setActive] = useState("overview");
  const [isOpen, setIsOpen] = useState(false);
  const [propertyTitle, setPropertyTitle] = useState("");

  const { id } = useParams(); // ✅ get property id

  // ✅ FETCH PROPERTY TITLE
  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/v1/properties/${id}`);
        const data = await res.json();

        setPropertyTitle(data?.data?.propertyTitle || "Property Details");
      } catch (err) {
        console.error("Error fetching property:", err);
        setPropertyTitle("Property Details");
      }
    }

    if (id) fetchProperty();
  }, [id]);

  // ✅ SCROLL SPY
  useEffect(() => {
    const handleScroll = () => {
      let current = "overview";

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const offsetTop = el.offsetTop - 120;
          if (window.scrollY >= offsetTop) {
            current = section.id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ SCROLL FUNCTION
  const scrollToSection = (id) => {
    setIsOpen(false);

    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[var(--color-brickred)] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          {/* ✅ PROPERTY NAME FROM API */}
          <div className="text-lg md:text-2xl font-bold text-[var(--color-ochre)] truncate max-w-[70%]">
            {propertyTitle || "Loading..."}
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-sans transition-colors ${
                  active === item.id
                    ? "text-[var(--color-ochre)]"
                    : "text-[var(--color-lightcream)] hover:text-[var(--color-ochre)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between p-5 border-b">
          <span className="font-semibold">Menu</span>
          <X onClick={() => setIsOpen(false)} />
        </div>

        <div className="flex flex-col p-6 gap-4 text-md">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left ${
                active === item.id
                  ? "text-[var(--color-ochre)] font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
