
export const siteConfig = {
  name: "KarmaMatch",
  description: "AI-Powered Resume Scanner and Job Matcher to find your destined career path.",
  url: "https://karmamatch.example.com", // Replace with your actual URL
  ogImage: "https://karmamatch.example.com/og.jpg", // Replace with your actual OG image URL
  links: {
    github: "https://github.com/example/karmamatch", // Replace with your repo
  },
  navLinks: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ],
  authLinks: [
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
  ],
  footerLinks: [
    {
      title: "Company",
      links: [
        { href: "#about", label: "About Us" },
        { href: "#contact", label: "Contact Us" },
        { href: "#", label: "Careers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", label: "Blog" },
        { href: "#features", label: "Features Guide" },
        { href: "#", label: "Help Center" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "#", label: "Terms of Service" },
        { href: "#", label: "Privacy Policy" },
      ],
    },
  ],
  socialLinks: [
    { href: "#", label: "Facebook", iconName: "Facebook" }, // Lucide has 'Facebook'
    { href: "#", label: "Twitter", iconName: "Twitter" }, // Lucide has 'Twitter'
    { href: "#", label: "Instagram", iconName: "Instagram" }, // Lucide has 'Instagram'
    { href: "#", label: "LinkedIn", iconName: "Linkedin" }, // Lucide has 'Linkedin'
  ],
};

export type SiteConfig = typeof siteConfig;
