import { defineLocale } from '../types'

export default defineLocale({
  name: 'English',
  cv: '/cv/Noah-Soler-CV-en.pdf',
  messages: {
    site: {
      skip: 'Skip to content',
      navLabel: 'Main',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      footer: 'Saint-Étienne, France. Available for a fixed-term contract abroad in summer 2027.',
      cv: 'CV (PDF)',
      languageLabel: 'Language',
    },
    home: {
      title: 'Noah Soler — Full-stack developer',
      description: 'Full-stack developer and engineering apprentice. Vue, Nuxt, Symfony, Flutter. Looking for a 3–4 month fixed-term contract abroad, summer 2027.',
      role: 'Full-stack developer and engineering apprentice at Télécom Saint-Étienne. I build web and mobile products with Vue, Nuxt, Symfony and Flutter.',
      availability: 'Available 7 June to 31 August 2027, abroad',
      search: 'Looking for a 3–4 month fixed-term contract abroad, in full-stack development, DevSecOps or technical project management.',
      seeProjects: 'See my projects',
      emailMe: 'Email me',
      downloadCv: 'Download my CV (PDF)',
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
        {
          period: 'May – Jul 2025',
          title: 'Project intern',
          place: 'Safran Helicopter Engines, Bordes, France',
        },
        {
          period: 'Apr – Jun 2024',
          title: 'Project intern',
          place: 'Treasury General of the Kingdom, Rabat, Morocco',
        },
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
        {
          name: 'Languages',
          items: 'Python, C, C++, C#, Rust, SQL, TypeScript, PHP, Dart',
        },
        {
          name: 'Web and mobile',
          items: 'Vue, Nuxt, Symfony, Flutter',
        },
        {
          name: 'DevOps',
          items: 'Git, GitHub Actions, Bitbucket Pipelines, Docker',
        },
        {
          name: 'Embedded',
          items: 'Arduino, PCB design, sensors',
        },
      ],
      languages: [
        {
          name: 'French',
          level: 'Native',
        },
        {
          name: 'English',
          level: 'Upper intermediate (B2), TOEIC planned',
        },
        {
          name: 'Spanish',
          level: 'Elementary (A2)',
        },
      ],
    },
  },
  projects: {
    'e-totem': {
      title: 'E-TOTEM charging map',
      summary: 'Locator map for an EV-charging network, now loading an area 8× faster.',
      context: 'DOING, apprenticeship',
      period: '2025 – present',
      stack: ['Flutter', 'SQL', 'easy2do'],
      body: [
        'E-TOTEM runs a network of electric-vehicle charging stations. Drivers use its map to find the nearest available station.',
        'I reworked how the map loads stations for a given area, dividing the loading time by eight. Most of the gain came from the database.',
        'I added an index on the slowest queries, and moved the heavy filters onto joins with buffer tables that cron jobs keep up to date, so a request no longer recomputes everything.',
        'I also replaced the native SQL pagination, which slows down on large result sets, with pagination driven by an index.',
      ],
      links: {
        website: {
          label: 'Visit the E-TOTEM website',
          ariaLabel: 'Visit the E-TOTEM website (opens in a new tab)',
        },
      },
    },
    amagis: {
      title: 'AMAGiS',
      summary: 'Management software for work-integration social enterprises.',
      context: 'DOING, apprenticeship',
      period: '2025 – present',
      stack: ['Vue', 'TypeScript', 'Symfony', 'Docker', 'Bitbucket Pipelines'],
      body: [
        'AMAGiS helps work-integration social enterprises (SIAE) run their day-to-day operations. Version 2 is a rewrite of an application originally built in VB6, and I work on both the Vue front end and the Symfony back end.',
        'I built the invoicing system and a feature to compare evaluations over time, and redesigned the list components used across the whole app.',
        'On the DevOps side, I fixed the Bitbucket CI/CD pipeline and upgraded the Docker environment and its dependencies.',
      ],
      links: {
        website: {
          label: 'Visit the AMAGiS website',
          ariaLabel: 'Visit the AMAGiS website (opens in a new tab)',
        },
      },
    },
    'line-following-car': {
      title: 'Line-following car',
      summary: 'Embedded car that follows a black line on the floor, with its own motor control board.',
      context: 'Télécom Saint-Étienne',
      stack: ['Arduino', 'PCB design', 'Sensors'],
      body: [
        'A school project: a car that follows a black line drawn on the ground. I designed the motor control board, from the PCB layout to fabricating the board by printing its circuits.',
        'I assembled it with an Arduino board, colour sensors that detect the change between floor and line, and an ultrasonic sensor. I also developed an algorithm to make the line following more efficient.',
      ],
    },
    'portfolio-site': {
      title: 'This portfolio',
      summary: 'Static Nuxt site with an interactive topographic map, deployed through a protected CI/CD pipeline.',
      context: 'Personal project',
      period: 'Oct 2026 – present',
      stack: ['Nuxt 4', 'TypeScript', 'GitHub Actions', 'Cloudflare'],
      body: [
        'The site you are reading, in English and French. The home page draws contour lines on a canvas with a small marching-squares tracer, and one of them follows the pointer.',
        'Every change goes through a pull request. The pipeline runs lint, type-check, a dependency audit and a static build, then deploys to a staging site on `develop` and to production on `main`. The audit blocks the build on high or critical advisories, and any exemption has to be listed with a reason.',
        'The branching rules, protection rules and deployment steps are documented in the repository.',
      ],
    },
    'camp-boat': {
      title: 'Camp-Boat',
      summary: 'Website presenting an inventor\'s caravan-boat concept.',
      context: 'INSPIRE Junior Enterprise, client project',
      stack: ['WordPress'],
      body: [
        'A client project delivered through INSPIRE, the junior enterprise of Télécom Saint-Étienne. The client, a private inventor, needed a site presenting his caravan-boat concept.',
        'I was the developer on the project. I added features such as the menu banner and extra pages, and wrote a user guide so the client can edit the site without help.',
      ],
    },
    '3d-portfolio': {
      title: 'Interactive 3D portfolio',
      summary: 'A 3D portfolio website built for another person.',
      context: 'Built for a third party',
      stack: ['Nuxt', 'TresJS', 'Three.js'],
      body: [
        'An interactive 3D portfolio built for someone else with Nuxt and TresJS. It is not publicly available.',
      ],
    },
    'connected-dartboard': {
      title: 'Connected dartboard',
      summary: 'Planned: turn an electronic dartboard into a connected one that sends scores to a phone.',
      context: 'Personal project, design stage',
      stack: ['ESP32', 'Bluetooth LE', 'Mobile app'],
      body: [
        'Status: planned. So far only the design thinking is done, nothing is built yet.',
        'The idea is to make a store-bought electronic dartboard connected, so scores reach a phone and games can be started from it. To leave the board untouched, the plan is to unplug the ribbon cables of its membrane and connect them to an ESP32 module, which can be reversed at any time.',
      ],
    },
    'sand-simulation': {
      title: 'Sand gravity simulation',
      summary: 'Physics simulation of falling sand particles.',
      context: 'Télécom Saint-Étienne',
      period: 'Jan – May 2025',
      stack: ['C#', 'SFML'],
      body: [
        'A school project simulating how grains of sand fall and pile up, rendered with SFML.',
      ],
    },
    'bde-website': {
      title: 'Student union campaign site',
      summary: 'Showcase web app for a student union campaign.',
      context: 'Télécom Saint-Étienne',
      period: 'Dec 2024 – Feb 2025',
      stack: ['Angular', 'TypeScript'],
      body: [
        'A showcase site for the BA\'TSE student union list during the selection week for the following year\'s union.',
        'The preview below is the real site, running inside this page. It is in French.',
      ],
      embed: {
        title: 'BDE campaign site (mobile preview)',
        fullscreenLabel: 'Open full screen',
      },
    },
  },
})
