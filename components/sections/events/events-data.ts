export interface MilestoneItem {
  id: string;
  month: string;
  fullMonth: string;
  title: string;
  image?: string;
  events: string[];
  achievements: string[];
}

export interface YearMilestones {
  year: number;
  label: string;
  description?: string;
  milestones: MilestoneItem[];
}

export const EVENTS_DATA: YearMilestones[] = [
  {
    year: 2023,
    label: "2023",
    description: "Foundations laid, initial competitions conquered, and foundational workshops launched.",
    milestones: [
      {
        id: "2023-jan",
        month: "JAN",
        fullMonth: "JANUARY",
        title: "Kickoff & General Assembly",
        image: "/assets/about-pics/carousel-1.png",
        events: [
          "Annual General Assembly: Welcomed aspiring tech enthusiasts and set goals for the academic year.",
          "Introductory workshops on Web Development fundamentals and UI/UX design.",
        ],
        achievements: [
          "Successfully onboarded over 150+ new active members.",
          "Established core developer tracks in Web, Game, and Competitive Programming.",
        ],
      },
      {
        id: "2023-feb",
        month: "FEB",
        fullMonth: "FEBRUARY",
        title: "Hackathon Bootcamp & Coding Sprints",
        image: "/assets/about-pics/carousel-2.png",
        events: [
          "Intensive 3-day internal Code Camp focusing on algorithm optimization and team collaboration.",
          "Guest tech talk featuring industry alumni software engineers.",
        ],
        achievements: [
          "Top 3 finish in the Regional Collegiate Inter-School Programming Challenge.",
          "Published 10+ student-led open-source project repositories.",
        ],
      },
      {
        id: "2023-nov",
        month: "NOV",
        fullMonth: "NOVEMBER",
        title: "CCS Tech Week & Competitive Arena",
        image: "/assets/about-pics/carousel-3.png",
        events: [
          "Co-organized College of Computer Studies Tech Fest with live coding battles and project exhibits.",
          "Hands-on masterclass on Cloud Infrastructure and Database management.",
        ],
        achievements: [
          "Champion in the CCS Intra-College Hackathon 2023.",
          "Awarded Most Outstanding Academic Student Organization in CCS.",
        ],
      },
      {
        id: "2023-dec",
        month: "DEC",
        fullMonth: "DECEMBER",
        title: "Year-End Showcase & Recognition",
        image: "/assets/about-pics/carousel-4.png",
        events: [
          "Project Dayshade Showcase & Annual Recognition Night.",
          "Community Outreach: Code & Connect program for high school students.",
        ],
        achievements: [
          "Over 25 completed software projects deployed live.",
          "Recognized with University Student Leadership Excellence.",
        ],
      },
    ],
  },
  {
    year: 2024,
    label: "2024",
    description: "Expansion, major university hackathons, industry partnerships, and competitive triumphs.",
    milestones: [
      {
        id: "2024-jan",
        month: "JAN",
        fullMonth: "JANUARY",
        title: "New Horizons & Advanced Tech Summit",
        image: "/assets/about-pics/carousel-5.png",
        events: [
          "AI & Machine Learning intensive workshop series.",
          "Open-source contribution drive and mentorship program for freshmen.",
        ],
        achievements: [
          "Over 200+ active participants across all technical tracks.",
          "Formed strategic partnerships with regional tech community networks.",
        ],
      },
      {
        id: "2024-mar",
        month: "MAR",
        fullMonth: "MARCH",
        title: "National Coding Summit",
        image: "/assets/about-pics/carousel-6.png",
        events: [
          "Participated in National Inter-Collegiate Coding Competition.",
          "Organized Game Jam 2024: 48-hour game development marathon.",
        ],
        achievements: [
          "1st Runner Up in National Web Engineering Battle.",
          "Best Gameplay & Graphics awards in Game Jam.",
        ],
      },
      {
        id: "2024-oct",
        month: "OCT",
        fullMonth: "OCTOBER",
        title: "DevCon & Industry Collaboration",
        image: "/assets/about-pics/carousel-7.jpg",
        events: [
          "PD x Industry Experts Panel: Tech career paths and mock technical interviews.",
          "Full-stack Next.js and Cloud deployment bootcamp.",
        ],
        achievements: [
          "95% certification completion rate for bootcamp participants.",
          "Multiple members secured summer engineering internships.",
        ],
      },
      {
        id: "2024-dec",
        month: "DEC",
        fullMonth: "DECEMBER",
        title: "Annual Tech Gala & Milestone Celebration",
        image: "/assets/about-pics/about-hero-img.png",
        events: [
          "Annual Gala: Celebrating 12 months of code, design, and innovation.",
          "Alumni Networking Summit and Project Exhibition.",
        ],
        achievements: [
          "Back-to-back Outstanding Tech Organization of the Year recognition.",
          "Successfully deployed the CCS Programmers' Den portal and leaderboard ecosystem.",
        ],
      },
    ],
  },
  {
    year: 2025,
    label: "2025",
    description: "Pioneering new standards, scalable systems, and continuous achievements.",
    milestones: [
      {
        id: "2025-jan",
        month: "JAN",
        fullMonth: "JANUARY",
        title: "Programmers' Den 2025 Launchpad",
        image: "/assets/about-pics/carousel-1.png",
        events: [
          "Official rollout of the unified Project Dayshade platform.",
          "Cross-discipline team formation for international hackathon circuits.",
        ],
        achievements: [
          "Record registration of 300+ students applying for specialized tracks.",
          "Launched new mobile and systems engineering specializations.",
        ],
      },
      {
        id: "2025-feb",
        month: "FEB",
        fullMonth: "FEBRUARY",
        title: "Regional Inter-University Hackathon",
        image: "/assets/about-pics/carousel-3.png",
        events: [
          "Represented TSU in Regional Collegiate Tech Olympiad.",
          "Hosted Cybersecurity & Ethical Hacking live capture-the-flag (CTF) tournament.",
        ],
        achievements: [
          "Overall Champions in CTF and 2nd Place in Full-Stack Web Development.",
          "Recognized with University Innovation Excellence Citation.",
        ],
      },
    ],
  },
  {
    year: 2026,
    label: "2026",
    description: "The journey continues — upcoming milestones and future endeavors.",
    milestones: [
      {
        id: "2026-jan",
        month: "JAN",
        fullMonth: "JANUARY",
        title: "Future Milestones",
        image: "/assets/about-pics/about-pd-logo-3.png",
        events: [
          "Upcoming Spring Innovation Sprint & AI Hackathon.",
          "Community expansion and national chapter development.",
        ],
        achievements: [
          "More events and achievements are yet to come!",
          "Stay tuned for groundbreaking projects and competitions.",
        ],
      },
    ],
  },
];
