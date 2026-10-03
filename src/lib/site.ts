export const SITE = {
  name: "Horizon Properties",
  wordmark: ["HORIZON", "PROPERTIES"],
  tagline: "Exceptional homes & investments.",
  description:
    "A boutique advisory connecting people with extraordinary homes and smart property investments in prime locations.",
  phone: "(555) 246-7890",
  phoneHref: "tel:+15552467890",
  email: "hello@horizonproperties.com",
  address: "1201 Meridian Avenue, Suite 400, Austin, TX 78701",
  hours: "Mon – Sat · 9:00 – 18:00 CT",
} as const;

export type NavLink = { label: string; to: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "About Us", to: "/#about" },
  { label: "Services", to: "/#services" },
  { label: "Team", to: "/#team" },
  { label: "Contact", to: "/#contact" },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Pinterest", href: "https://www.pinterest.com/" },
] as const;
