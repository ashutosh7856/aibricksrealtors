"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function Cta() {
  const [open, setOpen] = useState(false);

  const INITIAL_FORM = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔹 Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      setFormData({ ...formData, phone: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // 🔹 Validation (same standard as Contact page)
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit (same API as Contact page)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.name.split(" ")[0] || formData.name,
          lastName: formData.name.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit enquiry");
      }

      setSuccess(true);
      setFormData(INITIAL_FORM);

      setTimeout(() => {
        setSuccess(false);
        setOpen(false);
      }, 2500);
    } catch (err) {
      setErrors({ submit: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CTA Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/home/cta-banner-3.jpg"
          alt="AI Bricks Background"
          fill
          priority
          className="object-cover brightness-[0.55]"
        />

        <div className="relative z-10 max-w-4xl px-4 text-white flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl mb-4"
          >
            Live The Future
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-8"
          >
            AI BRICKS
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold font-serif mb-8"
          >
            Hunt For Properties
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 bg-[var(--color-brickred)] text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-2xl shadow-lg hover:bg-[var(--color-ochre)]"
          >
            Connect With Us
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </section>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 pt-20"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X size={22} />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-6">
                Tell us what kind of property you’re looking for.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brickred)]"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brickred)]"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brickred)]"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Property Requirements"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[var(--color-brickred)]"
                />

                {errors.submit && (
                  <p className="text-sm text-red-500">{errors.submit}</p>
                )}

                {success && (
                  <p className="text-sm text-green-600">
                    Thanks! We’ll contact you shortly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--color-brickred)] text-white py-3 rounded-xl font-semibold hover:bg-[var(--color-ochre)] transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
