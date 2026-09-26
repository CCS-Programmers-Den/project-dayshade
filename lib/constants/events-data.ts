export type MonthCode =
  | "JAN"
  | "FEB"
  | "MAR"
  | "APR"
  | "MAY"
  | "JUN"
  | "JUL"
  | "AUG"
  | "SEP"
  | "OCT"
  | "NOV"
  | "DEC";

export const MONTH_NAMES: Record<MonthCode, string> = {
  JAN: "JANUARY",
  FEB: "FEBRUARY",
  MAR: "MARCH",
  APR: "APRIL",
  MAY: "MAY",
  JUN: "JUNE",
  JUL: "JULY",
  AUG: "AUGUST",
  SEP: "SEPTEMBER",
  OCT: "OCTOBER",
  NOV: "NOVEMBER",
  DEC: "DECEMBER",
};

export const ALL_MONTH_CODES: MonthCode[] = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export interface MilestoneItem {
  id?: string;
  month: MonthCode;
  fullMonth?: string;
  title?: string;
  image?: string;
  events?: string[];
  achievements?: string[];
}

export interface YearMilestones {
  year: number;
  label?: string;
  description?: string;
  milestones: MilestoneItem[];
}

/**
 * Checks if a milestone item has meaningful content.
 * A milestone is considered to have a value if it has at least one non-empty event or achievement.
 */
export function hasMilestoneValue(milestone: MilestoneItem): boolean {
  if (!milestone) return false;

  const hasEvents =
    Array.isArray(milestone.events) &&
    milestone.events.some((e) => typeof e === "string" && e.trim().length > 0);

  const hasAchievements =
    Array.isArray(milestone.achievements) &&
    milestone.achievements.some(
      (a) => typeof a === "string" && a.trim().length > 0
    );

  const hasTitleAndDetails =
    typeof milestone.title === "string" &&
    milestone.title.trim().length > 0 &&
    (hasEvents || hasAchievements || Boolean(milestone.image));

  return hasEvents || hasAchievements || hasTitleAndDetails;
}

/**
 * Checks if a year has at least one milestone with value.
 */
export function hasYearValue(yearData: YearMilestones): boolean {
  if (!yearData || !Array.isArray(yearData.milestones)) return false;
  return yearData.milestones.some((m) => hasMilestoneValue(m));
}

/**
 * Cleans up the year and milestone data and only keeps entries with actual values. Missing labels, full month names, and IDs are added automatically.
 */
export function getVisibleEventsData(
  data: YearMilestones[] = EVENTS_DATA
): YearMilestones[] {
  return data
    .filter((y) => hasYearValue(y))
    .map((y) => ({
      ...y,
      label: y.label || y.year.toString(),
      milestones: y.milestones
        .filter((m) => hasMilestoneValue(m))
        .map((m) => ({
          ...m,
          id: m.id || `${y.year}-${m.month.toLowerCase()}`,
          fullMonth: m.fullMonth || MONTH_NAMES[m.month] || m.month,
          title:
            m.title || `${y.year} ${MONTH_NAMES[m.month] || m.month} Milestone`,
          events: (m.events || []).filter(
            (e) => typeof e === "string" && e.trim().length > 0
          ),
          achievements: (m.achievements || []).filter(
            (a) => typeof a === "string" && a.trim().length > 0
          ),
        })),
    }));
}

/**
 * Helper to generate a fresh 12-month empty template for any year.
 */
export function createEmptyYear(year: number, description = ""): YearMilestones {
  return {
    year,
    label: year.toString(),
    description: description || `Milestones and achievements for ${year}.`,
    milestones: ALL_MONTH_CODES.map((month) => ({
      month,
      title: "",
      events: [],
      achievements: [],
    })),
  };
}

export const EVENTS_DATA: YearMilestones[] = [
  {
    year: 2023,
    label: "2023",
    description:
      "Foundations laid, initial competitions conquered, and foundational workshops launched.",
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
    description:
      "Expansion, major university hackathons, industry partnerships, and competitive triumphs.",
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
    description:
      "Pioneering new standards, scalable systems, and continuous achievements.",
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
    description:
      "The journey continues — upcoming milestones and future endeavors.",
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
  // ─── 2027 ──────────────────────────────────────────────────────────────────
  // Pre-configured for all 12 months.
  // note: This year and its months will NOT show on the frontend until it is added with values
  // (at least 1 event or achievement) to any month.
  {
    year: 2027,
    label: "2027",
    description: "Upcoming events and milestones for 2027.",
    milestones: [
      { month: "JAN", title: "", events: [], achievements: [] },
      { month: "FEB", title: "", events: [], achievements: [] },
      { month: "MAR", title: "", events: [], achievements: [] },
      { month: "APR", title: "", events: [], achievements: [] },
      { month: "MAY", title: "", events: [], achievements: [] },
      { month: "JUN", title: "", events: [], achievements: [] },
      { month: "JUL", title: "", events: [], achievements: [] },
      { month: "AUG", title: "", events: [], achievements: [] },
      { month: "SEP", title: "", events: [], achievements: [] },
      { month: "OCT", title: "", events: [], achievements: [] },
      { month: "NOV", title: "", events: [], achievements: [] },
      { month: "DEC", title: "", events: [], achievements: [] },
    ],
  },
  // ─── 2028 ──────────────────────────────────────────────────────────────────
  // Pre-configured for all 12 months.
  // note: This year and its months will NOT show on the frontend until it is added with values
  // (at least 1 event or achievement) to any month.
  {
    year: 2028,
    label: "2028",
    description: "Upcoming events and milestones for 2028.",
    milestones: [
      { month: "JAN", title: "", events: [], achievements: [] },
      { month: "FEB", title: "", events: [], achievements: [] },
      { month: "MAR", title: "", events: [], achievements: [] },
      { month: "APR", title: "", events: [], achievements: [] },
      { month: "MAY", title: "", events: [], achievements: [] },
      { month: "JUN", title: "", events: [], achievements: [] },
      { month: "JUL", title: "", events: [], achievements: [] },
      { month: "AUG", title: "", events: [], achievements: [] },
      { month: "SEP", title: "", events: [], achievements: [] },
      { month: "OCT", title: "", events: [], achievements: [] },
      { month: "NOV", title: "", events: [], achievements: [] },
      { month: "DEC", title: "", events: [], achievements: [] },
    ],
  },
];
