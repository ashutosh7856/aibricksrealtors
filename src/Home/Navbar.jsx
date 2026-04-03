// "use client";

// import { useEffect, useState } from "react";
// import { Menu, X, User } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function Navbar({ onLoginClick }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [user, setUser] = useState(null);

//   const router = useRouter();

//   //  Check login on load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   //  Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     router.push("/");
//   };

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (!e.target.closest(".user-dropdown")) {
//         setShowDropdown(false);
//       }
//     }

//     if (showDropdown) {
//       document.addEventListener("click", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [showDropdown]);

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 w-full bg-[var(--color-brickred)] shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           {/* LOGO */}
//           <div className="text-2xl font-bold text-[var(--color-ochre)]">
//             <a href="/">AI BRICKS</a>
//           </div>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center gap-8">
//             <a
//               href="/"
//               className="text-[var(--color-lightcream)] font-sans hover:text-[var(--color-ochre)] transition-colors"
//             >
//               HOME
//             </a>
//             <a
//               href="/about"
//               className="text-[var(--color-lightcream)] font-sans hover:text-[var(--color-ochre)] transition-colors"
//             >
//               ABOUT
//             </a>
//             <a
//               href="/properties"
//               className="text-[var(--color-lightcream)] font-sans hover:text-[var(--color-ochre)] transition-colors"
//             >
//               PROPERTIES
//             </a>
//             <a
//               href="/contact"
//               className="text-[var(--color-lightcream)] font-sans hover:text-[var(--color-ochre)] transition-colors"
//             >
//               CONTACT
//             </a>

//             {/* LOGIN / USER */}
//             {user ? (
//               <div
//                 className="relative"
//                 // onMouseEnter={() => setShowDropdown(true)}
//                 // onMouseLeave={() => setShowDropdown(false)}
//               >
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="flex items-center gap-2 text-white bg-ochre p-2 rounded-full"
//                 >
//                   <User size={24} />
//                 </button>

//                 {showDropdown && (
//                   <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border">
//                     <button
//                       onClick={() => {
//                         setShowDropdown(false);
//                         router.push("/dashboard");
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowDropdown(false);
//                         handleLogout();
//                       }}
//                       className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={onLoginClick}
//                 className="ml-4 bg-[var(--color-ochre)] text-[var(--color-darkgray)] px-5 py-2 rounded-full font-sans font-semibold hover:bg-[var(--color-brickred)] hover:border-2 hover:border-[var(--color-lightcream)] hover:text-[var(--color-lightcream)] transition-all"
//               >
//                 LOGIN
//               </button>
//             )}
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={26} />
//           </button>
//         </div>
//       </nav>

//       {/* MOBILE DRAWER */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transition-transform ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between p-5 border-b">
//           <span className="font-semibold">Menu</span>
//           <X onClick={() => setIsOpen(false)} />
//         </div>

//         <div className="flex flex-col p-6 gap-4 text-md">
//           <a href="/">Home</a>
//           <a href="/about">About</a>
//           <a href="/properties">Properties</a>
//           <a href="/contact">Contact</a>

//           {user ? (
//             <>
//               <button
//                 className="bg-ochre p-2 text-left text-md"
//                 onClick={() => router.push("/dashboard")}
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="text-lightcream bg-red-800 text-left p-2 text-lg font-semibold"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={onLoginClick}
//               className="bg-brickred text-white py-2 rounded"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { Menu, X, User, ChevronDown } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function Navbar({ onLoginClick }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showDevDropdown, setShowDevDropdown] = useState(false);
//   const [user, setUser] = useState(null);
//   const [builders, setBuilders] = useState([]);

//   const router = useRouter();

//   // ✅ Fetch unique builder names
//   useEffect(() => {
//     async function fetchBuilders() {
//       try {
//         const res = await fetch("http://localhost:3000/api/v1/properties");
//         const data = await res.json();

//         const uniqueBuilders = [
//           ...new Set(
//             data.data?.map((item) => item.builderName?.trim()).filter(Boolean),
//           ),
//         ];

//         setBuilders(uniqueBuilders);
//       } catch (err) {
//         console.error("Builder fetch error:", err);
//       }
//     }

//     fetchBuilders();
//   }, []);

//   // ✅ Check login
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // ✅ Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     router.push("/");
//   };

//   // ✅ Convert name → slug
//   const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 w-full bg-[var(--color-brickred)] shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//           {/* LOGO */}
//           <div className="text-2xl font-bold text-[var(--color-ochre)]">
//             <a href="/">AI BRICKS</a>
//           </div>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center gap-8">
//             <a href="/" className="nav-link">
//               HOME
//             </a>
//             <a href="/about" className="nav-link">
//               ABOUT
//             </a>
//             <a href="/properties" className="nav-link">
//               PROPERTIES
//             </a>

//             {/* ✅ DEVELOPERS DROPDOWN */}
//             {/* <div
//               className="relative"
//               onMouseEnter={() => setShowDevDropdown(true)}
//               onMouseLeave={() => setShowDevDropdown(false)}
//             >
//               <button className="flex items-center gap-1 text-[var(--color-lightcream)] hover:text-[var(--color-ochre)]">
//                 DEVELOPERS <ChevronDown size={16} />
//               </button>

//               {showDevDropdown && (
//                 <div className="absolute top-full left-0 mt-3 w-64 max-h-80 overflow-y-auto bg-white rounded-lg shadow-lg border z-50">
//                   {builders.map((builder, i) => (
//                     <button
//                       key={i}
//                       onClick={() =>
//                         router.push(`/developers/${toSlug(builder)}`)
//                       }
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       {builder}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div> */}

//             <div
//               className="relative"
//               onMouseEnter={() => setShowDevDropdown(true)}
//               onMouseLeave={() => setShowDevDropdown(false)}
//             >
//               <button className="flex items-center gap-1 text-[var(--color-lightcream)] hover:text-[var(--color-ochre)]">
//                 DEVELOPERS <ChevronDown size={16} />
//               </button>

//               {/* ✅ HOVER BRIDGE (important) */}
//               {showDevDropdown && (
//                 <>
//                   {/* Invisible bridge to prevent gap issue */}
//                   <div className="absolute top-full left-0 w-full h-3"></div>

//                   {/* DROPDOWN */}
//                   <div className="absolute top-full left-0 w-64 max-h-80 overflow-y-auto bg-white rounded-lg shadow-lg border z-50">
//                     {builders.map((builder, i) => (
//                       <button
//                         key={i}
//                         onClick={() =>
//                           router.push(`/developers/${toSlug(builder)}`)
//                         }
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                       >
//                         {builder}
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>

//             <a href="/contact" className="nav-link">
//               CONTACT
//             </a>

//             {/* LOGIN / USER */}
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="flex items-center gap-2 text-white bg-ochre p-2 rounded-full"
//                 >
//                   <User size={24} />
//                 </button>

//                 {showDropdown && (
//                   <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border">
//                     <button
//                       onClick={() => {
//                         setShowDropdown(false);
//                         router.push("/dashboard");
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={onLoginClick}
//                 className="ml-4 bg-[var(--color-ochre)] text-[var(--color-darkgray)] px-5 py-2 rounded-full font-semibold"
//               >
//                 LOGIN
//               </button>
//             )}
//           </div>

//           {/* MOBILE BUTTON */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="md:hidden text-white"
//           >
//             <Menu size={26} />
//           </button>
//         </div>
//       </nav>

//       {/* MOBILE OVERLAY */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* MOBILE DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transition-transform ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between p-5 border-b">
//           <span className="font-semibold">Menu</span>
//           <X onClick={() => setIsOpen(false)} />
//         </div>

//         <div className="flex flex-col p-6 gap-4">
//           <a href="/">Home</a>
//           <a href="/about">About</a>
//           <a href="/properties">Properties</a>

//           {/* ✅ MOBILE DEVELOPERS */}
//           <div>
//             <p className="font-semibold mb-2">Developers</p>
//             <div className="max-h-60 overflow-y-auto">
//               {builders.map((builder, i) => (
//                 <button
//                   key={i}
//                   onClick={() => {
//                     setIsOpen(false);
//                     router.push(`/developers/${toSlug(builder)}`);
//                   }}
//                   className="block w-full text-left py-1 text-gray-700"
//                 >
//                   {builder}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <a href="/contact">Contact</a>

//           {user ? (
//             <>
//               <button onClick={() => router.push("/dashboard")}>
//                 Dashboard
//               </button>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <button onClick={onLoginClick}>Login</button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar({ onLoginClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDevDropdown, setShowDevDropdown] = useState(false);
  const [showMobileDev, setShowMobileDev] = useState(false);
  const [user, setUser] = useState(null);
  const [builders, setBuilders] = useState([]);

  const router = useRouter();

  // ✅ Fetch builders
  useEffect(() => {
    async function fetchBuilders() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/properties");
        const data = await res.json();

        const uniqueBuilders = [
          ...new Set(
            data.data?.map((item) => item.builderName?.trim()).filter(Boolean),
          ),
        ];

        setBuilders(uniqueBuilders);
      } catch (err) {
        console.error("Builder fetch error:", err);
      }
    }

    fetchBuilders();
  }, []);

  // ✅ Check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-[var(--color-brickred)] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          {/* LOGO */}
          <div className="text-2xl font-bold text-[var(--color-ochre)]">
            <a href="/">AI BRICKS</a>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-lightcream">
            <a href="/" className="nav-link">
              HOME
            </a>
            <a href="/about" className="nav-link">
              ABOUT
            </a>
            <a href="/properties" className="nav-link">
              PROPERTIES
            </a>

            {/* ✅ DEVELOPERS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setShowDevDropdown(true)}
              onMouseLeave={() => setShowDevDropdown(false)}
            >
              <button className="flex items-center gap-1 text-[var(--color-lightcream)] hover:text-[var(--color-ochre)]">
                DEVELOPERS <ChevronDown size={16} />
              </button>

              {showDevDropdown && (
                <>
                  {/* Hover bridge */}
                  <div className="absolute top-full left-0 w-full h-3"></div>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 w-64 max-h-80 overflow-y-auto bg-white rounded-lg shadow-lg border z-50 text-darkgray">
                    {builders.map((builder, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          router.push(`/developers/${toSlug(builder)}`)
                        }
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {builder}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <a href="/contact" className="nav-link">
              CONTACT
            </a>

            {/* USER */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-white bg-ochre p-2 rounded-full"
                >
                  <User size={24} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        router.push("/dashboard");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-darkgray"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="ml-4 bg-[var(--color-ochre)] text-[var(--color-darkgray)] px-5 py-2 rounded-full font-semibold"
              >
                LOGIN
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
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

        <div className="flex flex-col p-6 gap-4">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/properties">Properties</a>

          {/* ✅ MOBILE DEVELOPERS DROPDOWN */}
          <div>
            <button
              onClick={() => setShowMobileDev(!showMobileDev)}
              className="flex items-center justify-between w-full "
            >
              Developers
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  showMobileDev ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMobileDev && (
              <div className="mt-2 ml-2 max-h-60 overflow-y-auto border-l pl-3">
                {builders.map((builder, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsOpen(false);
                      setShowMobileDev(false);
                      router.push(`/developers/${toSlug(builder)}`);
                    }}
                    className="block w-full text-left py-1 text-gray-700 hover:text-[var(--color-ochre)]"
                  >
                    {builder}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="/contact">Contact</a>

          {user ? (
            <>
              <button onClick={() => router.push("/dashboard")}>
                Dashboard
              </button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-brickred py-3 text-lightcream"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
