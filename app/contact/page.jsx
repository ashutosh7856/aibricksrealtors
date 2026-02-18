import { contactFaqs } from "@/data/faq";
import ComingSoon from "@/src/ComingSoon";
import CompanyDetails from "@/src/Contact/CompanyDetails";
import ContactPage from "@/src/Contact/ContactPage";
import FAQSection from "@/src/FAQSection";
import React from "react";

const PageContact = () => {
  return (
    <div>
      {/* <ComingSoon /> */}
      <CompanyDetails />
      <ContactPage />
      <FAQSection title="Frequently Asked Questions" faqs={contactFaqs} />
    </div>
  );
};

export default PageContact;
