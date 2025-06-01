
export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  navItems: NavItem[];
  founderSocialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Post My Property",
  description: "The easiest way to list and find properties. Affordability, Simplicity, and Accessibility.",
  url: "https://postmyproperty.example.com", // Replace with actual URL
  ogImage: "https://postmyproperty.example.com/og.png", // Replace with actual OG image
  navItems: [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "Status", href: "/status" },
    { title: "About", href: "/about" },
  ],
  founderSocialLinks: {
    twitter: "https://twitter.com/johndoe_pmp",
    github: "https://github.com/johndoe-pmp",
    linkedin: "https://linkedin.com/in/johndoe-pmp",
  },
};
