// Classe principale
class CVWebGenerator {
    constructor(data) {
        this.data = data;
        this.doc = null;
        this.config = null;
        this.colors = null;
        this.components = {};
    }

    async loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (window.jspdf) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async loadComponents() {
        const componentFiles = [
            'js/components/CVConfig.js',
            'js/components/CVColors.js',
            'js/components/CVTextRenderer.js',
            'js/components/CVSectionRenderer.js',
            'js/components/CVLayoutManager.js',
            'js/components/CVComponentRenderer.js'
        ];

        return Promise.all(componentFiles.map(file => {
            return new Promise((resolve, reject) => {
                // Vérifier si le composant est déjà chargé
                const componentName = file.split('/').pop().replace('.js', '');
                if (window[componentName]) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = file;
                script.onload = resolve;
                script.onerror = () => reject(new Error(`Failed to load ${file}`));
                document.head.appendChild(script);
            });
        }));
    }

    filterForCV(items) {
        return items?.filter(item => item.excludeFromCV !== true) || [];
    }

    async generatePDF() {
        try {
            // Charger jsPDF et les composants
            await Promise.all([
                this.loadJsPDF(),
                this.loadComponents()
            ]);

            const { jsPDF } = window.jspdf || window;
            if (!jsPDF) {
                throw new Error('jsPDF not loaded');
            }

            // Vérifier que tous les composants sont chargés
            const requiredComponents = ['CVConfig', 'CVColors', 'CVTextRenderer', 'CVSectionRenderer', 'CVLayoutManager', 'CVComponentRenderer'];
            const missingComponents = requiredComponents.filter(comp => !window[comp]);
            
            if (missingComponents.length > 0) {
                throw new Error(`Missing components: ${missingComponents.join(', ')}`);
            }

            this._initializeDocument();
            this._initializeComponents();
            this._generateContent();
            this._saveDocument();

        } catch (error) {
            console.error('❌ Erreur lors de la génération du PDF:', error);
            throw error;
        }
    }

    _initializeDocument() {
        this.doc = new window.jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        this.config = window.CVConfig.getConfig();
        this.colors = window.CVColors.getColors();
    }

    _initializeComponents() {
        const textRenderer = new window.CVTextRenderer(this.doc, this.colors);
        const sectionRenderer = new window.CVSectionRenderer(this.doc, this.colors, textRenderer);
        const layoutManager = new window.CVLayoutManager(this.doc, this.config, this.colors, textRenderer);
        const componentRenderer = new window.CVComponentRenderer(this.doc, this.colors, textRenderer, sectionRenderer, layoutManager);

        this.components = {
            textRenderer,
            sectionRenderer,
            layoutManager,
            componentRenderer
        };
    }

    _generateContent() {
        const { personal, skills, experience, education, languages, projects } = this.data;
        const cvData = this._filterCVData({ skills, experience, education, languages, projects });

        this.components.layoutManager.addHeader(personal);
        this._generateLeftColumn(personal, cvData);
        this._generateRightColumn(cvData);
        this.components.layoutManager.addFooter();
    }

    _filterCVData(data) {
        return {
            experience: this.filterForCV(data.experience),
            education: this.filterForCV(data.education),
            projects: this.filterForCV(data.projects),
            skills: Object.values(data.skills).filter(skill => !skill.excludeFromCV),
            languages: data.languages.filter(lang => !lang.excludeFromCV),
            interests: this.data.interests ? this.data.interests.filter(interest => !interest.excludeFromCV) : []
        };
    }

    _generateLeftColumn(personal, cvData) {
        const leftX = this.config.margin;
        const leftWidth = this.config.leftColumnWidth;
        let leftY = this.config.headerHeight + this.config.margin;

        // Déléguer tout le rendu aux composants
        leftY = this.components.componentRenderer.addProfile(personal, leftX, leftY, leftWidth);
        leftY = this.components.componentRenderer.addSkills(cvData.skills, leftX, leftY, leftWidth);
        
        if (cvData.interests.length > 0) {
            this.components.componentRenderer.addInterests(cvData.interests, leftX, leftY, leftWidth);
        }
    }

    _generateRightColumn(cvData) {
        const rightX = this.config.margin + this.config.leftColumnWidth + this.config.columnGap;
        const rightWidth = this.config.rightColumnWidth;
        let rightY = this.config.headerHeight + this.config.margin;

        // Déléguer tout le rendu aux composants
        rightY = this.components.componentRenderer.addExperiences(cvData.experience, rightX, rightY, rightWidth);
        rightY = this.components.componentRenderer.addEducation(cvData.education, rightX, rightY, rightWidth);
        rightY = this.components.componentRenderer.addProjects(cvData.projects, rightX, rightY, rightWidth);
        
        if (cvData.languages.length > 0) {
            this.components.componentRenderer.addLanguages(cvData.languages, rightX, rightY, rightWidth);
        }
    }

    _saveDocument() {
        const timestamp = new Date().toISOString().slice(0, 10);
        const fileName = `${this.data.personal.name.replace(/\s+/g, '_')}_CV_${timestamp}.pdf`;
        
        try {
            this.doc.save(fileName);
            console.log(`✅ CV généré avec succès: ${fileName}`);
        } catch (error) {
            console.error('❌ Erreur lors de la génération du PDF:', error);
            throw error;
        }
    }
}

window.CVWebGenerator = CVWebGenerator;
