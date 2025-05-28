import { DOM, Template } from './utils.js';

let portfolioData = null;

// Templates HTML simplifiés avec placeholders
const TEMPLATES = {
    header: `
        <h1 id="name">{{personal.name}}</h1>
        <h2 id="title">{{personal.title}}</h2>
        <p><strong>Email:</strong> <a href="mailto:{{personal.email}}" target="_blank" id="email">{{personal.email}}</a> | <strong>Téléphone:</strong> <span id="phone">{{personal.phone}}</span></p>
        <div class="terminal-toggle">
            <button id="toggle-terminal" class="terminal-btn">
                <span class="terminal-icon">></span> Mode Terminal
            </button>
        </div>`,
    
    footer: `
        <hr>
        <p><strong>{{personal.status}} dans la {{personal.location}}</strong></p>
        <p>Portfolio mis à jour en mai 2025</p>`
};

const SECTIONS = [
    {
        id: 'about',
        title: 'À propos',
        render: (data) => `<p id="about">${data.personal.about}</p>`
    },
    {
        id: 'skills',
        title: 'Compétences techniques',
        render: (data) => {
            const skillsHtml = Object.values(data.skills)
                .map(skill => `
                    <div class="skill-category">
                        <h4>${skill.title}</h4>
                        <ul>${Template.list(skill.items)}</ul>
                    </div>`).join('');
            return `<div class="skills-grid">${skillsHtml}</div>`;
        }
    },
    {
        id: 'projects',
        title: 'Projets réalisés',
        render: (data) => {
            const projectsHtml = data.projects.map(project => `
                <div class="project-card">
                    <h4 class="project-title">${project.title}</h4>
                    <p class="project-type">${project.type}</p>
                    <p>${project.description}</p>
                    <ul>
                        <li><strong>Technologies:</strong> ${project.technologies.join(', ')}</li>
                        ${Template.list(project.features)}
                    </ul>
                    ${project.url ? `<a href="${project.url}" target="_blank" class="project-link">Voir le site</a>` : ''}
                </div>`).join('');
            return `<div id="projects-container">${projectsHtml}</div>`;
        }
    },
    {
        id: 'experience',
        title: 'Expériences',
        render: (data) => {
            const expHtml = data.experience.map(exp => `
                <div>
                    <h4>${exp.title}</h4>
                    <p><em>${exp.period}${exp.location ? ` | ${exp.location}` : ''}</em></p>
                    <ul>${Template.list(exp.highlights)}</ul>
                </div>`).join('');
            return `<div id="experience-container">${expHtml}</div>`;
        }
    },
    {
        id: 'education',
        title: 'Formation',
        render: (data) => {
            const eduHtml = data.education.map(edu => `
                <div>
                    <h4>${edu.title}</h4>
                    <p><em>${edu.period}${edu.institution ? ` | ${edu.institution}` : ''}</em></p>
                    ${edu.specialization ? `<p>Spécialisation: ${edu.specialization}</p>` : ''}
                    ${edu.subjects ? `<ul>${Template.list(edu.subjects)}</ul>` : ''}
                </div>`).join('');
            return `<div id="education-container">${eduHtml}</div>`;
        }
    },
    {
        id: 'languages',
        title: 'Langues',
        render: (data) => {
            const langHtml = data.languages.map(lang => 
                `<li><strong>${lang.language}:</strong> ${lang.level}</li>`
            ).join('');
            return `<ul id="languages-list">${langHtml}</ul>`;
        }
    },
    {
        id: 'interests',
        title: 'Centres d\'intérêt',
        render: (data) => {
            const interestsHtml = Template.list(data.interests);
            return `<ul id="interests-list">${interestsHtml}</ul>`;
        }
    }
];

// Fonctions principales
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        portfolioData = await response.json();
        return portfolioData;
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        return null;
    }
}

function updatePageMeta() {
    const { personal } = portfolioData;
    document.title = `Portfolio - ${personal.name}`;
    DOM.select('#page-title').textContent = `Portfolio - ${personal.name}`;
    DOM.select('#page-description').setAttribute('content', 
        `Portfolio de ${personal.name} - ${personal.title}`);
}

function renderSection(section, data) {
    return `
        <section>
            <h3>${section.title}</h3>
            ${section.render(data)}
        </section>`;
}

function renderPortfolio() {
    // Header
    DOM.render('header-container', Template.compile(TEMPLATES.header, portfolioData));
    
    // Sections
    const sectionsHtml = SECTIONS.map(section => renderSection(section, portfolioData)).join('');
    DOM.render('portfolio-content', sectionsHtml);
    
    // Footer
    DOM.render('portfolio-footer', Template.compile(TEMPLATES.footer, portfolioData));
}

function setupTerminalHandlers() {
    const toggleBtn = DOM.select('#toggle-terminal');
    const closeBtn = DOM.select('#close-terminal');
    const terminalContainer = DOM.select('#terminal-container');
    const portfolioContent = DOM.select('#portfolio-content');
    const portfolioFooter = DOM.select('#portfolio-footer');
    
    let terminal = null;

    toggleBtn?.addEventListener('click', () => {
        terminalContainer?.classList.remove('hidden');
        if (portfolioContent) portfolioContent.style.display = 'none';
        if (portfolioFooter) portfolioFooter.style.display = 'none';
        
        setTimeout(() => terminal = new Terminal(), 100);
    });

    closeBtn?.addEventListener('click', () => {
        terminalContainer?.classList.add('hidden');
        if (portfolioContent) portfolioContent.style.display = 'block';
        if (portfolioFooter) portfolioFooter.style.display = 'block';
        
        if (terminal) {
            terminal.destroy();
            DOM.render('terminal-output', '');
            terminal = null;
        }
    });
}

// Fonction principale d'initialisation
export async function initializePortfolio() {
    portfolioData = await loadPortfolioData();
    
    if (!portfolioData) {
        DOM.render('portfolio-content', '<p>Erreur de chargement des données</p>');
        return;
    }
    
    updatePageMeta();
    renderPortfolio();
    setupTerminalHandlers();
}

// Fonction de compatibilité (obsolète)
window.populateHTML = () => {
    console.warn('populateHTML() est obsolète, utilisez initializePortfolio()');
};

// Export pour le terminal
window.portfolioData = portfolioData;
