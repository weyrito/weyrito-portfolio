let portfolioData = null;

// Configuration des sections et leurs templates
const SECTION_CONFIG = {
    about: {
        title: 'À propos',
        template: (data) => `<p id="about">${data.personal.about}</p>`
    },
    skills: {
        title: 'Compétences techniques',
        template: (data) => `<div class="skills-grid" id="skills-grid"></div>`,
        populate: populateSkills
    },
    projects: {
        title: 'Projets réalisés',
        template: () => `<div id="projects-container"></div>`,
        populate: populateProjects
    },
    experience: {
        title: 'Expériences',
        template: () => `<div id="experience-container"></div>`,
        populate: populateExperience
    },
    education: {
        title: 'Formation',
        template: () => `<div id="education-container"></div>`,
        populate: populateEducation
    },
    languages: {
        title: 'Langues',
        template: () => `<ul id="languages-list"></ul>`,
        populate: populateLanguages
    },
    interests: {
        title: 'Centres d\'intérêt',
        template: () => `<ul id="interests-list"></ul>`,
        populate: populateInterests
    }
};

// Fonctions utilitaires
const DOM = {
    create: (tag, attributes = {}, content = '') => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') element.className = value;
            else if (key === 'innerHTML') element.innerHTML = value;
            else element.setAttribute(key, value);
        });
        if (content && !attributes.innerHTML) element.textContent = content;
        return element;
    },
    
    select: (selector) => document.querySelector(selector),
    selectAll: (selector) => document.querySelectorAll(selector),
    
    populate: (containerId, elements) => {
        const container = DOM.select(`#${containerId}`);
        if (!container) return;
        container.innerHTML = '';
        elements.forEach(element => {
            if (typeof element === 'string') {
                container.insertAdjacentHTML('beforeend', element);
            } else {
                container.appendChild(element);
            }
        });
    },
    
    createList: (items, transform = (item) => item) => 
        items.map(item => `<li>${transform(item)}</li>`).join('')
};

// Chargement et initialisation principale
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

async function initializePortfolio() {
    portfolioData = await loadPortfolioData();
    if (!portfolioData) {
        DOM.select('#portfolio-content').innerHTML = '<p>Erreur de chargement des données</p>';
        return;
    }
    
    updatePageMeta();
    generateHeader();
    generateSections();
    generateFooter();
    setupTerminalHandlers();
}

// Génération des différentes parties
function updatePageMeta() {
    const { personal } = portfolioData;
    document.title = `Portfolio - ${personal.name}`;
    DOM.select('#page-title').textContent = `Portfolio - ${personal.name}`;
    DOM.select('#page-description').setAttribute('content', 
        `Portfolio de ${personal.name} - ${personal.title}`);
}

function generateHeader() {
    const { personal } = portfolioData;
    const headerHTML = `
        <h1 id="name">${personal.name}</h1>
        <h2 id="title">${personal.title}</h2>
        <p><strong>Email:</strong> <span id="email">${personal.email}</span> | <strong>Téléphone:</strong> <span id="phone">${personal.phone}</span></p>
        
        <div class="terminal-toggle">
            <button id="toggle-terminal" class="terminal-btn">
                <span class="terminal-icon">></span> Mode Terminal
            </button>
        </div>
    `;
    DOM.select('#header-container').innerHTML = headerHTML;
}

function generateSections() {
    const portfolioContent = DOM.select('#portfolio-content');
    portfolioContent.innerHTML = '';
    
    Object.entries(SECTION_CONFIG).forEach(([key, config]) => {
        const section = DOM.create('section');
        const title = DOM.create('h3', {}, config.title);
        section.appendChild(title);
        
        const content = config.template(portfolioData);
        section.insertAdjacentHTML('beforeend', content);
        
        portfolioContent.appendChild(section);
        
        // Peupler le contenu si nécessaire
        if (config.populate) {
            config.populate();
        }
    });
}

function generateFooter() {
    const { personal } = portfolioData;
    const footerHTML = `
        <hr>
        <p><strong>${personal.status} dans la ${personal.location}</strong></p>
        <p>Portfolio mis à jour en mai 2025</p>
    `;
    DOM.select('#portfolio-footer').innerHTML = footerHTML;
}

// Fonctions de population spécialisées
function populateSkills() {
    const skillElements = Object.values(portfolioData.skills).map(skillCategory => 
        DOM.create('div', { 
            className: 'skill-category',
            innerHTML: `
                <h4>${skillCategory.title}</h4>
                <ul>${DOM.createList(skillCategory.items)}</ul>
            `
        })
    );
    DOM.populate('skills-grid', skillElements);
}

function populateProjects() {
    const projectElements = portfolioData.projects.map(project => {
        const technologies = project.technologies.join(', ');
        const features = DOM.createList(project.features);
        const linkHtml = project.url ? 
            `<a href="${project.url}" target="_blank" class="project-link">Voir le site</a>` : '';
        
        return DOM.create('div', {
            className: 'project-card',
            innerHTML: `
                <h4 class="project-title">${project.title}</h4>
                <p class="project-type">${project.type}</p>
                <p>${project.description}</p>
                <ul>
                    <li><strong>Technologies:</strong> ${technologies}</li>
                    ${features}
                </ul>
                ${linkHtml}
            `
        });
    });
    DOM.populate('projects-container', projectElements);
}

function populateExperience() {
    const experienceElements = portfolioData.experience.map(exp => 
        DOM.create('div', {
            innerHTML: `
                <h4>${exp.title}</h4>
                <p><em>${exp.period} | ${exp.location}</em></p>
                <ul>${DOM.createList(exp.highlights)}</ul>
            `
        })
    );
    DOM.populate('experience-container', experienceElements);
}

function populateEducation() {
    const educationElements = portfolioData.education.map(edu => {
        let content = `
            <h4>${edu.title}</h4>
            <p><em>${edu.period}${edu.institution ? ` | ${edu.institution}` : ''}</em></p>
        `;
        
        if (edu.specialization) {
            content += `<p>Spécialisation: ${edu.specialization}</p>`;
        }
        
        if (edu.subjects) {
            content += `<ul>${DOM.createList(edu.subjects)}</ul>`;
        }
        
        return DOM.create('div', { innerHTML: content });
    });
    DOM.populate('education-container', educationElements);
}

function populateLanguages() {
    const languageElements = portfolioData.languages.map(lang => 
        `<li><strong>${lang.language}:</strong> ${lang.level}</li>`
    );
    DOM.populate('languages-list', languageElements);
}

function populateInterests() {
    const interestElements = portfolioData.interests.map(interest => 
        `<li>${interest}</li>`
    );
    DOM.populate('interests-list', interestElements);
}

// Gestion des événements du terminal
function setupTerminalHandlers() {
    const toggleBtn = DOM.select('#toggle-terminal');
    const closeBtn = DOM.select('#close-terminal');
    const terminalContainer = DOM.select('#terminal-container');
    const portfolioContent = DOM.select('#portfolio-content');
    const portfolioFooter = DOM.select('#portfolio-footer');
    
    let terminal = null;

    if (toggleBtn && terminalContainer && portfolioContent && portfolioFooter) {
        toggleBtn.addEventListener('click', () => {
            terminalContainer.classList.remove('hidden');
            portfolioContent.style.display = 'none';
            portfolioFooter.style.display = 'none';
            
            setTimeout(() => {
                terminal = new Terminal();
            }, 100);
        });
    }

    if (closeBtn && terminalContainer && portfolioContent && portfolioFooter) {
        closeBtn.addEventListener('click', () => {
            terminalContainer.classList.add('hidden');
            portfolioContent.style.display = 'block';
            portfolioFooter.style.display = 'block';
            
            if (terminal) {
                terminal.destroy();
                DOM.select('#terminal-output').innerHTML = '';
                terminal = null;
            }
        });
    }
}

// Fonctions de compatibilité pour le terminal (à supprimer si possible)
function populateHTML() {
    // Cette fonction est maintenant gérée par initializePortfolio
    console.warn('populateHTML() est obsolète, utilisez initializePortfolio()');
}
