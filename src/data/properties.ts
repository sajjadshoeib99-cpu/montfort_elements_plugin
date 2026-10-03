import { unsplash, local, type ImageAsset } from "@/lib/images";

import lakeside from "@/assets/property-lakeside.jpg";
import heroImage from "@/assets/hero.jpg";
import aboutImage from "@/assets/about.jpg";

export type PropertyType = "Villa" | "Residence" | "Estate" | "House" | "Penthouse";

export type Property = {
  id: string;
  slug: string;
  name: string;
  city: string;
  region: string;
  country: string;
  price: number;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  year: number;
  featured: boolean;
  summary: string;
  description: string;
  features: string[];
  amenities: string[];
  images: ImageAsset[];
  agentId: string;
};

export const PROPERTIES: Property[] = [
  {
    id: "p-01",
    slug: "lakeside-modern-villa",
    name: "Lakeside Modern Villa",
    city: "Austin",
    region: "Texas",
    country: "USA",
    price: 2_350_000,
    type: "Villa",
    beds: 5,
    baths: 5,
    sqft: 5420,
    year: 2021,
    featured: true,
    summary: "A glass-walled villa opening onto a mirror-still pool and the lake beyond.",
    description:
      "Set on a quiet stretch of shoreline, Lakeside Modern Villa is built around light and water. Floor-to-ceiling glazing pulls the lake into every living space, while a cantilevered terrace and infinity pool extend the house into the landscape. The primary wing occupies its own floor, with a spa bathroom, dressing room and private terrace framing the sunrise.",
    features: [
      "Infinity pool with lake frontage",
      "Double-height living room",
      "Chef's kitchen with island",
      "Primary suite with private terrace",
      "Home cinema and wine room",
      "Four-car garage",
    ],
    amenities: [
      "Smart home automation",
      "Radiant heated floors",
      "Home gym",
      "Outdoor kitchen",
      "Guest house",
      "Gated entry",
    ],
    images: [
      local(lakeside, "Lakeside Modern Villa with pool at dusk"),
      unsplash("1600607687939-ce8a6c25118c", "Open plan living room with garden views"),
      unsplash("1600210492486-724fe5c67fb0", "Living area with floor to ceiling windows"),
      unsplash("1615529182904-14819c35db37", "Serene bedroom with neutral palette"),
    ],
    agentId: "olivia-carter",
  },
  {
    id: "p-02",
    slug: "pacific-glass-house",
    name: "Pacific Glass House",
    city: "Malibu",
    region: "California",
    country: "USA",
    price: 4_800_000,
    type: "Residence",
    beds: 4,
    baths: 4,
    sqft: 4180,
    year: 2019,
    featured: true,
    summary: "Cliff-edge glass architecture suspended above the Pacific coastline.",
    description:
      "Pacific Glass House is an exercise in restraint: a single storey of steel and glass balanced on the bluff, with the ocean as its only decoration. Sliding walls disappear into the structure, turning the living room into an open-air terrace. A lower level holds the wellness suite, media room and a garage carved into the hillside.",
    features: [
      "Uninterrupted ocean views",
      "Disappearing glass walls",
      "Infinity edge pool",
      "Chef's kitchen with butler's pantry",
      "Wine cellar",
      "Private beach access",
    ],
    amenities: [
      "Solar power and battery storage",
      "Infrared sauna",
      "Outdoor shower",
      "Fire pit terrace",
      "Elevator",
      "24-hour security",
    ],
    images: [
      unsplash("1613490493576-7fde63acd811", "Modern glass villa lit at dusk"),
      unsplash("1600566753086-00f18fb6b3ea", "Minimal living room with soft daylight"),
      unsplash("1600607687920-4e2a09cf159d", "Stone bathroom with freestanding tub"),
      unsplash("1600573472592-401b489a3cdc", "Open kitchen with island seating"),
    ],
    agentId: "daniel-morgan",
  },
  {
    id: "p-03",
    slug: "desert-horizon-estate",
    name: "Desert Horizon Estate",
    city: "Scottsdale",
    region: "Arizona",
    country: "USA",
    price: 3_150_000,
    type: "Estate",
    beds: 5,
    baths: 4,
    sqft: 4860,
    year: 2022,
    featured: true,
    summary: "Low-slung desert modernism with mountain views from every room.",
    description:
      "A single-level estate arranged around a central courtyard, Desert Horizon blends rammed earth, travertine and bronze. Deep overhangs shade the interior through the day, and the pool terrace faces the McDowell range for sunset. A separate casita gives guests their own entrance and kitchenette.",
    features: [
      "Central courtyard with olive trees",
      "Negative-edge pool",
      "Casita with kitchenette",
      "Rammed earth feature walls",
      "Shaded outdoor dining",
      "Climate-controlled garage",
    ],
    amenities: [
      "Desert landscaping with drip irrigation",
      "Motorised shade screens",
      "Outdoor fireplace",
      "Yoga studio",
      "EV charging",
      "Full-house water filtration",
    ],
    images: [
      unsplash("1600596542815-ffad4c1539a9", "Desert estate exterior with pool at dusk"),
      unsplash("1600047509807-ba8f99d2cdde", "Warm minimal interior with timber floors"),
      unsplash("1615529182904-14819c35db37", "Bedroom with soft neutral textiles"),
      unsplash("1600121848594-d8644e57abab", "House exterior glowing at blue hour"),
    ],
    agentId: "james-wilson",
  },
  {
    id: "p-04",
    slug: "oceanfront-residence",
    name: "Oceanfront Residence",
    city: "Miami",
    region: "Florida",
    country: "USA",
    price: 5_200_000,
    type: "Residence",
    beds: 4,
    baths: 5,
    sqft: 4320,
    year: 2020,
    featured: true,
    summary: "Direct beachfront living with a rooftop terrace over Biscayne Bay.",
    description:
      "Oceanfront Residence pairs a calm, gallery-white interior with an unrivaled position on the sand. Terraces run the length of the main floor, and the rooftop adds a plunge pool, summer kitchen and lounge built for entertaining. Every principal room looks east to the water.",
    features: [
      "Direct beach access",
      "Rooftop plunge pool and lounge",
      "Summer kitchen",
      "Principal suite with dressing room",
      "Private elevator",
      "Impact-rated glazing",
    ],
    amenities: [
      "Concierge service",
      "Two-car garage plus valet",
      "Spa bathroom",
      "Storm-ready generator",
      "Pet-friendly beach",
      "Boat mooring nearby",
    ],
    images: [
      unsplash("1600585154340-be6161a56a0c", "Oceanfront residence with pool and palms"),
      unsplash("1502672260266-1c1ef2d93688", "Bright living room with white walls"),
      unsplash("1560448204-e02f11c3d0e2", "Contemporary living room with sea light"),
      unsplash("1600607688969-a5bfcd646154", "Minimal bathroom with stone vanity"),
    ],
    agentId: "sophia-bennett",
  },
  {
    id: "p-05",
    slug: "modern-hillside-retreat",
    name: "Modern Hillside Retreat",
    city: "Los Angeles",
    region: "California",
    country: "USA",
    price: 3_750_000,
    type: "Villa",
    beds: 4,
    baths: 4,
    sqft: 3980,
    year: 2023,
    featured: true,
    summary: "Stepped terraces and canyon views on a private hillside lot.",
    description:
      "Built into the slope, Modern Hillside Retreat steps down the canyon in three levels. The top floor is entirely primary suite; the middle holds living, kitchen and a terrace that runs the width of the house; the lower level opens to a pool deck and garden lounge. Oak, limestone and blackened steel keep the palette warm.",
    features: [
      "Three stepped levels",
      "Canyon and city views",
      "Oak and limestone interiors",
      "Pool deck with lounge",
      "Skylit staircase",
      "Two-car garage plus motor court",
    ],
    amenities: [
      "Outdoor shower",
      "Cold plunge",
      "Media room",
      "Vegetable garden",
      "Security cameras",
      "Guest parking",
    ],
    images: [
      unsplash("1605276374104-dee2a0ed3cd6", "Hillside modern home with terrace"),
      unsplash("1618221195710-dd6b41faaea6", "Warm modern living room"),
      unsplash("1600566753190-17f0baa2a6c3", "Bedroom with oak joinery"),
      unsplash("1600573472550-8090b5e0745e", "Bright kitchen with marble surfaces"),
    ],
    agentId: "olivia-carter",
  },
  {
    id: "p-06",
    slug: "palm-garden-residence",
    name: "Palm Garden Residence",
    city: "Beverly Hills",
    region: "California",
    country: "USA",
    price: 6_400_000,
    type: "Estate",
    beds: 6,
    baths: 7,
    sqft: 7240,
    year: 2018,
    featured: true,
    summary: "A gated estate of mature palms, formal gardens and generous entertaining rooms.",
    description:
      "Behind private gates on a palm-lined street, this estate offers scale without ceremony. Reception rooms flow to a loggia and lawn, and the lower level holds a screening room, wine gallery and wellness suite. Six bedroom suites include a principal wing with dual bathrooms and a study.",
    features: [
      "Gated motor court",
      "Formal and casual living rooms",
      "Screening room",
      "Wine gallery for 2,000 bottles",
      "Wellness suite with sauna",
      "Two-bedroom guest house",
    ],
    amenities: [
      "Full house staff kitchen",
      "Elevator to all floors",
      "Heated pool and spa",
      "Tennis court",
      "Rose garden",
      "Backup generator",
    ],
    images: [
      unsplash("1512917774080-9991f1c4c750", "Gated estate with manicured garden"),
      unsplash("1600585154084-4e5fe7c39198", "Formal living room with garden light"),
      unsplash("1600047509358-9dc75507daeb", "Elegant dining room interior"),
      unsplash("1512918728675-ed5a9ecdebfd", "Reading room with warm timber"),
    ],
    agentId: "daniel-morgan",
  },
  {
    id: "p-07",
    slug: "contemporary-lake-house",
    name: "Contemporary Lake House",
    city: "Lake Tahoe",
    region: "Nevada",
    country: "USA",
    price: 2_950_000,
    type: "House",
    beds: 4,
    baths: 3,
    sqft: 3460,
    year: 2021,
    featured: false,
    summary: "Timber, stone and glass on a private stretch of alpine shoreline.",
    description:
      "A four-season house built for both snow and summer: heated terraces, a bunk room, and a double-sided fireplace between the living room and the deck. The boat dock is a short walk through the pines, and floor-to-ceiling glass gives every room a view of the water.",
    features: [
      "Private dock and shoreline",
      "Double-sided fireplace",
      "Heated terrace and driveway",
      "Bunk room for guests",
      "Boot and ski room",
      "Detached two-car garage",
    ],
    amenities: [
      "Radiant floors throughout",
      "Outdoor hot tub",
      "Firepit deck",
      "Wine fridge",
      "Smart heating zones",
      "Storage for kayaks",
    ],
    images: [
      unsplash("1580587771525-78b9dba3b914", "Lake house exterior with timber cladding"),
      unsplash("1493809842364-78817add7ffb", "Cosy living room with tall windows"),
      unsplash("1502005229762-cf1b2da7c5d6", "Reading nook with soft seating"),
      unsplash("1522708323590-d24dbb6b0267", "Open plan interior with natural light"),
    ],
    agentId: "james-wilson",
  },
  {
    id: "p-08",
    slug: "architectural-downtown-penthouse",
    name: "Architectural Downtown Penthouse",
    city: "Austin",
    region: "Texas",
    country: "USA",
    price: 1_850_000,
    type: "Penthouse",
    beds: 3,
    baths: 3,
    sqft: 2680,
    year: 2022,
    featured: false,
    summary: "A full-floor penthouse with a wraparound terrace above downtown Austin.",
    description:
      "Occupying the top floor of a landmark tower, the penthouse is arranged so the skyline is always in view. A wraparound terrace connects living, dining and primary suite; interiors are quiet and precise, with integrated storage and a private lift lobby.",
    features: [
      "Full-floor layout",
      "Wraparound terrace",
      "Private lift lobby",
      "Integrated storage throughout",
      "Skyline-facing primary suite",
      "Two parking spaces",
    ],
    amenities: [
      "Building concierge",
      "Residents' pool and gym",
      "Guest suite in building",
      "Climate-controlled storage",
      "Pet spa",
      "Package room",
    ],
    images: [
      unsplash("1568605114967-8130f3a36994", "Penthouse interior with skyline views"),
      unsplash("1600607688969-a5bfcd646154", "Sleek bathroom with stone surfaces"),
      unsplash("1600210491369-e753d80a41f3", "Contemporary living space at dusk"),
      unsplash("1512918728675-ed5a9ecdebfd", "Warm timber reading room"),
    ],
    agentId: "sophia-bennett",
  },
];

export const PROPERTY_HERO = local(heroImage, "Modern villa at sunset with infinity pool");
export const ABOUT_IMAGE = local(aboutImage, "Contemporary multi-storey home with glass facade");

export function getPropertyBySlug(slug: string) {
  return PROPERTIES.find((property) => property.slug === slug);
}

export function getPropertyById(id: string) {
  return PROPERTIES.find((property) => property.id === id);
}

export function getSimilarProperties(property: Property, limit = 3) {
  const sameType = PROPERTIES.filter((item) => item.id !== property.id && item.type === property.type);
  const sameRegion = PROPERTIES.filter(
    (item) => item.id !== property.id && item.region === property.region && item.type !== property.type,
  );
  return [...sameType, ...sameRegion, ...PROPERTIES.filter((item) => item.id !== property.id)]
    .filter((item, index, list) => list.findIndex((entry) => entry.id === item.id) === index)
    .slice(0, limit);
}

export const PROPERTY_LOCATIONS = Array.from(
  new Set(PROPERTIES.map((property) => `${property.city}, ${property.region}`)),
).sort();

export const PROPERTY_TYPES: PropertyType[] = ["Villa", "Residence", "Estate", "House", "Penthouse"];

export const PRICE_BOUNDS = {
  min: Math.min(...PROPERTIES.map((property) => property.price)),
  max: Math.max(...PROPERTIES.map((property) => property.price)),
};
