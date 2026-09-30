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
];
