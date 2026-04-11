// "use client";
// import { useRef } from "react";
// import { usePathname } from "next/navigation";
// import Navbar from "@/src/Home/Navbar";
// import Footer from "@/src/Footer";
// import ClientLayout from "@/src/ClientLayout";
// import AuthModalController from "@/src/Auth/AuthModalController";

// export default function ConditionalLayout({ children }) {
//   const pathname = usePathname();
//   const isAdminRoute = pathname?.startsWith("/admin");
//   const authModalRef = useRef(null);

//   // Don't render website Navbar/Footer for admin routes
//   if (isAdminRoute) {
//     return <>{children}</>;
//   }

//   // Render normal website layout with Navbar and Footer
//   return (
//     <ClientLayout>
//       <Navbar onLoginClick={() => authModalRef.current?.openLogin()} />
//       <AuthModalController ref={authModalRef} />
//       {children}
//       <Footer />
//     </ClientLayout>
//   );
// }

"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/src/Home/Navbar";
import Footer from "@/src/Footer";
import ClientLayout from "@/src/ClientLayout";
import AuthModalController from "@/src/Auth/AuthModalController";
import StickySectionNav from "./Developers/StickySectionNav";
import PropertySectionNav from "./Properties/PropertySectionNav";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // ✅ NEW CONDITION
  const isDeveloperPage =
    pathname === "/developers" || pathname?.startsWith("/developers/");

  const isPropertyPage = pathname.startsWith("/properties/");

  const authModalRef = useRef(null);

  // ❌ No layout for admin
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <ClientLayout>
      {/* ✅ SWITCH NAVBAR HERE */}
      {/* {isDeveloperPage ? (
        <StickySectionNav />
      ) : (
        <Navbar onLoginClick={() => authModalRef.current?.openLogin()} />
      )} */}
      {isPropertyPage ? (
        <PropertySectionNav />
      ) : isDeveloperPage ? (
        <StickySectionNav />
      ) : (
        <Navbar onLoginClick={() => authModalRef.current?.openLogin()} />
      )}

      <AuthModalController ref={authModalRef} />

      {children}

      <Footer />
    </ClientLayout>
  );
}
