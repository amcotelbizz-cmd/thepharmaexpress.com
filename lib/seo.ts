import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title = "thepharmaexpress - Premium ED Medications Online",
  description = "Buy premium erectile dysfunction medications online. FDA-approved Sildenafil, Tadalafil, and Vardenafil at affordable prices.",
  keywords = [],
  canonical,
  ogImage = "/images/thepharmaexpress-logo.png",
  noIndex = false,
}: SEOProps): Metadata {
  const baseKeywords = [
    "erectile dysfunction",
    "ED medication",
    "sildenafil",
    "tadalafil",
    "vardenafil",
    "online pharmacy",
    "men's health",
    "prescription medicine"
  ];

  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: canonical ? { canonical } : undefined,
  };
}

export const pageKeywords = {
  home: [
    "buy ED medication online",
    "erectile dysfunction treatment",
    "online ED pharmacy",
    "FDA approved ED drugs"
  ],
  products: [
    "ED medication prices",
    "buy sildenafil online",
    "tadalafil for sale",
    "vardenafil prescription"
  ],
  categories: [
    "ED medication categories",
    "types of ED drugs",
    "compare ED medications"
  ],
  contact: [
    "ED medication consultation",
    "online doctor consultation",
    "pharmacy contact",
    "medical support"
  ],
  about: [
    "online pharmacy",
    "ED treatment center",
    "medical professionals",
    "healthcare services"
  ]
};
