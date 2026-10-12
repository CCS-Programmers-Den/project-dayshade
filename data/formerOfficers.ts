export interface FormerOfficer {
  id: number;
  name: string;
  title: string;
  image: string;
  socials: {
    github?: string;
    email?: string;
  };
}

export interface AcademicYearOfficers {
  year: string;
  officers: FormerOfficer[];
}

export const formerOfficersByYear: Record<string, FormerOfficer[]> = {
  "2025-2026": [
    {
      id: 1,
      name: "Kharl Asuncion",
      title: "President",
      image: "/assets/profile/pres-kharl.jpg",
      socials: {
        github: "https://github.com/KorinChlorine",
        email: "kharlasuncion1010@gmail.com",
      },
    },
    {
      id: 2,
      name: "Kyran Emanuel Solomon",
      title: "Executive Secretary",
      image: "/assets/profile/sec-kyran.jpg",
      socials: {
        github: "https://github.com/Kykyzxz",
        email: "kyransolomon5@gmail.com",
      },
    },
    {
      id: 3,
      name: "King Paolo Franco",
      title: "Vice President of Development",
      image: "/assets/profile/vp-dev-king.jpg",
      socials: {
        github: "https://github.com/sudo-paoo",
        email: "kingpaolofranco60@gmail.com",
      },
    },
    {
      id: 4,
      name: "Carl Lawrence Maldong",
      title: "Vice President of Comp. Prog.",
      image: "/assets/profile/vp-compe-carl.jpg",
      socials: {
        github: "https://github.com/RenceCLM",
      },
    },
    {
      id: 5,
      name: "Christian Kevin Mecate",
      title: "Vice President of Multimedia",
      image: "/assets/profile/vp-mm-christian.png",
      socials: {
        github: "https://github.com/MyricalPenguin",
        email: "macalechristiankeviny@gmail.com",
      },
    },
    {
      id: 6,
      name: "Mark Louis Cadiente",
      title: "Head of Development",
      image: "/assets/profile/head-dev-mark.jpg",
      socials: {
        github: "https://github.com/RimeValkyris",
        email: "mlcccadiente2004@gmail.com",
      },
    },
    {
      id: 7,
      name: "Neo Seifer Matias",
      title: "Head of Human Resources",
      image: "/assets/profile/head-hr-neo.png",
      socials: {
        github: "https://github.com/Granger-spec",
        email: "neomatias242@gmail.com",
      },
    },
    {
      id: 8,
      name: "Elton John Lennan Bundukin",
      title: "Head of Recruitment",
      image: "/assets/profile/head-recruitment.jpg",
      socials: {
        github: "https://github.com/superEnne",
        email: "bundukinelton@gmail.com",
      },
    },
    {
      id: 9,
      name: "Menard Manlutac",
      title: "Head of Communication",
      image: "/assets/profile/head-comm-mennard.png",
      socials: {
        github: "https://github.com/unlockthecode",
        email: "manlutacmennard@gmail.com",
      },
    },
    {
      id: 10,
      name: "Christian Marco Manlutac",
      title: "Head of Finances",
      image: "/assets/profile/head-finance-christian.jpg",
      socials: {
        github: "https://github.com/marcomanlutac",
        email: "marcomanlutac12@gmail.com",
      },
    },
    {
      id: 11,
      name: "Luis Armando Barba",
      title: "Secretary of Finances",
      image: "/assets/profile/sec-finance-luis.jpg",
      socials: {
        github: "https://github.com/lacomms",
        email: "lsrmnnbrb@gmail.com",
      },
    },
    {
      id: 12,
      name: "Kelvin Dave Rivera",
      title: "Audit",
      image: "/assets/profile/auditor-kelvin.png",
      socials: {
        github: "https://github.com/ttalker",
        email: "kelvindaverivera26@gmail.com",
      },
    },
    {
      id: 13,
      name: "Mharl Vincent Aquilos",
      title: "Social Media Manager",
      image: "/assets/profile/socmed-manager-mharl.png",
      socials: {
        github: "https://github.com/danimaaru",
        email: "mharlvincentaguilos@gmail.com",
      },
    },
  ],
  "2024-2025": [
    {
      id: 201,
      name: "John Andrei Tacujan",
      title: "President",
      image: "/assets/profile/adviser-lapitan-nomar.jpg",
      socials: {
        github: "https://github.com",
      },
    },
    {
      id: 202,
      name: "Marc Jersey Castro",
      title: "Executive Secretary",
      image: "/assets/profile/head-dev-mark.jpg",
      socials: {
        github: "https://github.com",
      },
    },
    {
      id: 203,
      name: "King Paolo Franco",
      title: "VP of Development",
      image: "/assets/profile/vp-dev-king.jpg",
      socials: {
        github: "https://github.com/sudo-paoo",
      },
    },
    {
      id: 204,
      name: "Gilbert Cura",
      title: "VP of Comp. Prog.",
      image: "/assets/profile/vp-compe-carl.jpg",
      socials: {
        github: "https://github.com",
      },
    },
    {
      id: 205,
      name: "Eithan Matthew Malonzo",
      title: "VP of Multimedia",
      image: "/assets/profile/vp-mm-christian.png",
      socials: {
        github: "https://github.com",
      },
    },
    {
      id: 206,
      name: "Kharl Asuncion",
      title: "Head of Human Resources",
      image: "/assets/profile/pres-kharl.jpg",
      socials: {
        github: "https://github.com/KorinChlorine",
      },
    },
    {
      id: 207,
      name: "Mark Louis Cadiente",
      title: "Head of Development",
      image: "/assets/profile/head-dev-mark.jpg",
      socials: {
        github: "https://github.com/RimeValkyris",
      },
    },
    {
      id: 208,
      name: "Christian Marco Manlutac",
      title: "Head of Finances",
      image: "/assets/profile/head-finance-christian.jpg",
      socials: {
        github: "https://github.com",
      },
    },
  ],
  "2023-2024": [
    {
      id: 301,
      name: "Nomar Lapitan",
      title: "Adviser",
      image: "/assets/profile/adviser-lapitan-nomar.jpg",
      socials: {
        email: "nlapitan@tsu.edu.ph",
      },
    },
    {
      id: 302,
      name: "Former President 2023",
      title: "President",
      image: "/assets/profile/pres-kharl.jpg",
      socials: {},
    },
    {
      id: 303,
      name: "Former VP Dev 2023",
      title: "Vice President of Development",
      image: "/assets/profile/vp-dev-king.jpg",
      socials: {},
    },
    {
      id: 304,
      name: "Former VP Multimedia 2023",
      title: "Vice President of Multimedia",
      image: "/assets/profile/vp-mm-christian.png",
      socials: {},
    },
    {
      id: 305,
      name: "Former Secretary 2023",
      title: "Executive Secretary",
      image: "/assets/profile/sec-kyran.jpg",
      socials: {},
    },
  ],
};

export const availableOfficerYears = Object.keys(formerOfficersByYear);
