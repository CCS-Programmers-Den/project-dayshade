export interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  socials: {
    github?: string;
    email?: string;
  };
}
// ! MAY KULANG PA
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Nomar Lapitan',
    title: 'Adviser',
    image: '/assets/profile/adviser-lapitan-nomar.jpg',
    socials: {
      email: 'mailto:name@example.com',
    },
  },
  {
    id: 2,
    name: 'Kharl Asuncion',
    title: 'President',
    image: 'assets/profile/pres-kharl.jpg',
    socials: {
      github: 'https://github.com/KorinChlorine',
      email: 'mailto:mailto:kharlasuncion1010@gmail.com',
    },
  },
  {
    id: 3,
    name: 'Kyran Emanuel Solomon',
    title: 'Executive Secretary',
    image: 'assets/profile/sec-kyran.jpg',
    socials: {
      github: 'https://github.com/Kykyzxz',
      email: 'mailto:kyransolomon5@gmail.com',
    },
  },
  {
    id: 4,
    name: 'King Paolo Franco',
    title: 'VP of Development',
    image: 'assets/profile/vp-dev-king.jpg',
    socials: {
      github: 'https://github.com',
      email: 'mailto:kingpaolofranco60@gmail.com',
    },
  },
  {
    id: 5,
    name: 'Christian Kevin Mecate',
    title: 'VP of Multimedia',
    image: 'assets/profile/vp-mm-christian.png',
    socials: {
      github: 'https://github.com/MyricalPenguin',
      email: 'mailto:macalechristiankeviny@gmail.com',
    },
  },
  {
    id: 6,
    name: 'Carl Lawrence Maldong',
    title: 'VP of Competitive Programming',
    image: 'assets/profile/vp-compe-carl.jpg',
    socials: {
      github: "https://github.com/RenceCLM"
    },
  },
  {
    id: 7,
    name: 'Mark Louis Cadiente',
    title: 'Head of Development',
    image: 'assets/profile/head-dev-mark.jpg',
    socials: {
      github: 'https://github.com/RimeValkyris',
      email: 'mailto:mlcccadiente2004@gmail.com',
    },
  },
  {
    id: 8,
    name: 'Neo Snifer Matias',
    title: 'Head of Human Resources',
    image: 'assets/profile/head-hr-neo.png',
    socials: {
      github: 'https://github.com/Granger-spec',
      email: 'mailto:neomatias242@gmail.com',
    },
  },
  {
    id: 9,
    name: 'Elton John Lennan Bundukin',
    title: 'Head of Recruitment',
    image: 'assets/profile/head-recruitment.jpg',
    socials: {
      github: 'https://github.com/superEnne',
      email: 'mailto:bundukinelton@gmail.com',
    },
  },
  {
    id: 10,
    name: 'Menard Manlutac',
    title: 'Head of Communications',
    image: 'assets/profile/head-comm-mennard.png',
    socials: {
      github: 'https://github.com/unlockthecode',
      email: 'mailto:manlutacmennard@gmail.com',
    },
  },
  {
    id: 11,
    name: 'Christian Marco Manlutac',
    title: 'Head of Finance',
    image: 'assets/profile/head-finance-christian.jpg',
    socials: {
      github: 'https://github.com/marcomanlutac',
      email: 'mailto:marcomanlutac12@gmail.com',
    },
  },
  {
    id: 12,
    name: 'Luis Armando Barba',
    title: 'Secretary of Finances',
    image: 'assets/profile/sec-finance-luis.jpg',
    socials: {
      github: 'https://github.com/lacomms',
      email: 'mailto:lsrmnnbrb@gmail.com',
    },
  },
  {
    id: 13,
    name: 'Kelvin Dave Rivera',
    title: 'Auditor',
    image: 'assets/profile/auditor-kelvin.png',
    socials: {
      github: 'https://github.com/ttalker',
      email: 'mailto:kelvindaverivera26@gmail.com',
    },
  },
  {
    id: 14,
    name: 'Mharl Vincent Aquilos',
    title: 'Social Media Manager',
    image: 'assets/profile/socmed-manager-mharl.png',
    socials: {
      github: 'https://github.com/danimaaru',
      email: 'mailto:mharlvincentaguilos@gmail.com',
    },
  },
];