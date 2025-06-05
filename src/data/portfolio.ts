import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Thomas Fouquet",
    title: "Étudiant en Bachelor informatique - Spécialisé en cybersécurité",
    email: "alternance@thomas-fouquet.fr",
    phone: "06 72 63 54 51",
    location: "Région Grand-Est",
    status: "En recherche d'alternance",
    about: "Étudiant en informatique passionné par la cybersécurité, orienté vers les technologies souveraines et les enjeux stratégiques nationaux. Je m'intéresse particulièrement à la sécurité des systèmes d'information, la souveraineté technologique et la protection des données sensibles. Mon objectif est de contribuer à renforcer la souveraineté numérique française en développant des solutions de cybersécurité pour les secteurs d'importance vitale comme la santé, la défense, la justice, etc.",
    cv: {
      url: "assets/thomas-fouquet-cv.pdf",
      filename: "Thomas_Fouquet_CV.pdf",
      size: "245 KB"
    },
    social: {
      github: "https://github.com/weyrito",
      linkedin: "https://www.linkedin.com/in/thomas-fouquet/",
      email: "mailto:alternance@thomas-fouquet.fr"
    }
  },
  skills: {
    cybersecurity: {
      title: "Cybersécurité",
      items: [
        "Analyse de vulnérabilités (Nmap, Wireshark)",
        "Sécurité réseau et firewall (pfSense, iptables)",
        "Sécurité des applications web (OWASP, tests d'intrusion)",
        "IDS/IPS (Suricata)"
      ],
      excludeFromCV: false
    },
    systems: {
      title: "Systèmes & Réseaux",
      items: [
        "Administration Linux",
        "Configuration réseau (TCP/IP, VPN, DHCP, DNS, VLAN, NAT)",
        "Virtualisation (VirtualBox, Proxmox, Docker)",
        "Supervision et monitoring (Prometheus, Grafana)"
      ],
      excludeFromCV: false
    },
    web: {
      title: "Développement web",
      items: [
        {
          text: "JavaScript/TypeScript - React, Next.js",
          url: "https://www.straway.fr"
        },
        "Framework CSS - Tailwind, Bootstrap",
        "PHP - Symfony",
        "API RESTful",
        "Stripe API (paiement en ligne)",
        "Backend SASS (Firebase et Supabase)"
      ],
      excludeFromCV: true
    },
    database: {
      title: "Bases de données",
      items: [
        "MySQL, PostgreSQL, SQLite",
        "MongoDB",
        "Conception et administration de bases de données"
      ],
      excludeFromCV: false
    },
    languages: {
      title: "Autres langages",
      items: [
        "Python (automatisation, scripts de sécurité)",
        "C/C++ (programmation système, IoT)",
        "Bash/Shell scripting"
      ],
      excludeFromCV: true
    },
    soft: {
      title: "Soft skills",
      items: [
        "Communication",
        "Autonomie",
        "Résolution de problèmes complexes",
        "Adaptabilité",
        "Organisation"
      ],
      excludeFromCV: false
    }
  },
  projects: [
    {
      title: "Homelab",
      type: "Laboratoire personnel",
      description: "Mise en place d'un homelab pour l'apprentissage et le développement de compétences en cybersécurité, en virtualisation et en administration système/réseau. C'est un terrain de jeu pour moi dans lequel j'héberge des applications selfhost FOSS et j'approfondis mes connaissances en réseau.",
      technologies: [
        "Proxmox", "Docker", "WireGuard", "Nginx", "Grafana", "Prometheus", "AdGUARD", "opnsense", "pfSense", "OpenVPN", "et plus encore..."
      ],
      features: [
        "Virtualisation de serveurs et services",
        "Configuration de VPN pour accès distant sécurisé",
        "Surveillance et monitoring des performances système",
        "Hébergement d'applications selfhost FOSS (Nextcloud, Gitea, AdGuard, etc.)",
        "URL bientôt disponible"
      ],
      url: "",
      excludeFromCV: false
    },
    {
      title: "Fighting Beat - Site web d'un club de MMA",
      type: "Application WEB",
      description: "Dans le cadre d'un projet associatif, j'ai développé le site web du club de MMA Fighting Beat.",
      technologies: ["PHP", "Stripe API", "Bootstrap"],
      features: [
        "Intégration de système de paiement en ligne",
        "Interface responsive et moderne"
      ],
      url: "https://fightingbeat.fr",
      excludeFromCV: false
    },
    {
      title: "Straweb - Site e-commerce",
      type: "Application WEB",
      description: "Straway est une startup dont l'ambition est de végétaliser les foyers à travers la vente de plantes d'intérieur. J'ai participé au développement du site web de l'entreprise.",
      technologies: ["React.js", "Next.js", "Tailwind CSS", "Stripe API", "Firebase Auth", "PostgreSQL"],
      features: [
        "Système d'authentification utilisateur",
        "Intégration paiement en ligne"
      ],
      url: "https://www.straway.fr",
      excludeFromCV: false
    }
  ],
  experience: [
    {
      title: "Job étudiant - Biocoop",
      period: "Août 2024 - Aujourd'hui",
      location: "",
      highlights: [
        "Responsable de la fermeture du magasin (comptage des caisses, nettoyage, rangement)",
        "Aide à la clientèle (conseils, informations sur les produits)",
        "Réception et mise en rayon des produits"
      ],
      excludeFromCV: false
    },
    {
      title: "Développeur Fullstack - Straway",
      period: "Juillet 2024 - Août 2024",
      location: "",
      highlights: [
        "Migration d'une application web de React.js à Next.js",
        "Optimisation des performances et de la SEO",
        "Intégration de l'API de paiement Stripe",
        "Gestion des utilisateurs en relation avec une base de donnée PostgreSQL"
      ],
      excludeFromCV: false
    }
  ],
  education: [
    {
      title: "Bachelor informatique 3",
      period: "2025 - 2026",
      institution: {
        text: "École 18.06",
        url: "https://www.18.06.fr"
      },
      specialization: "",
      excludeFromCV: false
    },
    {
      title: "Bachelor informatique 1 & 2",
      period: "2023 - 2025",
      institution: {
        text: "École Hexagone",
        url: "https://www.ecole-hexagone.com/fr/fr/"
      },
      specialization: "",
      excludeFromCV: false
    }
  ],
  languages: [
    {
      language: "Français",
      level: "Natif",
      excludeFromCV: false
    },
    {
      language: "Anglais",
      level: "Professionnel",
      excludeFromCV: false
    },
    {
      language: "Espagnol",
      level: "Professionnel",
      excludeFromCV: false
    }
  ],
  interests: [
    {
      text: "Sports de combat, plusieurs combats dans diverses disciplines (MMA, boxe anglaise, jiu-jitsu brésilien)",
      excludeFromCV: false
    },
    {
      text: "Course à pied (Semi-marathon: 1h41min, 10km: 42min)",
      excludeFromCV: false
    }
  ]
};
