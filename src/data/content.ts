import { unsplash } from "@/lib/images";

export const ABOUT_COPY = {
  eyebrow: "About Us",
  title: "Who We Are",
  body:
    "At Horizon Properties, we connect people with extraordinary homes and smart investments. Integrity, transparency, and client satisfaction are at the heart of everything we do.",
  cta: "Learn More",
  secondary:
    "Every listing we represent is inspected, documented and priced against real comparable evidence — so the number you see is the number we can defend.",
};

export const SERVICES = [
  {
    id: "luxury-sales",
    title: "Luxury Home Sales",
    text: "Discreet representation for architectural and waterfront homes, from first valuation to closing.",
    image: unsplash("1600585154340-be6161a56a0c", "Luxury home with pool at dusk"),
  },
  {
    id: "investment",
    title: "Property Investment",
    text: "Yield modelling, portfolio structuring and acquisition strategy for private and institutional buyers.",
    image: unsplash("1560518883-ce09059eeffa", "City skyline at blue hour"),
  },
  {
    id: "marketing",
    title: "Property Marketing",
    text: "Editorial photography, film and targeted campaigns that put a home in front of the right buyer.",
    image: unsplash("1600607687939-ce8a6c25118c", "Styled interior prepared for photography"),
  },
  {
    id: "advisory",
    title: "Real Estate Advisory",
    text: "Independent advice on timing, negotiation and structure — with no incentive to push a sale.",
    image: unsplash("1600566753086-00f18fb6b3ea", "Quiet meeting space with daylight"),
  },
  {
    id: "valuation",
    title: "Property Valuation",
    text: "Evidence-based appraisals across residential and mixed-use assets, delivered within five days.",
    image: unsplash("1600596542815-ffad4c1539a9", "Contemporary house exterior"),
  },
  {
    id: "relocation",
    title: "Relocation Services",
    text: "Neighbourhood research, school introductions and settling-in support for moves across states.",
    image: unsplash("1580587771525-78b9dba3b914", "Family home with mature landscaping"),
  },
];

export const REASONS = [
  {
    title: "Verified listings only",
    text: "Structural, legal and title checks are completed before a property reaches our books.",
  },
  {
    title: "One advisor, start to finish",
    text: "You keep the same specialist from the first viewing through to the keys in your hand.",
  },
  {
    title: "Transparent numbers",
    text: "Comparable evidence, fees and timelines in writing — no surprises after an offer.",
  },
  {
    title: "A genuinely local network",
    text: "Surveyors, notaries and contractors we have worked with for years, in every market we cover.",
  },
];

export const STATS = [
  { value: "1,240+", label: "Transactions completed" },
  { value: "18", label: "Years in the market" },
  { value: "97%", label: "Client satisfaction" },
  { value: "$2.1B", label: "Property represented" },
];

export const CTA_COPY = {
  title: "Ready to Find Your Perfect Property?",
  text: "Let our experts guide you to the right home or investment.",
  cta: "Get in Touch",
};

export const LANGUAGES = ["English", "Arabic", "Chinese", "Russian", "Portuguese", "Urdu"];
