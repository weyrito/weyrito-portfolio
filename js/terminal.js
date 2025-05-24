class Terminal {
    constructor() {
        this.currentPath = '/home/thomas';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.output = null;
        this.input = null;
        this.keyboardListener = null;
        
        this.commands = this.initCommands();
        this.files = { 'README.md': 'Portfolio de Thomas Fouquet - Étudiant en cybersécurité\nTapez "help" pour voir les commandes disponibles.' };
        
        this.init();
    }

    initCommands() {
        return {
            help: () => this.display(this.templates.help()),
            about: () => this.display(this.formatSection('À PROPOS', portfolioData?.personal, this.formatters.about)),
            skills: () => this.display(this.formatSection('COMPÉTENCES TECHNIQUES', portfolioData?.skills, this.formatters.skills)),
            projects: () => this.display(this.formatSection('PROJETS RÉALISÉS', portfolioData?.projects, this.formatters.projects)),
            experience: () => this.display(this.formatSection('EXPÉRIENCES', { exp: portfolioData?.experience, interests: portfolioData?.interests }, this.formatters.experience)),
            education: () => this.display(this.formatSection('FORMATION', portfolioData?.education, this.formatters.education)),
            languages: () => this.display(this.formatSection('LANGUES', portfolioData?.languages, this.formatters.languages)),
            contact: () => this.display(this.formatSection('CONTACT', portfolioData?.personal, this.formatters.contact)),
            clear: () => this.clearTerminal(),
            ls: () => this.display(Object.keys(this.files).join('  ')),
            cat: (args) => this.readFile(args),
            pwd: () => this.display(this.currentPath),
            whoami: () => this.display('thomas'),
            date: () => this.display(new Date().toString()),
            exit: () => this.exitTerminal(),
        };
    }

    get templates() {
        return {
            welcome: () => `
╔══════════════════════════════════════════════════════════════╗
║                    THOMAS FOUQUET TERMINAL                   ║
╚══════════════════════════════════════════════════════════════╝

Bienvenue dans mon portfolio interactif !
Tapez 'help' pour voir les commandes disponibles.`,

            help: () => `
Commandes disponibles:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Portfolio:
  about       - À propos de moi
  skills      - Compétences techniques
  projects    - Projets réalisés
  experience  - Expériences professionnelles
  education   - Formation
  languages   - Langues parlées
  contact     - Informations de contact

Système:
  ls          - Lister les fichiers
  cat <file>  - Afficher le contenu d'un fichier
  pwd         - Afficher le répertoire courant
  whoami      - Afficher l'utilisateur
  date        - Afficher la date
  clear       - Effacer le terminal
  exit        - Retourner au portfolio traditionnel

Navigation:
  ↑/↓         - Historique des commandes
  Tab         - Auto-complétion`,

            section: (title, content) => `
╭─────────────────────────────────────────────────────────────╮
│${title.padStart(Math.floor((61 + title.length) / 2)).padEnd(61)}│
╰─────────────────────────────────────────────────────────────╯

${content}`
        };
    }

    get formatters() {
        const icons = { cybersecurity: '🛡️', systems: '🖥️', web: '💻', database: '🗄️', languages: '⚡', soft: '🤝' };
        const flags = { 'Français': '🇫🇷', 'Anglais': '🇬🇧', 'Espagnol': '🇪🇸' };
        const projectIcons = ['🥊', '🚗', '🌱'];

        return {
            about: (data) => `Nom: ${data.name}
Statut: ${data.title}

${data.about}

🎯 ${data.status} dans la ${data.location}`,

            skills: (skills) => Object.entries(skills).map(([key, skill]) => {
                const icon = icons[key] || '•';
                return `${icon}  ${skill.title}:\n${skill.items.map(item => `    • ${item}`).join('\n')}`;
            }).join('\n\n'),

            projects: (projects) => projects.map((project, i) => {
                const icon = projectIcons[i] || '📁';
                return `${icon} ${project.title}\n   Technologies: ${project.technologies.join(', ')}\n${project.url ? `   URL: ${project.url}\n` : ''}${project.features.map(f => `   • ${f}`).join('\n')}`;
            }).join('\n\n'),

            experience: ({ exp, interests }) => {
                let output = exp?.map(e => `🌎 ${e.title} (${e.period})\n   ${e.location}\n${e.highlights.map(h => `   • ${h}`).join('\n')}`).join('\n\n') || '';
                if (interests) output += `\n\nCentres d'intérêt:\n${interests.map(i => `🏃 ${i}`).join('\n')}`;
                return output;
            },

            education: (education) => education.map(edu => {
                let result = `🎓 ${edu.title} (${edu.period})`;
                if (edu.institution) result += `\n   ${edu.institution}`;
                if (edu.specialization) result += `\n   Spécialisation: ${edu.specialization}`;
                if (edu.subjects) result += `\n${edu.subjects.map(s => `   • ${s}`).join('\n')}`;
                return result;
            }).join('\n\n'),

            languages: (languages) => languages.map(lang => {
                const flag = flags[lang.language] || '🗣️';
                return `${flag} ${lang.language}: ${lang.level}`;
            }).join('\n'),

            contact: (data) => `📧 Email: ${data.email}
📱 Téléphone: ${data.phone}
🌍 Localisation: ${data.location}
💼 Statut: ${data.status}

N'hésitez pas à me contacter pour toute opportunité !`
        };
    }

    init() {
        this.output = document.getElementById('terminal-output');
        if (!this.output) return console.error('Terminal output element not found');
        
        if (!Terminal.hasBeenOpened) {
            this.display(this.templates.welcome(), 'welcome');
            Terminal.hasBeenOpened = true;
        }
        
        this.createInputLine();
        this.setupKeyboardListener();
    }

    setupKeyboardListener() {
        if (this.keyboardListener) document.removeEventListener('keydown', this.keyboardListener);
        
        this.keyboardListener = (e) => {
            const terminalContainer = document.getElementById('terminal-container');
            if (!terminalContainer || terminalContainer.classList.contains('hidden')) return;
            
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Escape'].includes(e.key)) return;
            
            if (this.input && document.activeElement !== this.input) {
                this.input.focus();
                if (e.key.length === 1) {
                    e.preventDefault();
                    this.input.value += e.key;
                }
            }
        };
        
        document.addEventListener('keydown', this.keyboardListener);
    }

    handleKeyDown(e) {
        const actions = {
            'Enter': () => this.executeCommand(),
            'ArrowUp': () => this.navigateHistory(-1),
            'ArrowDown': () => this.navigateHistory(1),
            'Tab': () => this.autoComplete()
        };
        
        if (actions[e.key]) {
            e.preventDefault();
            actions[e.key]();
        }
    }

    executeCommand() {
        const command = this.input.value.trim();
        if (!command) return this.createInputLine();
        
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        
        this.display(`${this.currentPath}$ ${command}`, 'command');
        this.processCommand(command);
        this.createInputLine();
    }

    processCommand(command) {
        const [cmd, ...args] = command.split(' ');
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.display(`bash: ${cmd}: command not found`, 'error');
        }
    }

    display(text, className = 'info') {
        if (!this.output) return;
        
        const div = document.createElement('div');
        div.className = className;
        div.innerHTML = text;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    formatSection(title, data, formatter) {
        if (!data) return 'Données non disponibles';
        return this.templates.section(title, formatter(data));
    }

    readFile(args) {
        if (!args?.length) return this.display('cat: missing file operand', 'error');
        
        const filename = args[0];
        if (this.files[filename]) {
            this.display(this.files[filename], 'file-content');
        } else {
            this.display(`cat: ${filename}: No such file or directory`, 'error');
        }
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.createInputLine();
    }

    exitTerminal() {
        this.display('Fermeture du terminal...', 'info');
        setTimeout(() => {
            const elements = ['terminal-container', 'portfolio-content', 'portfolio-footer']
                .map(id => document.getElementById(id));
            
            if (elements.every(el => el)) {
                elements[0].classList.add('hidden');
                elements[1].style.display = 'block';
                elements[2].style.display = 'block';
                this.destroy();
            }
        }, 500);
    }

    navigateHistory(direction) {
        if (!this.commandHistory.length) return;
        
        this.historyIndex = Math.max(0, Math.min(this.commandHistory.length, this.historyIndex + direction));
        this.input.value = this.historyIndex < this.commandHistory.length ? this.commandHistory[this.historyIndex] : '';
    }

    autoComplete() {
        const input = this.input.value;
        const parts = input.split(' ');
        const commands = Object.keys(this.commands);
        
        if (parts.length === 1) {
            const matches = commands.filter(cmd => cmd.startsWith(input));
            if (matches.length === 1) {
                this.input.value = matches[0];
            } else if (matches.length > 1) {
                this.display(`${this.currentPath}$ ${input}`, 'command');
                this.display(matches.join('  '), 'info');
            }
        } else if (parts.length >= 2 && ['cat', 'less', 'more', 'head', 'tail'].includes(parts[0])) {
            const partialFile = parts[parts.length - 1];
            const matches = Object.keys(this.files).filter(file => file.startsWith(partialFile));
            
            if (matches.length === 1) {
                parts[parts.length - 1] = matches[0];
                this.input.value = parts.join(' ');
            } else if (matches.length > 1) {
                this.display(`${this.currentPath}$ ${input}`, 'command');
                this.display(matches.join('  '), 'info');
            }
        }
    }

    createInputLine() {
        const oldInputLine = this.output?.querySelector('.terminal-input-line');
        oldInputLine?.remove();
        
        if (!this.output) return;
        
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        inputLine.innerHTML = `
            <span class="terminal-prompt">${this.currentPath}$ </span>
            <input type="text" class="terminal-input" autocomplete="off" spellcheck="false">
        `;
        
        this.output.appendChild(inputLine);
        this.input = inputLine.querySelector('.terminal-input');
        
        if (this.input) {
            this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
            this.input.focus();
        }
        
        this.scrollToBottom();
    }

    scrollToBottom() {
        if (this.output) this.output.scrollTop = this.output.scrollHeight;
    }

    destroy() {
        if (this.keyboardListener) {
            document.removeEventListener('keydown', this.keyboardListener);
            this.keyboardListener = null;
        }
    }
}

Terminal.hasBeenOpened = false;
