import React from "react";
import { siteConfig } from "@/config/site";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": "https://thebuildcompany.in/#organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: "https://thebuildcompany.in",
    logo: "https://thebuildcompany.in/logo.png",
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Anna Nagar / OMR",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600040",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0827,
      longitude: 80.2707,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "₹1,899/sqft - ₹2,599/sqft",
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: `${area}, Chennai`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Turnkey House Construction Packages",
      itemListElement: siteConfig.packages.map((pkg, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${pkg.name} Construction Package`,
          description: pkg.tagline,
        },
        price: pkg.pricePerSqft,
        priceCurrency: "INR",
        unitText: "SQFT",
        position: idx + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://thebuildcompany.in/#website",
    url: "https://thebuildcompany.in",
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `https://thebuildcompany.in${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  serviceType = "House Construction",
}: {
  name: string;
  description: string;
  serviceType?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    provider: {
      "@type": "GeneralContractor",
      name: siteConfig.name,
      url: "https://thebuildcompany.in",
    },
    areaServed: {
      "@type": "City",
      name: "Chennai, Tamil Nadu",
    },
    description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
