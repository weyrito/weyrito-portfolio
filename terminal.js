class Terminal {
    constructor() {
        this.currentPath = '/home/thomas';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.output = null;
        this.input = null;
        this.prompt = null;
        this.keyboardListener = null;
        
        // Variable statique pour suivre si le terminal a déjà été ouvert
        if (!Terminal.hasBeenOpened) {
            Terminal.hasBeenOpened = false;
        }
        
        this.commands = {
            help: () => this.showHelp(),
            about: () => this.showAbout(),
            skills: () => this.showSkills(),
            projects: () => this.showProjects(),
            experience: () => this.showExperience(),
            contact: () => this.showContact(),
            education: () => this.showEducation(),
            languages: () => this.showLanguages(),
            clear: () => this.clearTerminal(),
            ls: () => this.listFiles(),
            cat: (args) => this.readFile(args),
            pwd: () => this.showPath(),
            whoami: () => this.showUser(),
            date: () => this.showDate(),
            exit: () => this.exitTerminal(),
        };

        this.files = {};
        this.initFiles();

        this.init();
    }

    async initFiles() {
        if (portfolioData && portfolioData.terminal && portfolioData.terminal.files) {
            this.files = {
                'README.md': portfolioData.terminal.files['README.md']
            };
        }
    }

    init() {
        // Vérifier que l'élément output existe
        this.output = document.getElementById('terminal-output');
        if (!this.output) {
            console.error('Terminal output element not found');
            return;
        }
        
        // N'afficher le message de bienvenue que la première fois
        if (!Terminal.hasBeenOpened) {
            this.showWelcome();
            Terminal.hasBeenOpened = true;
        }
        
        this.createInputLine();
        this.setupGlobalKeyboardListener();
    }

    setupGlobalKeyboardListener() {
        // Supprimer l'ancien écouteur s'il existe
        if (this.keyboardListener) {
            document.removeEventListener('keydown', this.keyboardListener);
        }
        
        // Créer un nouvel écouteur
        this.keyboardListener = (e) => {
            // Vérifier si le terminal est visible
            const terminalContainer = document.getElementById('terminal-container');
            if (!terminalContainer || terminalContainer.classList.contains('hidden')) {
                return;
            }
            
            // Ignorer certaines touches spéciales
            if (e.ctrlKey || e.altKey || e.metaKey) {
                return;
            }
            
            // Ignorer les touches de navigation et fonction
            const ignoredKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Escape'];
            if (ignoredKeys.includes(e.key)) {
                return;
            }
            
            // Focus sur l'input si ce n'est pas déjà fait
            if (this.input && document.activeElement !== this.input) {
                this.input.focus();
                
                // Si c'est un caractère imprimable, l'ajouter à l'input
                if (e.key.length === 1) {
                    e.preventDefault();
                    this.input.value += e.key;
                }
            }
        };
        
        // Ajouter l'écouteur global
        document.addEventListener('keydown', this.keyboardListener);
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete();
        }
    }

    executeCommand() {
        const command = this.input.value.trim();
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
            
            // Afficher la commande tapée
            this.addOutput(`${this.currentPath}$ ${command}`, 'command');
            
            // Traiter la commande
            this.processCommand(command);
        }
        
        // Créer une nouvelle ligne d'input
        this.createInputLine();
    }

    processCommand(command) {
        const [cmd, ...args] = command.split(' ');
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addOutput(`bash: ${cmd}: command not found`, 'error');
        }
    }

    addOutput(text, className = '') {
        if (!this.output) {
            console.error('Terminal output not initialized');
            return;
        }
        
        const div = document.createElement('div');
        div.className = className;
        div.innerHTML = text;
        this.output.appendChild(div);
        this.scrollToBottom();
    }

    scrollToBottom() {
        if (this.output) {
            this.output.scrollTop = this.output.scrollHeight;
        }
    }

    showWelcome() {
        this.addOutput(`
╔══════════════════════════════════════════════════════════════╗
║                    THOMAS FOUQUET TERMINAL                   ║
╚══════════════════════════════════════════════════════════════╝

Bienvenue dans mon portfolio interactif !
Tapez 'help' pour voir les commandes disponibles.
        `, 'welcome');
    }

    showHelp() {
        this.addOutput(`
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
  Tab         - Auto-complétion
        `, 'help');
    }

    showAbout() {
        const data = portfolioData?.personal;
        if (!data) {
            this.addOutput('Données non disponibles', 'error');
            return;
        }

        this.addOutput(`
╭─────────────────────────────────────────────────────────────╮
│                        À PROPOS                             │
╰─────────────────────────────────────────────────────────────╯

Nom: ${data.name}
Statut: ${data.title}

${data.about}

🎯 ${data.status} dans la ${data.location}
        `, 'info');
    }

    showSkills() {
        const skills = portfolioData?.skills;
        if (!skills) {
            this.addOutput('Données non disponibles', 'error');
            return;
        }

        let output = `
╭─────────────────────────────────────────────────────────────╮
│                   COMPÉTENCES TECHNIQUES                    │
╰─────────────────────────────────────────────────────────────╯

`;

        const icons = {
            'cybersecurity': '🛡️',
            'systems': '🖥️',
            'web': '💻',
            'database': '🗄️',
            'languages': '⚡',
            'soft': '🤝'
        };

        Object.entries(skills).forEach(([key, skill]) => {
            const icon = icons[key] || '•';
            output += `${icon}  ${skill.title}:\n`;
            skill.items.forEach(item => {
                output += `    • ${item}\n`;
            });
            output += '\n';
        });

        this.addOutput(output, 'info');
    }

    showProjects() {
        const projects = portfolioData?.projects;
        if (!projects) {
            this.addOutput('Données non disponibles', 'error');
            return;
        }

        let output = `
╭─────────────────────────────────────────────────────────────╮
│                    PROJETS RÉALISÉS                         │
╰─────────────────────────────────────────────────────────────╯

`;

        const icons = ['🥊', '🚗', '🌱'];
        
        projects.forEach((project, index) => {
            const icon = icons[index] || '📁';
            output += `${icon} ${project.title}\n`;
            output += `   Technologies: ${project.technologies.join(', ')}\n`;
            if (project.url) {
                output += `   URL: ${project.url}\n`;
            }
            project.features.forEach(feature => {
                output += `   • ${feature}\n`;
            });
            output += '\n';
        });

        this.addOutput(output, 'info');
    }

    showContact() {
        const data = portfolioData?.personal;
        if (!data) {
            this.addOutput('Données non disponibles', 'error');
            return;
        }

        this.addOutput(`
╭─────────────────────────────────────────────────────────────╮
│                       CONTACT                               │
╰─────────────────────────────────────────────────────────────╯

📧 Email: ${data.email}
📱 Téléphone: ${data.phone}
🌍 Localisation: ${data.location}
💼 Statut: ${data.status}

N'hésitez pas à me contacter pour toute opportunité !
        `, 'info');
    }

    showEducation() {
        const education = portfolioData?.education;
        if (!education) {
            this.addOutput('Données non disponibles', 'error');
            return;
        }

        let output = `
╭─────────────────────────────────────────────────────────────╮
│                       FORMATION                             │
╰─────────────────────────────────────────────────────────────╯

`;

        education.forEach(edu => {
            output += `🎓 ${edu.title} (${edu.period})\n`;
            if (edu.institution) {
                output += `   ${edu.institution}\n`;
            }
            if (edu.specialization) {
                output += `   Spécialisation: ${edu.specialization}\n`;
            }
            if (edu.subjects) {
                edu.subjects.forEach(subject => {
                    output += `   • ${subject}\n`;
                });
            }
            output += '\n';
        });

        this.addOutput(output, 'info');
    }

    showLanguages() {
        const languages = portfolioData?.languages;
        if (!languages) {
            this.addOutput('Données non disponibles', 'error');
            return;
        }

        let output = `
╭─────────────────────────────────────────────────────────────╮
│                       LANGUES                               │
╰─────────────────────────────────────────────────────────────╯

`;

        const flags = { 'Français': '🇫🇷', 'Anglais': '🇬🇧', 'Espagnol': '🇪🇸' };
        
        languages.forEach(lang => {
            const flag = flags[lang.language] || '🗣️';
            output += `${flag} ${lang.language}: ${lang.level}\n`;
        });

        this.addOutput(output, 'info');
    }

    showExperience() {
        const experience = portfolioData?.experience;
        const interests = portfolioData?.interests;
        
        if (!experience && !interests) {
            this.addOutput('Données non disponibles', 'error');
            return;
        }

        let output = `
╭─────────────────────────────────────────────────────────────╮
│                    EXPÉRIENCES                              │
╰─────────────────────────────────────────────────────────────╯

`;

        if (experience) {
            experience.forEach(exp => {
                output += `🌎 ${exp.title} (${exp.period})\n`;
                output += `   ${exp.location}\n`;
                exp.highlights.forEach(highlight => {
                    output += `   • ${highlight}\n`;
                });
                output += '\n';
            });
        }

        if (interests) {
            output += 'Centres d\'intérêt:\n';
            interests.forEach(interest => {
                output += `🏃 ${interest}\n`;
            });
        }

        this.addOutput(output, 'info');
    }

    clearTerminal() {
        this.output.innerHTML = '';
        this.createInputLine();
    }

    listFiles() {
        const files = Object.keys(this.files).join('  ');
        this.addOutput(files, 'info');
    }

    readFile(args) {
        if (!args || args.length === 0) {
            this.addOutput('cat: missing file operand', 'error');
            return;
        }
        
        const filename = args[0];
        if (this.files[filename]) {
            this.addOutput(this.files[filename], 'file-content');
        } else {
            this.addOutput(`cat: ${filename}: No such file or directory`, 'error');
        }
    }

    showPath() {
        this.addOutput(this.currentPath, 'info');
    }

    showUser() {
        this.addOutput('thomas', 'info');
        this.input.value = '';
        return;
    }

    showDate() {
        this.addOutput(new Date().toString(), 'info');
    }

    exitTerminal() {
        this.addOutput('Fermeture du terminal...', 'info');
        setTimeout(() => {
            const terminalContainer = document.getElementById('terminal-container');
            const portfolioContent = document.getElementById('portfolio-content');
            const portfolioFooter = document.getElementById('portfolio-footer');
            
            if (terminalContainer && portfolioContent && portfolioFooter) {
                terminalContainer.classList.add('hidden');
                portfolioContent.style.display = 'block';
                portfolioFooter.style.display = 'block';
                
                // Nettoyer les écouteurs d'événements
                this.destroy();
            }
        }, 500);
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
            return;
        }
        
        this.input.value = this.commandHistory[this.historyIndex] || '';
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
                this.addOutput(`${this.currentPath}$ ${input}`, 'command');
                this.addOutput(matches.join('  '), 'info');
            }    
        }
        else if (parts.length >= 2) {
            const command = parts[0];
            const partialFile = parts[parts.length - 1];
            
            const fileCommands = ['cat', 'less', 'more', 'head', 'tail'];
            if (fileCommands.includes(command)) {
                const fileNames = Object.keys(this.files);
                const matches = fileNames.filter(file => file.startsWith(partialFile));
                
                if (matches.length === 1) {
                    parts[parts.length - 1] = matches[0];
                    this.input.value = parts.join(' ');
                } else if (matches.length > 1) {
                    this.addOutput(`${this.currentPath}$ ${input}`, 'command');
                    this.addOutput(matches.join('  '), 'info');
                } else if (partialFile) {
                    this.addOutput(`${this.currentPath}$ ${input}`, 'command');
                    this.addOutput('No matches found', 'error');
                }
            }
        }
    }

    createInputLine() {
        if (!this.output) {
            console.error('Terminal output not initialized');
            return;
        }
        
        // Supprimer l'ancienne ligne d'input si elle existe
        const oldInputLine = this.output.querySelector('.terminal-input-line');
        if (oldInputLine) {
            oldInputLine.remove();
        }
        
        // Créer une nouvelle ligne d'input directement dans l'output
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        inputLine.innerHTML = `
            <span class="terminal-prompt">${this.currentPath}$ </span>
            <input type="text" class="terminal-input" autocomplete="off" spellcheck="false">
        `;
        
        // L'ajouter à la fin de l'output
        this.output.appendChild(inputLine);
        
        // Mettre à jour les références
        this.input = inputLine.querySelector('.terminal-input');
        this.prompt = inputLine.querySelector('.terminal-prompt');
        
        if (this.input) {
            // Attacher les événements
            this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
            this.input.focus();
        }
        
        this.scrollToBottom();
    }

    // Méthode pour nettoyer les écouteurs lors de la fermeture
    destroy() {
        if (this.keyboardListener) {
            document.removeEventListener('keydown', this.keyboardListener);
            this.keyboardListener = null;
        }
    }
}

// Variable statique pour suivre l'état du terminal
Terminal.hasBeenOpened = false;
