import { defineLocale } from '../types'

export default defineLocale({
  name: 'Français',
  cv: '/cv/Noah-Soler-CV-fr.pdf',
  messages: {
    site: {
      skip: 'Aller au contenu',
      navLabel: 'Principale',
      projects: 'Projets',
      about: 'À propos',
      contact: 'Contact',
      footer: 'Saint-Étienne, France. Disponible pour une expérience à l\'étranger à l\'été 2027.',
      cv: 'CV (PDF)',
      languageLabel: 'Langue',
    },
    home: {
      title: 'Noah Soler — Développeur full-stack',
      description: 'Développeur full-stack et apprenti ingénieur. Vue, Nuxt, Symfony, Flutter. À la recherche d\'un contrat de 3 à 4 mois à l\'étranger, été 2027.',
      role: 'Développeur full-stack et apprenti ingénieur à Télécom Saint-Étienne. Je conçois des produits web et mobiles avec Vue, Nuxt, Symfony et Flutter.',
      availability: 'Disponible du 7 juin au 31 août 2027, à l\'étranger',
      search: 'Je cherche un contrat de type CDD de 3 à 4 mois à l\'étranger, en développement full-stack, DevSecOps ou gestion de projet technique.',
      seeProjects: 'Voir mes projets',
      emailMe: 'M\'écrire',
      downloadCv: 'Télécharger mon CV (PDF)',
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
      links: {
        website: {
          label: 'Voir le site {name}',
          ariaLabel: 'Voir le site {name} (s\'ouvre dans un nouvel onglet)',
        },
        repo: {
          label: 'Voir le code source',
          ariaLabel: 'Voir le code source (s\'ouvre dans un nouvel onglet)',
        },
      },
      openFullScreen: 'Ouvrir en plein écran',
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
        {
          period: 'mai – juil. 2025',
          title: 'Stagiaire de projet',
          place: 'Safran Helicopter Engines, Bordes, France',
        },
        {
          period: 'avr. – juin 2024',
          title: 'Stagiaire de projet',
          place: 'Trésorerie générale du Royaume, Rabat, Maroc',
        },
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
        {
          name: 'Langages',
          items: 'Python, C, C++, C#, Rust, SQL, TypeScript, PHP, Dart',
        },
        {
          name: 'Web et mobile',
          items: 'Vue, Nuxt, Symfony, Flutter',
        },
        {
          name: 'DevOps',
          items: 'Git, GitHub Actions, Bitbucket Pipelines, Docker',
        },
        {
          name: 'Embarqué',
          items: 'Arduino, conception de PCB, capteurs',
        },
      ],
      languages: [
        {
          name: 'Français',
          level: 'Langue maternelle',
        },
        {
          name: 'Anglais',
          level: 'Intermédiaire supérieur (B2), TOEIC prévu',
        },
        {
          name: 'Espagnol',
          level: 'Élémentaire (A2)',
        },
      ],
    },
  },
  projects: {
    'e-totem': {
      title: 'Carte de recharge E-TOTEM',
      summary: 'Carte de localisation d\'un réseau de recharge de véhicules électriques, qui charge désormais une zone 8 fois plus vite.',
      context: 'DOING, alternance',
      period: '2025 – aujourd\'hui',
      stack: ['Flutter', 'SQL', 'easy2do'],
      body: [
        'E-TOTEM exploite un réseau de bornes de recharge pour véhicules électriques. Les conducteurs utilisent sa carte pour trouver la borne disponible la plus proche.',
        'J\'ai revu la façon dont la carte charge les bornes d\'une zone donnée, ce qui a divisé le temps de chargement par huit. L\'essentiel du gain vient de la base de données.',
        'J\'ai ajouté un index sur les requêtes les plus lentes et déplacé les filtres coûteux vers des jointures sur des tables tampons que des crons maintiennent à jour, si bien qu\'une requête ne recalcule plus tout.',
        'J\'ai aussi remplacé la pagination SQL native, qui ralentit sur les gros jeux de résultats, par une pagination pilotée par un index.',
      ],
    },
    amagis: {
      title: 'AMAGiS',
      summary: 'Logiciel de gestion pour les structures d\'insertion par l\'activité économique.',
      context: 'DOING, alternance',
      period: '2025 – aujourd\'hui',
      stack: ['Vue', 'TypeScript', 'Symfony', 'Docker', 'Bitbucket Pipelines'],
      body: [
        'AMAGiS aide les structures d\'insertion par l\'activité économique (SIAE) à gérer leur activité au quotidien. La version 2 est une refonte d\'une application développée à l\'origine en VB6 ; je travaille à la fois sur le front Vue et sur le back Symfony.',
        'J\'ai développé le système de facturation et une fonctionnalité de comparaison des évaluations dans le temps, et j\'ai repensé les composants de liste utilisés dans toute l\'application.',
        'Côté DevOps, j\'ai corrigé le pipeline CI/CD Bitbucket et mis à jour l\'environnement Docker et ses dépendances.',
      ],
    },
    'line-following-car': {
      title: 'Voiture suiveuse de ligne',
      summary: 'Voiture embarquée qui suit une ligne noire au sol, avec sa propre carte de contrôle des moteurs.',
      context: 'Télécom Saint-Étienne',
      stack: ['Arduino', 'Conception de PCB', 'Capteurs'],
      body: [
        'Un projet d\'école : une voiture qui suit une ligne noire tracée au sol. J\'ai conçu la carte de contrôle des moteurs, de la conception du PCB à la fabrication de la carte par impression des circuits.',
        'Je l\'ai assemblée avec une carte Arduino, des capteurs de couleur qui détectent le passage entre le sol et la ligne, et un capteur à ultrasons. J\'ai aussi développé un algorithme pour rendre le suivi de ligne plus efficace.',
      ],
    },
    'portfolio-site': {
      title: 'Ce portfolio',
      summary: 'Site Nuxt statique avec une carte topographique interactive, déployé par un pipeline CI/CD protégé.',
      context: 'Projet personnel',
      period: 'oct. 2026 – aujourd\'hui',
      stack: ['Nuxt 4', 'TypeScript', 'GitHub Actions', 'Cloudflare'],
      body: [
        'Le site que vous lisez, en anglais et en français. La page d\'accueil dessine des courbes de niveau sur un canvas avec un petit traceur marching squares, et l\'une d\'elles suit le pointeur.',
        'Chaque changement passe par une pull request. Le pipeline lance le lint, la vérification des types, un audit des dépendances et un build statique, puis déploie sur un site de staging depuis `develop` et en production depuis `main`. L\'audit bloque le build en cas d\'avis élevé ou critique, et toute exemption doit être listée avec sa raison.',
        'Les règles de branches, de protection et les étapes de déploiement sont documentées dans le dépôt.',
      ],
    },
    'camp-boat': {
      title: 'Camp-Boat',
      summary: 'Site présentant le concept de caravane-bateau d\'un inventeur.',
      context: 'Junior-entreprise INSPIRE, projet client',
      stack: ['WordPress'],
      body: [
        'Un projet client réalisé via INSPIRE, la junior-entreprise de Télécom Saint-Étienne. Le client, un inventeur particulier, avait besoin d\'un site présentant son concept de caravane-bateau.',
        'J\'étais le développeur du projet. J\'ai ajouté des fonctionnalités comme le bandeau de menu et des pages supplémentaires, et rédigé une notice d\'utilisation pour que le client puisse modifier le site sans aide.',
      ],
    },
    '3d-portfolio': {
      title: 'Portfolio 3D interactif',
      summary: 'Un site portfolio 3D réalisé pour une autre personne.',
      context: 'Réalisé pour un tiers',
      stack: ['Nuxt', 'TresJS', 'Three.js'],
      body: [
        'Un portfolio 3D interactif réalisé pour quelqu\'un d\'autre avec Nuxt et TresJS. Il n\'est pas accessible publiquement.',
      ],
    },
    'connected-dartboard': {
      title: 'Cible de fléchettes connectée',
      summary: 'Prévu : rendre connectée une cible de fléchettes électronique pour envoyer les scores sur un téléphone.',
      context: 'Projet personnel, phase de conception',
      stack: ['ESP32', 'Bluetooth LE', 'App mobile'],
      body: [
        'Statut : prévu. Pour l\'instant, seule la réflexion de conception est faite, rien n\'est encore construit.',
        'L\'idée est de rendre connectée une cible de fléchettes électronique du commerce, pour que les scores arrivent sur un téléphone et que l\'on puisse lancer les parties depuis celui-ci. Pour ne pas toucher à la cible, le plan est de débrancher les nappes de sa membrane et de les connecter à un module ESP32, ce qui reste réversible à tout moment.',
      ],
    },
    'sand-simulation': {
      title: 'Simulation de gravité du sable',
      summary: 'Simulation physique de grains de sable qui tombent.',
      context: 'Télécom Saint-Étienne',
      period: 'janv. – mai 2025',
      stack: ['C#', 'SFML'],
      body: [
        'Un projet d\'école qui simule la chute et l\'empilement de grains de sable, rendu avec SFML.',
      ],
    },
    'bde-website': {
      title: 'Site de campagne d\'une liste BDE',
      summary: 'Application web vitrine pour la campagne d\'une liste BDE.',
      context: 'Télécom Saint-Étienne',
      period: 'déc. 2024 – févr. 2025',
      stack: ['Angular', 'TypeScript'],
      body: [
        'Un site vitrine pour la liste BA\'TSE pendant la semaine de sélection pour le bureau des élèves de l\'année suivante.',
        'L\'aperçu ci-dessous est le vrai site, qui tourne dans cette page.',
      ],
      embed: {
        title: 'Site de la campagne BDE (aperçu mobile)',
      },
    },
  },
})
