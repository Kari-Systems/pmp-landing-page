
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
    github: string;
    linkedin: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Post My Property",
  description: "The easiest way to list and find properties. Affordability, Simplicity, and Accessibility. A minimal, fast, affordable property listing app designed for Hyderabad.",
  url: "https://postmyproperty.example.com", // Replace with actual URL
  ogImage: "https://postmyproperty.example.com/og.png", // Replace with actual OG image
  navItems: [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "Status", href: "/status" },
    { title: "About", href: "/about" },
  ],
  founderSocialLinks: {
    github: "https://github.com/vamsee9",
    linkedin: "https://www.linkedin.com/in/vamsee9",
  },
};
