import { Code2, AppWindow, Palette, Plug, LifeBuoy, Gauge, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  ideal: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    short: "Fast, responsive business websites that look premium and convert visitors.",
    description:
      "Modern marketing sites, landing pages and portfolios built with clean code, strong SEO foundations and a design that matches your brand.",
    includes: ["Custom responsive design", "SEO-ready semantic markup", "Contact forms & WhatsApp integration", "Analytics-ready setup", "Deployment on fast hosting"],
    ideal: "Startups, local businesses, freelancers and professionals who need a credible online presence.",
    icon: Code2,
  },
  {
    slug: "web-app-development",
    title: "Web App Development",
    short: "Dashboards, portals and custom tools tailored to how your business works.",
    description:
      "Full-stack web applications with authentication, databases and admin panels, built to be reliable today and scalable tomorrow.",
    includes: ["User authentication & roles", "Database design & management", "Admin dashboards & reports", "Third-party integrations", "Secure, scalable architecture"],
    ideal: "Businesses replacing spreadsheets or manual processes with a custom internal or customer-facing tool.",
    icon: AppWindow,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short: "Interfaces that feel effortless, with clear journeys and a polished look.",
    description:
      "User-centred design for websites and apps: wireframes, high-fidelity screens and a consistent design system your developers can build from.",
    includes: ["User flows & wireframes", "High-fidelity mockups", "Design system & components", "Mobile-first layouts", "Accessibility-minded contrast and typography"],
    ideal: "Teams with an idea but no design, or products whose current interface confuses users.",
    icon: Palette,
  },
  {
    slug: "api-development-integration",
    title: "API Development & Integration",
    short: "Clean, secure APIs and integrations that connect your tools together.",
    description:
      "Well-documented REST APIs and integrations with payment gateways, email, messaging and other third-party services.",
    includes: ["REST API design & implementation", "Input validation & error handling", "Authentication & rate limiting", "Payment, email & messaging integrations", "API documentation"],
    ideal: "Products that need a backend, or businesses wanting their existing tools to talk to each other.",
    icon: Plug,
  },
  {
    slug: "website-maintenance-support",
    title: "Website Maintenance & Support",
    short: "Keep your site secure, updated and running smoothly after launch.",
    description:
      "Ongoing care for your website or app: updates, bug fixes, small improvements and a reliable person to call when something breaks.",
    includes: ["Content & feature updates", "Bug fixes", "Dependency & security updates", "Backups and uptime checks", "Priority support over WhatsApp"],
    ideal: "Business owners who want a site that just works, without managing the technical side.",
    icon: LifeBuoy,
  },
  {
    slug: "seo-performance-optimization",
    title: "SEO & Performance Optimization",
    short: "Load faster, rank better and keep visitors from bouncing.",
    description:
      "Technical SEO and speed work for existing sites: image and code optimization, Core Web Vitals, metadata and structured data.",
    includes: ["Performance audit & fixes", "Core Web Vitals improvements", "Meta tags, Open Graph & sitemap", "Image & asset optimization", "On-page SEO recommendations"],
    ideal: "Sites that feel slow or struggle to show up in search results.",
    icon: Gauge,
  },
];
