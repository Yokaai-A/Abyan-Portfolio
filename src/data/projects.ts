import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ocean-craft",
    title: "S.S. CodeCraft Portfolio",
    description: "An interactive retro pixel-art nautical developer portfolio featuring roaming animated sprites, dynamic Web Audio visualizer, and custom sound synthesizer.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Web Audio API"],
    category: "Frontend",
    image: "/assets/projects/S.S_CodeCraft.png",
    featured: true,
    highlights: [
      "Custom 8-bit Web Audio synthesizer and procedural wave visualizer",
      "Interactive walking character with real-time dialogue and emotes",
      "Tailored pixel borders and scanline shader aesthetic"
    ],
    demoUrl: "https://abyan-portfolio-one.vercel.app",
    repoUrl: "https://github.com/Yokaai-A/My-Portofolio",
  },
  {
    id: "electus",
    title: "Electus: AI Applicant Tracking System",
    description:
      "A polished recruiting platform interface for reviewing candidates, exploring hiring analytics, and using AI-assisted CV tools. My contribution focused on the frontend experience and responsive UI.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Recharts", "Three.js"],
    category: "Frontend",
    image: "/assets/projects/Electus.png",
    highlights: [
      "Liquid Glass landing page with an animated WebGL visual",
      "Responsive dashboard and candidate management interface",
      "Analytics visualizations and CV workflow screens",
    ],
    repoUrl: "https://github.com/OlanIsm/Electus-PROJECT",
  },
  {
    id: "nexiera",
    title: "Nexiera: Campus Learning Marketplace",
    description:
      "A campus learning marketplace where students can find classes, bootcamps, and tutoring, while tutors can publish their own classes.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "NestJS", "PostgreSQL"],
    category: "Fullstack",
    image: "/assets/projects/Nexiera.png",
    demoUrl: "https://nexiera-frontend.vercel.app/",
    repoUrl: "https://github.com/Yokaai-A/Nexiera",
  },
  {
    id: "dresssense",
    title: "DressSense: Accessible Outfit Assistant",
    description:
      "A mobile app designed to help people with color blindness identify clothing colors and plan everyday outfits, with a digital wardrobe, local weather information, outfit inspiration, and a product catalog.",
    tags: ["Flutter", "Dart", "Laravel", "PHP", "Camera", "Geolocation"],
    category: "Fullstack",
    image: "/assets/projects/Dressense.png",
    repoUrl: "https://github.com/Yokaai-A/DressSense",
  },
  {
    id: "astral-terminal",
    title: "Astral Terminal: Honkai Star Retail",
    description:
      "A Honkai: Star Rail resource catalog featuring user authentication, inventory management, and an admin dashboard connected to a REST API.",
    tags: ["Flutter", "Dart", "Node.js", "Express", "MySQL"],
    category: "Mobile & Game",
    image: "/assets/projects/Astral_Terminal.png",
    repoUrl: "https://github.com/Yokaai-A/Honkai_Star_Retail_Project",
    highlights: [
      "Browse resources with detailed information",
      "User authentication and inventory management",
      "Admin dashboard for monitoring data",
    ],
  },
  {
    id: "picverse",
    title: "PicVerse: Digital Art Community",
    description:
      "A community platform for digital artists, featuring a gallery to explore artwork, an illustration submission form, and a community page for discussion.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    category: "Frontend",
    image: "/assets/projects/Picverse.png",
    repoUrl: "https://github.com/Yokaai-A/Picverse",
    demoUrl: "https://www.figma.com/design/zLDOSteYsBMcmvP8Kx4syM/PicVerse?node-id=0-1&t=SMtyAProcQ7pfYmu-1",
    demoLabel: "FIGMA DESIGN",
  },
  {
    id: "chipichapa-inventory",
    title: "ChipiChapa Inventory & POS",
    description:
      "A web-based inventory and point-of-sale app with role-based access, product and category management, a product catalog, shopping cart, and printable invoices.",
    tags: ["Laravel 12", "PHP", "Tailwind CSS", "Vite", "SQLite", "MySQL"],
    category: "Fullstack",
    image: "/assets/projects/ChipiChapa_Inventory.png",
    repoUrl: "https://github.com/Yokaai-A/ChipiChapa-Inventory",
  },
  {
    id: "world-university",
    title: "WorldUniversity: Country Explorer",
    description:
      "A responsive country explorer for students and curious learners, with searchable country data, filters by region, language, and independence status, detailed country insights, and direct Google Maps links.",
    tags: ["React", "JavaScript", "React Context API", "REST API", "CSS3"],
    category: "Frontend",
    image: "/assets/projects/WorldUniversity.png",
    repoUrl: "https://github.com/Yokaai-A/World-University",
  },
  {
    id: "simple-personal-notes",
    title: "Simple Personal Notes App",
    description:
      "A personal notes app with account registration and login, note creation and deletion, archive management, and dark and light themes. Notes are managed through the Dicoding Notes REST API.",
    tags: ["React", "Vite", "React Router", "REST API", "CSS"],
    category: "Frontend",
    image: "/assets/projects/Simple-Notes-app.png",
    repoUrl: "https://github.com/Yokaai-A/Simple-Personal-Notes-App",
  },
];
