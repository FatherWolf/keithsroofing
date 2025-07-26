// src/components/StructuredData.tsx
import React from 'react';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Business structured data for Keith's Roofing
export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Keith's Roofing Arkansas",
  "image": "https://keithsroofing.com/logo.png",
  "description": "Expert roofing contractor in Arkansas specializing in custom installations, repairs, and inspections. Licensed, insured roofing company serving Central Arkansas.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Arkansas",
    "addressRegion": "AR",
    "addressCountry": "US"
  },
  "telephone": "501-922-4663",
  "url": "https://keithsroofing.com",
  "serviceArea": {
    "@type": "State",
    "name": "Arkansas"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Roofing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Roof Installation",
          "description": "Professional custom roof installation for new construction and roof replacement"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Roof Repair & Restoration",
          "description": "Expert roof repair and restoration services for storm damage and wear"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Annual Roof Inspections",
          "description": "Comprehensive 10-point roof inspections to prevent costly repairs"
        }
      }
    ]
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150"
  }
};

// Service page structured data
export const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Roofing Services",
  "provider": {
    "@type": "RoofingContractor",
    "name": "Keith's Roofing Arkansas"
  },
  "areaServed": {
    "@type": "State", 
    "name": "Arkansas"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Professional Roofing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Installation",
          "description": "Professional roof installation combining durability with striking curb appeal"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Restorations & Repairs",
          "description": "Roof restoration and repair services for storm damage, age, and wear"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Annual Inspections",
          "description": "Free 10-point roof inspection to keep your roof in peak condition"
        }
      }
    ]
  }
};