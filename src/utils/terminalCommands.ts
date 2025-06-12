import { PortfolioData } from '../types/portfolio';
import { TERMINAL_FILES } from '../types/terminal';

export const createHelpMessage = (): string => {
  return `🔧 Commandes disponibles:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Portfolio:
  about       - À propos de moi
  skills      - Compétences techniques  
  projects    - Projets réalisés
  experience  - Expériences professionnelles
  education   - Formation
  languages   - Langues parlées
  contact     - Informations de contact

⚙️  Système:
  pwd         - Afficher le répertoire courant
  whoami      - Afficher l'utilisateur
  date        - Afficher la date et l'heure
  clear       - Effacer le terminal
  exit        - Retourner au portfolio

🎮 Navigation:
  ↑/↓         - Historique des commandes
  Tab         - Auto-complétion des commandes et fichiers
  Ctrl+L      - Effacer le terminal
  Ctrl+C      - Interrompre la commande`;
};

export const executeCommand = (input: string, portfolioData: PortfolioData): string => {
  const [cmd, ...args] = input.trim().split(' ');

  switch (cmd.toLowerCase()) {
    case 'help':
      return createHelpMessage();
    
    case 'about':
      return `👨‍💻 ${portfolioData.personal.name}
🎓 ${portfolioData.personal.title}

📝 ${portfolioData.personal.about}

🎯 ${portfolioData.personal.status} dans la ${portfolioData.personal.location}`;
    
    case 'skills':
      return Object.values(portfolioData.skills)
        .filter(skill => !skill.excludeFromCV)
        .map(skill => {
          const items = skill.items.map(item => {
            if (typeof item === 'string') {
              return `  - ${item}`;
            } else {
              return `  - ${item.text}`;
            }
          }).join('\n');
          return `${skill.title}:\n${items}`;
        }).join('\n\n');
    
    case 'projects':
      return portfolioData.projects
        .filter(project => !project.excludeFromCV)
        .map(project => `🚀 ${project.title} (${project.type})\n📝 ${project.description}\n💻 Technologies: ${project.technologies.join(', ')}\n🔗 ${project.url || 'URL bientôt disponible'}`)
        .join('\n\n');
    
    case 'experience':
      return portfolioData.experience
        .filter(exp => !exp.excludeFromCV)
        .map(exp => `💼 ${exp.title} (${exp.period})${exp.location ? `\n   📍 ${exp.location}` : ''}\n${exp.highlights.map(h => `   ▶ ${h}`).join('\n')}`)
        .join('\n\n');
    
    case 'education':
      return portfolioData.education
        .filter(edu => !edu.excludeFromCV)
        .map(edu => {
          let result = `🎓 ${edu.title} (${edu.period})`;
          if (edu.institution) {
            if (typeof edu.institution === 'string') {
              result += `\n   🏫 ${edu.institution}`;
            } else {
              result += `\n   🏫 ${edu.institution.text} [🔗 ${edu.institution.url}]`;
            }
          }
          if (edu.specialization) result += `\n   🎯 Spécialisation: ${edu.specialization}`;
          return result;
        }).join('\n\n');
    
    case 'languages':
      const flags: Record<string, string> = { 
        'Français': '🇫🇷', 
        'Anglais': '🇬🇧', 
        'Espagnol': '🇪🇸' 
      };
      return portfolioData.languages
        .filter(lang => !lang.excludeFromCV)
        .map(lang => {
          const flag = flags[lang.language] || '🗣️';
          return `${flag} ${lang.language}: ${lang.level}`;
        }).join('\n');
    
    case 'contact':
      return `📞 Informations de contact:

📧 Email: ${portfolioData.personal.email}
📱 Téléphone: ${portfolioData.personal.phone}
🌍 Localisation: ${portfolioData.personal.location}
💼 Statut: ${portfolioData.personal.status}

🔗 Liens sociaux:
  • GitHub: ${portfolioData.personal.social.github}
  • LinkedIn: ${portfolioData.personal.social.linkedin}

💡 N'hésitez pas à me contacter pour toute opportunité !`;

    case 'pwd':
      return '/home/thomas/portfolio';
    
    case 'whoami':
      return `thomas

👨‍💻 Étudiant passionné en cybersécurité
🎯 Toujours en quête d'apprentissage et de défis`;
    
    case 'date':
      const now = new Date();
      return `📅 ${now.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
⏰ ${now.toLocaleTimeString('fr-FR')}
🌍 Fuseau horaire: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    
    case 'clear':
      return 'CLEAR_COMMAND';
    
    case 'exit':
      return '👋 Fermeture du terminal... À bientôt !';
    
    default:
      return handleUnknownCommand(cmd);
  }
};

const handleCatCommand = (args: string[], portfolioData: PortfolioData): string => {
  if (!args[0]) {
    return `❌ Usage: cat <filename>

📁 Fichiers disponibles:
${TERMINAL_FILES.map(file => `  • ${file}`).join('\n')}

💡 Utilisez Tab pour l'auto-complétion`;
  }
  
  switch (args[0].toLowerCase()) {
    case 'readme.md':
      return `# Portfolio Thomas Fouquet

Étudiant en cybersécurité passionné par les technologies souveraines.

## Objectif
Contribuer à renforcer la souveraineté numérique française.

## Compétences clés
- Cybersécurité & analyse de vulnérabilités
- Administration système Linux
- Développement web moderne

💡 Tapez 'help' pour explorer mes compétences !`;
    
    case 'portfolio.json':
      return `{
  "name": "${portfolioData.personal.name}",
  "status": "${portfolioData.personal.status}",
  "specialization": "Cybersécurité",
  "projects_count": ${portfolioData.projects.length},
  "skills_categories": ${Object.keys(portfolioData.skills).length}
}`;

    case 'skills.txt':
      return `📋 COMPÉTENCES TECHNIQUES

${Object.values(portfolioData.skills)
  .filter(skill => !skill.excludeFromCV)
  .map(skill => `${skill.title}:\n${skill.items.map(item => 
    typeof item === 'string' ? `  - ${item}` : `  - ${item.text}`
  ).join('\n')}`).join('\n\n')}`;

    case 'contact.info':
      return `📞 CONTACT INFORMATION

Name: ${portfolioData.personal.name}
Email: ${portfolioData.personal.email}
Phone: ${portfolioData.personal.phone}
Location: ${portfolioData.personal.location}
Status: ${portfolioData.personal.status}

Social Links:
- GitHub: ${portfolioData.personal.social.github}
- LinkedIn: ${portfolioData.personal.social.linkedin}`;
    
    default:
      return `❌ cat: ${args[0]}: Fichier introuvable

📁 Fichiers disponibles:
${TERMINAL_FILES.map(file => `  • ${file}`).join('\n')}

💡 Utilisez Tab pour l'auto-complétion`;
  }
};

const handleUnknownCommand = (cmd: string): string => {
  const cmdSuggestions = ['help', 'about', 'skills', 'projects'].filter(c => c.startsWith(cmd.toLowerCase())).slice(0, 3);
  let errorMsg = `❌ bash: ${cmd}: commande introuvable`;
  
  if (cmdSuggestions.length > 0) {
    errorMsg += `\n💡 Peut-être vouliez-vous dire: ${cmdSuggestions.join(', ')}`;
  }
  errorMsg += `\n🔧 Tapez 'help' pour voir toutes les commandes disponibles`;
  errorMsg += `\n🔄 Utilisez Tab pour l'auto-complétion`;
  
  return errorMsg;
};
