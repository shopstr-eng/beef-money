import Head from "next/head";
import { useRouter } from "next/router";
import { safeJsonLdString } from "@/utils/safe-json-ld";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Beef.Money",
  url: "https://beef.money",
  logo: "https://beef.money/beef-initiative-icon.png",
  description:
    "Beef.Money is a decentralized, permissionless marketplace connecting local ranchers directly with consumers. Zero platform fees, direct payments via Bitcoin and traditional methods.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@beef.money",
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [
    "https://github.com/shopstr-eng/milk-market",
    "https://x.com/beefinitiative",
    "https://www.youtube.com/@beefinitiative",
    "https://www.instagram.com/beefinitiative/",
  ],
  founder: {
    "@type": "Person",
    name: "Beef.Money Team",
    description:
      "Advocates for food sovereignty and direct farm-to-consumer commerce, with expertise in decentralized marketplace technology and beef supply chains.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Beef.Money",
  url: "https://beef.money",
  logo: "https://beef.money/beef-initiative-icon.png",
  image: "https://beef.money/beef-initiative-icon.png",
  description:
    "Rancher-direct beef marketplace connecting local ranchers with buyers. Browse grass-fed beef, pasture-raised cuts, and more from trusted local producers with zero platform fees.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I buy beef directly from a rancher?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Beef.Money connects you directly with ranchers who sell their beef without middlemen. You arrange the transaction directly with the rancher — no platform cuts, no corporate intermediaries.",
      },
    },
    {
      "@type": "Question",
      name: "How do I pay the rancher?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You pay the rancher directly using whatever method you both agree on — Bitcoin, cash, or other digital payment methods. There are no mandatory platform fees. Ranchers may choose to set an optional donation rate to help support the site, but that's entirely up to them.",
      },
    },
    {
      "@type": "Question",
      name: "Is my information private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All your data is encrypted and private. We never share user data with third parties or regulators. Our platform is built on Nostr, a decentralized protocol that prioritizes privacy.",
      },
    },
    {
      "@type": "Question",
      name: "What kinds of beef can I buy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That depends on the rancher you choose. Many offer whole or half cows, individual cuts, ground beef, organ meats, and more — all pasture-raised and grass-fed. You can ask your rancher directly about their practices.",
      },
    },
    {
      "@type": "Question",
      name: "I'm a rancher. How do I list my products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's free and takes just a few minutes. Click 'Sell Your Beef' in the navigation, create your profile, and start adding products. You set your own prices, pickup options, and payment methods.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Beef.Money",
  url: "https://beef.money",
  description:
    "Rancher-direct beef marketplace. Buy grass-fed beef and pasture-raised cuts direct from local ranchers with zero platform fees.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://beef.money/marketplace?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function StructuredData() {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isAboutPage = router.pathname === "/about";
  const isContactPage = router.pathname === "/contact";

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdString(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdString(websiteSchema),
        }}
      />
      {(isHomePage || isAboutPage || isContactPage) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      )}
      {isHomePage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLdString(homepageFaqSchema),
          }}
        />
      )}
    </Head>
  );
}
