import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ocean-craft",
    title: "S.S. CodeCraft Portfolio",
    description: "An interactive retro pixel-art nautical developer portfolio featuring roaming animated sprites, dynamic Web Audio visualizer, and custom sound synthesizer.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Web Audio API", "Framer Motion"],
    category: "Frontend",
    featured: true,
    highlights: [
      "Custom 8-bit Web Audio synthesizer and procedural wave visualizer",
      "Interactive walking character with real-time dialogue and emotes",
      "Tailored pixel borders and scanline shader aesthetic"
    ],
    demoUrl: "https://abyan-dev.vercel.app",
    repoUrl: "https://github.com/Yokaai-A",
  },
  {
    id: "voyage-commerce",
    title: "Voyage E-Commerce Hub",
    description: "High-performance digital marketplace platform with real-time stock sync, Stripe payment gateway, and admin telemetry dashboard.",
    tags: ["React", "Next.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Stripe"],
    category: "Fullstack",
    featured: true,
    highlights: [
      "Optimized server-side rendering with sub-100ms response times",
      "Type-safe end-to-end queries with Prisma and server actions",
      "Comprehensive merchant inventory and invoice tracking"
    ],
    demoUrl: "#",
    repoUrl: "https://github.com/Yokaai-A",
  },
  {
    id: "nautical-task-compass",
    title: "Compass Task Navigator",
    description: "Gamified productivity and sprint management system structured like an RPG ship log with bounty boards, milestone anchors, and team chat.",
    tags: ["TypeScript", "React", "Node.js", "Socket.io", "Tailwind CSS"],
    category: "Fullstack",
    featured: false,
    highlights: [
      "Real-time multiplayer drag-and-drop kanban boards using WebSockets",
      "Role-based captain and crew permissions with audit logs",
      "Exportable sprint expedition logs in markdown and PDF"
    ],
    demoUrl: "#",
    repoUrl: "https://github.com/Yokaai-A",
  },
  {
    id: "pixel-game-arcade",
    title: "8-Bit Retro Wave Runner",
    description: "Browser arcade game featuring procedural obstacle generation, retro sound engine, high score leaderboard, and responsive virtual gamepad controls.",
    tags: ["HTML5 Canvas", "TypeScript", "Web Audio API", "CSS3"],
    category: "Mobile & Game",
    featured: false,
    highlights: [
      "Zero third-party game engine overhead running at smooth 60 FPS",
      "Procedural wave frequency calculation for dynamic obstacles",
      "Local storage & cloud leaderboard synchronization"
    ],
    demoUrl: "#",
    repoUrl: "https://github.com/Yokaai-A",
  },
  {
    id: "terminal-dev-tools",
    title: "CaptainCLI - Dev Command Station",
    description: "Cross-platform CLI tool for scaffolding opinionated fullstack repositories, managing environment secrets, and automated Docker staging deployments.",
    tags: ["Node.js", "TypeScript", "Commander.js", "Docker", "Bash"],
    category: "Tools & AI",
    featured: false,
    highlights: [
      "Interactive ASCII setup wizard with pixel art terminal badges",
      "Encrypted secret vault with multi-environment support",
      "One-command staging environment container deployment"
    ],
    demoUrl: "#",
    repoUrl: "https://github.com/Yokaai-A",
  },
];
