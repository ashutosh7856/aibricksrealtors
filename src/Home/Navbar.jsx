"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDevDropdown, setShowDevDropdown] = useState(false);
  const [showMobileDev, setShowMobileDev] = useState(false);
  const [showLocDropdown, setShowLocDropdown] = useState(false);
  const [showMobileLoc, setShowMobileLoc] = useState(false);
  const [builders, setBuilders] = useState([]);
  const [locations, setLocations] = useState([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/v1/properties");
        const data = await res.json();

        const uniqueBuilders = [
          ...new Set(
            data.data?.map((item) => item.builderName?.trim()).filter(Boolean),
          ),
        ];
        setBuilders(uniqueBuilders);

        const cityMap = {};
        data.data?.forEach((item) => {
          const city = item.city?.trim();
          const locality = item.locality?.trim();

          if (!city || !locality) return;

          if (!cityMap[city]) cityMap[city] = new Set();
          cityMap[city].add(locality);
        });

        const formatted = Object.keys(cityMap).map((city) => ({
          city,
          localities: Array.from(cityMap[city]),
        }));

        setLocations(formatted);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, []);

  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-brickred shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-ochre">
            <Link href="/" className="cursor-pointer">
              AI BRICKS
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 text-lightcream">
            <Link href="/" className="nav-link cursor-pointer">
              HOME
            </Link>
            <Link href="/about" className="nav-link cursor-pointer">
              ABOUT
            </Link>
            <Link href="/properties" className="nav-link cursor-pointer">
              PROPERTIES
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setShowDevDropdown(true)}
              onMouseLeave={() => setShowDevDropdown(false)}
            >
              <button className="flex items-center gap-1 text-lightcream hover:text-ochre cursor-pointer">
                DEVELOPERS <ChevronDown size={16} />
              </button>

              {showDevDropdown && (
                <>
                  <div className="absolute top-full left-0 w-full h-3" />
                  <div className="absolute top-full left-0 w-[320px] bg-white rounded-lg shadow-lg border z-50 text-darkgray overflow-hidden">
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                        Developers
                      </p>
                      <div className="max-h-72 overflow-y-auto no-scrollbar space-y-1 pr-1">
                        {builders.map((builder, index) => (
                          <button
                            key={index}
                            onClick={() => router.push(`/developers/${toSlug(builder)}`)}
                            className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                          >
                            {builder}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setShowLocDropdown(true)}
              onMouseLeave={() => setShowLocDropdown(false)}
            >
              <button className="flex items-center gap-1 hover:text-ochre cursor-pointer">
                LOCATIONS <ChevronDown size={16} />
              </button>

              {showLocDropdown && (
                <>
                  <div className="absolute top-full left-0 w-full h-3" />
                  <div className="absolute top-full left-0 w-64 max-h-80 overflow-y-auto bg-white rounded-xl shadow-xl border z-50 p-4 space-y-4">
                    {locations.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => router.push(`/locations/${toSlug(item.city)}`)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-darkgray cursor-pointer"
                      >
                        {item.city}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href="/contact" className="nav-link cursor-pointer">
              CONTACT
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white cursor-pointer"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between p-5 border-b items-center">
          <span className="font-semibold">Menu</span>
          <X onClick={() => setIsOpen(false)} className="cursor-pointer" size={22} />
        </div>

        <div className="flex flex-col p-6 gap-4 text-darkgray">
          <Link href="/" className="cursor-pointer" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="cursor-pointer" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/properties" className="cursor-pointer" onClick={() => setIsOpen(false)}>
            Properties
          </Link>

          <div>
            <button
              onClick={() => setShowMobileDev(!showMobileDev)}
              className="flex items-center justify-between w-full cursor-pointer"
            >
              Developers
              <ChevronDown
                size={18}
                className={`${showMobileDev ? "rotate-180" : ""}`}
              />
            </button>

            {showMobileDev && (
              <div className="mt-2 ml-2 border-l pl-3 space-y-3">
                <div className="max-h-44 overflow-y-auto no-scrollbar pr-2 space-y-1">
                  {builders.map((builder, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsOpen(false);
                        router.push(`/developers/${toSlug(builder)}`);
                      }}
                      className="block w-full text-left py-1 cursor-pointer"
                    >
                      {builder}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowMobileLoc(!showMobileLoc)}
              className="flex items-center justify-between w-full cursor-pointer"
            >
              Locations
              <ChevronDown
                size={18}
                className={`${showMobileLoc ? "rotate-180" : ""}`}
              />
            </button>

            {showMobileLoc && (
              <div className="mt-2 ml-2 border-l pl-3 space-y-2">
                {locations.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/locations/${toSlug(item.city)}`);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-darkgray cursor-pointer"
                  >
                    {item.city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact" className="cursor-pointer" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}
