"use client";

import React from "react";
import ContactForm from "@/components/contact-form";
import { Metadata } from "next";

// Note: Since this is a client component, metadata should be handled in layout.tsx or parent component
// For now, we'll add SEO via document head manipulation

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need medical consultation? 
            Our team is here to help you with all your healthcare needs.
          </p>
        </div>
        
        <ContactForm />
      </div>
    </div>
  );
}
