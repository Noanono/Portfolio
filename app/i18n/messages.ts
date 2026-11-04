import type { Locale } from './locale'

export interface TimelineItem {
  period: string
  title: string
  place: string
  detail?: string
}

// Every string shown by the layout and the pages lives here, once per language.
// `Record<Locale, Messages>` makes TypeScript fail the build if a key is
// missing in one of the languages. Project texts are in `app/data/projects.ts`.
export interface Messages {
  site: {
    skip: string
    navLabel: string
    projects: string
    about: string
    contact: string
    footer: string
    /** Spoken label of the language switch link, in the language it leads to. */
    switchLabel: string
  }
  home: {
    title: string
    description: string
    role: string
    search: string
    seeProjects: string
    emailMe: string
    selected: string
    allProjects: string
  }
  projects: {
    title: string
    heading: string
    description: string
    lead: string
    back: string
    technologies: string
    context: string
    when: string
    builtWith: string
    liveSite: string
  }
  about: {
    title: string
    heading: string
    description: string
    intro: string[]
    experienceHeading: string
    educationHeading: string
    skillsHeading: string
    languagesHeading: string
    experience: TimelineItem[]
    education: TimelineItem[]
    skills: { name: string, items: string }[]
    languages: { name: string, level: string }[]
  }
}

const en: Messages = {
  site: {
    skip: 'Skip to content',
    navLabel: 'Main',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    footer: 'Saint-Étienne, France. Open to a work placement abroad in summer 2027.',
    switchLabel: 'English version',
  },
  home: {
    title: 'Noah Soler — Full-stack developer',
    description: 'Full-stack developer and engineering apprentice. Vue, Nuxt, Symfony, Flutter. Looking for a 3–4 month fixed-term contract abroad, summer 2027.',
    role: 'Full-stack developer and engineering apprentice at Télécom Saint-Étienne. I build web and mobile products with Vue, Nuxt, Symfony and Flutter.',
    search: 'Looking for a 3–4 month fixed-term contract abroad in summer 2027, in full-stack development, DevSecOps or technical project management.',
    seeProjects: 'See my projects',
    emailMe: 'Email me',
    selected: 'Selected work',
    allProjects: 'All projects',
  },
  projects: {
    title: 'Projects — Noah Soler',
    heading: 'Projects',
    description: 'Professional, client and school projects by Noah Soler.',
    lead: 'Work from my apprenticeship at DOING, client projects with the INSPIRE junior enterprise, and school projects at Télécom Saint-Étienne.',
    back: 'All projects',
    technologies: 'Technologies',
    context: 'Context',
    when: 'When',
    builtWith: 'Built with',
    liveSite: 'Live site',
  },
  about: {
    title: 'About — Noah Soler',
    heading: 'About',
    description: 'Background, experience, education, skills and languages of Noah Soler, full-stack developer and engineering apprentice.',
    intro: [
      'I\'m an engineering apprentice at Télécom Saint-Étienne, due to graduate in 2028. I spend most of my time as a full-stack developer at DOING, where I work on products for social enterprises and an EV-charging network.',
      'I\'ve already worked abroad, in Rabat, and I want to keep growing in an international team. I\'m drawn to both web and embedded development. Outside work, I ski, snowboard and run.',
    ],
    experienceHeading: 'Experience',
    educationHeading: 'Education',
    skillsHeading: 'Skills',
    languagesHeading: 'Languages',
    // Both timelines are newest first. They sit side by side because the
    // apprenticeship runs in parallel with the engineering degree.
    experience: [
      {
        period: 'Sep 2025 – present',
        title: 'Full-stack developer, apprenticeship',
        place: 'DOING, France',
        detail: 'AMAGiS (Vue, Symfony) and E-TOTEM (Flutter): invoicing, SQL performance, CI/CD.',
      },
      {
        period: 'May 2025 – May 2026',
        title: 'President, Bureau des Sports',
        place: 'Télécom Saint-Étienne, France',
        detail: 'Led a team of about thirty students: a ski weekend open to the whole school, pétanque tournaments and inter-school tournaments.',
      },
      { period: 'May – Jul 2025', title: 'Project intern', place: 'Safran Helicopter Engines, Bordes, France' },
      { period: 'Apr – Jun 2024', title: 'Project intern', place: 'Treasury General of the Kingdom, Rabat, Morocco' },
    ],
    education: [
      {
        period: 'Sep 2025 – 2028 (expected)',
        title: 'Master\'s-level engineering degree, apprenticeship track (IEID)',
        place: 'Télécom Saint-Étienne, France',
      },
      {
        period: 'Sep 2024 – Aug 2025',
        title: 'General engineering programme, computer science and optics',
        place: 'Télécom Saint-Étienne, France',
      },
      {
        period: '2022 – 2024',
        title: 'Integrated preparatory cycle (CITISE)',
        place: 'Télécom Saint-Étienne, France',
        detail: 'DUT in Electrical Engineering and Industrial Computing (GEII)',
      },
    ],
    skills: [
      { name: 'Languages', items: 'Python, C, C++, C#, Rust, SQL, TypeScript, PHP, Dart' },
      { name: 'Web and mobile', items: 'Vue, Nuxt, Symfony, Flutter' },
      { name: 'DevOps', items: 'Git, GitHub Actions, Bitbucket Pipelines, Docker' },
      { name: 'Embedded', items: 'Arduino, PCB design, sensors' },
    ],
    languages: [
      { name: 'French', level: 'Native' },
      { name: 'English', level: 'Upper intermediate (B2), TOEIC planned' },
      { name: 'Spanish', level: 'Elementary (A2)' },
    ],
  },
}

const fr: Messages = {
  site: {
    skip: 'Aller au contenu',
    navLabel: 'Principale',
    projects: 'Projets',
    about: 'À propos',
    contact: 'Contact',
    footer: 'Saint-Étienne, France. Disponible pour une expérience à l\'étranger à l\'été 2027.',
    switchLabel: 'Version française',
  },
  home: {
    title: 'Noah Soler — Développeur full-stack',
    description: 'Développeur full-stack et apprenti ingénieur. Vue, Nuxt, Symfony, Flutter. À la recherche d\'un contrat de 3 à 4 mois à l\'étranger, été 2027.',
    role: 'Développeur full-stack et apprenti ingénieur à Télécom Saint-Étienne. Je conçois des produits web et mobiles avec Vue, Nuxt, Symfony et Flutter.',
    search: 'Je cherche un contrat de type CDD de 3 à 4 mois à l\'étranger à l\'été 2027, en développement full-stack, DevSecOps ou gestion de projet technique.',
    seeProjects: 'Voir mes projets',
    emailMe: 'M\'écrire',
    selected: 'Projets sélectionnés',
    allProjects: 'Tous les projets',
  },
  projects: {
    title: 'Projets — Noah Soler',
    heading: 'Projets',
    description: 'Projets professionnels, clients et scolaires de Noah Soler.',
    lead: 'Mes missions d\'alternance chez DOING, des projets clients avec la junior-entreprise INSPIRE et des projets d\'école à Télécom Saint-Étienne.',
    back: 'Tous les projets',
    technologies: 'Technologies',
    context: 'Contexte',
    when: 'Période',
    builtWith: 'Technologies',
    liveSite: 'Site en ligne',
  },
  about: {
    title: 'À propos — Noah Soler',
    heading: 'À propos',
    description: 'Parcours, expérience, formation, compétences et langues de Noah Soler, développeur full-stack et apprenti ingénieur.',
    intro: [
      'Je suis apprenti ingénieur à Télécom Saint-Étienne, diplôme prévu en 2028. J\'occupe l\'essentiel de mon temps comme développeur full-stack chez DOING, où je travaille sur des produits pour des entreprises sociales et un réseau de recharge de véhicules électriques.',
      'J\'ai déjà travaillé à l\'étranger, à Rabat, et je veux continuer à progresser dans une équipe internationale. Le web comme l\'embarqué m\'attirent. En dehors du travail, je skie, je fais du snowboard et de la course à pied.',
    ],
    experienceHeading: 'Expérience',
    educationHeading: 'Formation',
    skillsHeading: 'Compétences',
    languagesHeading: 'Langues',
    experience: [
      {
        period: 'sept. 2025 – aujourd\'hui',
        title: 'Développeur full-stack, alternance',
        place: 'DOING, France',
        detail: 'AMAGiS (Vue, Symfony) et E-TOTEM (Flutter) : facturation, performance SQL, CI/CD.',
      },
      {
        period: 'mai 2025 – mai 2026',
        title: 'Président du Bureau des Sports',
        place: 'Télécom Saint-Étienne, France',
        detail: 'Direction d\'une équipe d\'une trentaine d\'étudiants : un week-end ski ouvert à toute l\'école, des tournois de pétanque et des tournois inter-écoles.',
      },
      { period: 'mai – juil. 2025', title: 'Stagiaire de projet', place: 'Safran Helicopter Engines, Bordes, France' },
      { period: 'avr. – juin 2024', title: 'Stagiaire de projet', place: 'Trésorerie générale du Royaume, Rabat, Maroc' },
    ],
    education: [
      {
        period: 'sept. 2025 – 2028 (prévu)',
        title: 'Diplôme d\'ingénieur (grade de master), voie de l\'apprentissage (IEID)',
        place: 'Télécom Saint-Étienne, France',
      },
      {
        period: 'sept. 2024 – août 2025',
        title: 'Cycle ingénieur généraliste, informatique et optique',
        place: 'Télécom Saint-Étienne, France',
      },
      {
        period: '2022 – 2024',
        title: 'Cycle préparatoire intégré (CITISE)',
        place: 'Télécom Saint-Étienne, France',
        detail: 'DUT Génie électrique et informatique industrielle (GEII)',
      },
    ],
    skills: [
      { name: 'Langages', items: 'Python, C, C++, C#, Rust, SQL, TypeScript, PHP, Dart' },
      { name: 'Web et mobile', items: 'Vue, Nuxt, Symfony, Flutter' },
      { name: 'DevOps', items: 'Git, GitHub Actions, Bitbucket Pipelines, Docker' },
      { name: 'Embarqué', items: 'Arduino, conception de PCB, capteurs' },
    ],
    languages: [
      { name: 'Français', level: 'Langue maternelle' },
      { name: 'Anglais', level: 'Intermédiaire supérieur (B2), TOEIC prévu' },
      { name: 'Espagnol', level: 'Élémentaire (A2)' },
    ],
  },
}

export const messages: Record<Locale, Messages> = { en, fr }
