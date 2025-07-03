import { PortfolioData } from '../types/portfolio';

export const portfolioDataEN: PortfolioData = {
  personal: {
    name: "Thomas Fouquet",
    title: "Computer Science Bachelor Student - Specialized in Cybersecurity",
    email: "alternance@thomas-fouquet.fr",
    phone: "(+33) 6 72 63 54 51",
    location: "Grand-Est Region - Strasbourg",
    status: "Looking for an apprenticeship",
    about: "Computer science student passionate about cybersecurity, focused on sovereign technologies and national strategic issues. I am particularly interested in information systems security, technological sovereignty, and sensitive data protection. My goal is to contribute to strengthening French digital sovereignty by developing cybersecurity solutions for sectors such as healthcare, defense, justice, etc.",
    social: {
      github: "https://github.com/weyrito",
      linkedin: "https://www.linkedin.com/in/thomas-fouquet/",
      email: "mailto:alternance@thomas-fouquet.fr"
    }
  },
  skills: {
    cybersecurity: {
      title: "Cybersecurity",
      items: [
        "Vulnerability analysis (Nmap, Wireshark)",
        "Network security and firewall (pfSense, iptables)",
        "Web application security (OWASP, penetration testing)",
        "IDS/IPS (Suricata)"
      ],
      excludeFromCV: false
    },
    systems: {
      title: "Systems & Networks",
      items: [
        "Linux administration",
        "Network configuration (TCP/IP, VPN, DHCP, DNS, VLAN, NAT)",
        "Virtualization (VirtualBox, Proxmox, Docker)",
        "Monitoring and supervision (Prometheus, Grafana)"
      ],
      excludeFromCV: false
    },
    web: {
      title: "Web Development",
      items: [
        {
          text: "JavaScript/TypeScript - React, Next.js",
          url: "https://www.straway.fr"
        },
        "CSS Frameworks - Tailwind, Bootstrap",
        "PHP - Symfony",
        "RESTful API",
        "Stripe API (online payment)",
        "SASS Backend (Firebase and Supabase)"
      ],
      excludeFromCV: true
    },
    database: {
      title: "Databases",
      items: [
        "MySQL, PostgreSQL, SQLite",
        "MongoDB",
        "Database design and administration"
      ],
      excludeFromCV: false
    },
    languages: {
      title: "Other Languages",
      items: [
        "Python (automation, security scripts)",
        "C/C++ (system programming, IoT)",
        "Bash/Shell scripting"
      ],
      excludeFromCV: true
    },
    soft: {
      title: "Soft Skills",
      items: [
        "Communication",
        "Autonomy",
        "Complex problem solving",
        "Adaptability",
        "Organization"
      ],
      excludeFromCV: false
    }
  },
  projects: [
    {
      title: "Homelab",
      type: "Personal Laboratory",
      description: "Setting up a homelab for learning and developing skills in cybersecurity, virtualization, and system/network administration. It's a playground for me where I host selfhost FOSS applications and deepen my networking knowledge.",
      technologies: [
        "Proxmox", "Docker", "WireGuard", "Nginx", "Grafana", "Prometheus", "AdGUARD", "opnsense", "pfSense", "OpenVPN", "and more..."
      ],
      features: [
        "Server and service virtualization",
        "VPN configuration for secure remote access",
        "System performance monitoring and surveillance",
        "Hosting selfhost FOSS applications (Nextcloud, Gitea, AdGuard, etc.)",
        "URL coming soon"
      ],
      url: "",
      excludeFromCV: false
    },
    {
      title: "Fighting Beat - MMA Club Website",
      type: "WEB Application",
      description: "As part of an associative project, I developed the Fighting Beat MMA club website.",
      technologies: ["PHP", "Stripe API", "Bootstrap"],
      features: [
        "Online payment system integration",
        "Responsive and modern interface"
      ],
      url: "https://fightingbeat.fr",
      excludeFromCV: false
    },
    {
      title: "Straweb - E-commerce Website",
      type: "WEB Application",
      description: "Straway is a startup whose ambition is to bring plants to homes through the sale of indoor plants. I participated in developing the company's website.",
      technologies: ["React.js", "Next.js", "Tailwind CSS", "Stripe API", "Firebase Auth", "PostgreSQL"],
      features: [
        "User authentication system",
        "Online payment integration"
      ],
      url: "https://www.straway.fr",
      excludeFromCV: false
    }
  ],
  experience: [
    {
      title: "Student Job - Biocoop",
      period: "August 2024 - Present",
      location: "",
      highlights: [
        "Responsible for store closing (cash counting, cleaning, organizing)",
        "Customer assistance (advice, product information)",
        "Product receiving and shelving"
      ],
      excludeFromCV: false
    },
    {
      title: "Fullstack Developer - Straway",
      period: "July 2024 - August 2024",
      location: "",
      highlights: [
        "Web application migration from React.js to Next.js",
        "Performance and SEO optimization",
        "Stripe payment API integration",
        "User management with PostgreSQL database"
      ],
      excludeFromCV: false
    }
  ],
  education: [
    {
      title: "Computer Science Bachelor 3 (upcoming)",
      period: "2025 - 2026",
      institution: {
        text: "École 18.06",
        url: "https://www.18.06.fr"
      },
      subjects: [
        "Agile Methods",
        "Cloud(s)",
        "DevOps",
        "Computer Networks (Advanced Security • Stormshield CSNE)",
        "OSINT (Open Source Intelligence)"
      ],
      specialization: "Secure Infrastructure Administrator",
      excludeFromCV: false
    },
    {
      title: "Computer Science Bachelor 1 & 2",
      period: "2023 - 2025",
      institution: {
        text: "École Hexagone",
        url: "https://www.ecole-hexagone.com/fr/fr/"
      },
      subjects: [
        "Advanced Networks",
        "Network Security",
        "Information Systems",
        "Computer Architecture",
        "Linux Administration",
        "Virtualization",
        "Web Development (PHP/Symfony, React.js)",
        "SQL Data Manipulation",
        "System Programming (C/C++)",
        "Applied Mathematics"
      ],
      specialization: "",
      excludeFromCV: false
    }
  ],
  languages: [
    {
      language: "French",
      level: "Native",
      excludeFromCV: false
    },
    {
      language: "English",
      level: "Professional",
      excludeFromCV: false
    },
    {
      language: "Spanish",
      level: "Professional",
      excludeFromCV: false
    }
  ],
  interests: [
    {
      text: "Combat sports, several fights in various disciplines (MMA, boxing, Brazilian Jiu-Jitsu)",
      excludeFromCV: false
    },
    {
      text: "Running (Half-marathon: 1h41min, 10km: 42min)",
      excludeFromCV: false
    }
  ]
};
