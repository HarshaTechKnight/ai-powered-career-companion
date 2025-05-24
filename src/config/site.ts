export const siteConfig = {
  name: "KarmaMatch",
  description: "AI-Powered Resume Scanner and Job Matcher to find your destined career path.",
  url: "https://karmamatch.example.com", // Replace with your actual URL
  ogImage: "https://karmamatch.example.com/og.jpg", // Replace with your actual OG image URL
  links: {
    github: "https://github.com/example/karmamatch", // Replace with your repo
  },
  navLinks: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/resume-scanner", label: "Resume Scanner" },
    { href: "/job-matcher", label: "Job Matcher" },
  ],
  authLinks: [
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
  ]
};

export type SiteConfig = typeof siteConfig;
