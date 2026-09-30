import type { Experience, VoyageCategory } from "@/types";

export const voyageCategories: Record<VoyageCategory, {
  label: string;
  marker?: "compass" | "users" | "book" | "flag";
  direction: "left" | "right";
}> = {
  leadership: { label: "LEADERSHIP VOYAGE", marker: "compass", direction: "left" },
  community: { label: "COMMUNITY VOYAGE", marker: "users", direction: "right" },
  academic: { label: "ACADEMIC VOYAGE", marker: "book", direction: "left" },
  personal: { label: "PERSONAL QUEST", marker: "flag", direction: "left" },
};





export const experiences: Experience[] = [
  {
    id: "senior-scholarship-mentor",
    caption: "Supporting and guiding students throughout their academic journey with greater mentoring responsibility.",
    title: "Senior Scholarship Mentor",
    category: "leadership",
    organization: "BINUS University",
    period: "2025/2026 Even Semester",
    image: "/assets/experiences/Senior_Scholarship_Mentor.jpeg",
    imageAlt: "Senior Scholarship Mentor at BINUS University",
    scholarship: "Scholarship role · 16 SKS tuition scholarship",
    description: [
      "Guide and support university students throughout their academic journey and campus-related challenges.",
      "Continue the mentoring journey with greater responsibility after serving as a Scholarship Mentor.",
      "Develop leadership, communication, mentoring, and interpersonal skills through direct student guidance.",
    ],
    tags: ["LEADERSHIP", "MENTORING", "COMMUNICATION", "STUDENT SUPPORT"],
  },
  {
    id: "scholarship-mentor",
    caption: "Guiding students through their academic journey and university life.",
    title: "Scholarship Mentor",
    category: "leadership",
    organization: "BINUS University",
    period: "2025/2026 Odd Semester",
    image: "/assets/experiences/Scholarship_Mentor.jpeg",
    imageAlt: "Scholarship Mentor at BINUS University",
    scholarship: "Scholarship role · 16 SKS tuition scholarship",
    description: [
      "Guide university students as they adapt to academic responsibilities and university life.",
      "Maintain communication with mentees and provide guidance when needed.",
      "Build mentoring, communication, responsibility, and interpersonal skills.",
    ],
    tags: ["MENTORING", "COMMUNICATION", "RESPONSIBILITY", "STUDENT SUPPORT"],
  },
  {
    id: "freshmen-leader-b29",
    caption: "Guiding new students through their introduction to campus life.",
    title: "Freshmen Leader — B29",
    category: "leadership",
    organization: "BINUS University",
    period: "August 2025",
    image: "/assets/experiences/Freshmen_Leader.jpeg",
    imageAlt: "Freshmen Leader B29 at BINUS University",
    description: [
      "Guided incoming B29 students during their introduction to university life and campus orientation.",
      "Helped freshmen understand the campus environment, university activities, and their transition into university.",
      "Developed leadership, communication, coordination, and student engagement skills.",
    ],
    tags: ["LEADERSHIP", "STUDENT ORIENTATION", "COMMUNICATION", "COORDINATION"],
  },
  {
    id: "freshmen-partner-b29",
    caption: "Accompanying and supporting freshmen throughout their first year of university.",
    image: "/assets/experiences/Freshmen_Partner.jpeg",
    imageAlt: "Freshmen Partner supporting B29 freshmen at BINUS University",
    title: "Freshmen Partner — B29",
    category: "leadership",
    organization: "BINUS University",
    period: "2025 — 2026",
    description: [
      "Accompanied and supported B29 freshmen throughout their first year, beyond the initial orientation period.",
      "Maintained engagement and communication to help freshmen adapt to university life.",
      "Participated with freshmen in a planting/community activity as part of the university's community engagement program.",
    ],
    tags: ["MENTORING", "STUDENT SUPPORT", "COMMUNITY ENGAGEMENT", "TEAMWORK"],
  },
  {
    id: "bncc-event-organizer",
    image: "/assets/experiences/BNCC_EEO.jpeg",
    imageAlt: "BNCC Event Organizer team activity",
    caption: "Contributing to the planning, coordination, and execution of technology-focused organizational events.",
    title: "BNCC Activist — Event Organizer",
    category: "community",
    organization: "Bina Nusantara Computer Club (BNCC)",
    division: "Event Organizer / EEO",
    period: "2025/2026",
    description: [
      "Contributed as an activist/member of BNCC in the Event Organizer / EEO division.",
      "Supported the planning, preparation, coordination, and execution of organizational events.",
      "Collaborated with other members and committees during event activities.",
    ],
    tags: ["EVENT ORGANIZING", "TEAMWORK", "ORGANIZATION", "COORDINATION"],
  },
];
