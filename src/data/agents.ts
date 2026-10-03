import { unsplash, type ImageAsset } from "@/lib/images";

export type Agent = {
  id: string;
  name: string;
  role: string;
  photo: ImageAsset;
  bio: string;
  phone: string;
  email: string;
  socials: { label: string; href: string }[];
};

export const AGENTS: Agent[] = [
  {
    id: "daniel-morgan",
    name: "Daniel Morgan",
    role: "Managing Director",
    photo: unsplash("1560250097-0b93528c311a", "Portrait of Daniel Morgan, Managing Director"),
    bio: "Two decades guiding families and funds through high-value acquisitions across Texas and the West Coast.",
    phone: "(555) 246-7890",
    email: "daniel@horizonproperties.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Email", href: "mailto:daniel@horizonproperties.com" },
    ],
  },
  {
    id: "olivia-carter",
    name: "Olivia Carter",
    role: "Luxury Property Advisor",
    photo: unsplash("1573496359142-b8d87734a5a2", "Portrait of Olivia Carter, Luxury Property Advisor"),
    bio: "Specialises in architectural and waterfront homes, with an eye for detail buyers remember long after the viewing.",
    phone: "(555) 246-7891",
    email: "olivia@horizonproperties.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Email", href: "mailto:olivia@horizonproperties.com" },
    ],
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "Investment Consultant",
    photo: unsplash("1519085360753-af0119f7cbe7", "Portrait of James Wilson, Investment Consultant"),
    bio: "Models yield, holding costs and exit strategy so every purchase is a considered investment, not a guess.",
    phone: "(555) 246-7892",
    email: "james@horizonproperties.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Email", href: "mailto:james@horizonproperties.com" },
    ],
  },
  {
    id: "sophia-bennett",
    name: "Sophia Bennett",
    role: "Senior Property Specialist",
    photo: unsplash("1580489944761-15a19d654956", "Portrait of Sophia Bennett, Senior Property Specialist"),
    bio: "Handles viewings, negotiation and closing with a calm, transparent process from first call to keys.",
    phone: "(555) 246-7893",
    email: "sophia@horizonproperties.com",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Email", href: "mailto:sophia@horizonproperties.com" },
    ],
  },
];

export function getAgent(id: string) {
  return AGENTS.find((agent) => agent.id === id) ?? AGENTS[0];
}
