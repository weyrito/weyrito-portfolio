class CVComponentRenderer {
    constructor(doc, colors, textRenderer, sectionRenderer, layoutManager) {
        this.doc = doc;
        this.colors = colors;
        this.textRenderer = textRenderer;
        this.sectionRenderer = sectionRenderer;
        this.layoutManager = layoutManager;
    }

    addSkillCategory(skill, x, y, maxWidth) {
        if (this.layoutManager.checkPageOverflow(y + 15)) return y;
        
        this.textRenderer.addText(skill.title, x, y, { 
            fontSize: 8, 
            color: this.colors.secondary, 
            bold: true 
        });
        y += 4;
        
        skill.items.forEach(item => {
            if (this.layoutManager.checkPageOverflow(y + 5)) return;
            
            const itemText = typeof item === 'string' ? item : item.text;
            const itemLink = typeof item === 'object' && item.url ? item.url : null;
            
            const itemHeight = this.sectionRenderer.addBulletPoint(itemText, x, y, maxWidth, {
                fontSize: 7,
                link: itemLink
            });
            y += itemHeight + 1;
        });
        
        return y + 3;
    }

    addExperienceItem(exp, x, y, maxWidth, index, isLast) {
        const requiredHeight = 30;
        
        if (this.layoutManager.checkPageOverflow(y, requiredHeight)) {
            y = this.layoutManager.addPageBreak();
        }
        
        this._addTimeline(x, y, isLast);
        y = this._addExperienceContent(exp, x, y, maxWidth);
        
        return y + this.layoutManager.config.sectionGap;
    }

    addEducationItem(edu, x, y, maxWidth, index, isLast) {
        if (this.layoutManager.checkPageOverflow(y + 15)) return y;
        
        y = this._addEducationHeader(edu, x, y, maxWidth);
        y = this._addEducationDetails(edu, x, y);
        
        return y + (isLast ? 0 : this.layoutManager.config.sectionGap);
    }

    addProjectItem(project, x, y, maxWidth, index, isLast) {
        if (this.layoutManager.checkPageOverflow(y + 20)) return y;
        
        y = this._addProjectTitle(project, x, y, maxWidth);
        y = this._addProjectDetails(project, x, y, maxWidth);
        
        if (!isLast) {
            y = this._addProjectSeparator(x, y, maxWidth);
        }
        
        return y;
    }

    addLanguageItem(lang, x, y, maxWidth) {
        if (this.layoutManager.checkPageOverflow(y + 8)) return y;
        
        this.textRenderer.addText(lang.language, x, y, { 
            fontSize: 8, 
            color: this.colors.text, 
            bold: true 
        });
        
        this._addLanguageLevel(lang, x, y, maxWidth);
        
        return y + 8;
    }

    addProfile(personal, x, y, width) {
        y = this.sectionRenderer.addSection('Profil', x, y, width);
        const aboutHeight = this.textRenderer.addText(personal.about, x, y, { 
            fontSize: 8, 
            color: this.colors.text, 
            maxWidth: width 
        });
        return y + aboutHeight + this.layoutManager.config.sectionGap;
    }

    addSkills(skills, x, y, width) {
        if (this.layoutManager.checkPageOverflow(y + 30)) return y;
        
        y = this.sectionRenderer.addSection('Compétences', x, y, width);
        skills.forEach(skill => {
            y = this.addSkillCategory(skill, x, y, width);
        });
        return y + this.layoutManager.config.sectionGap;
    }

    addInterests(interests, x, y, width) {
        if (this.layoutManager.checkPageOverflow(y + 25)) return y;
        
        y = this.sectionRenderer.addSection("Centres d'intérêt", x, y, width);
        interests.forEach(interest => {
            if (this.layoutManager.checkPageOverflow(y + 5)) return;
            
            const interestText = typeof interest === 'string' ? interest : interest.text;
            const interestHeight = this.sectionRenderer.addBulletPoint(interestText, x, y, width, { 
                bulletColor: this.colors.accent,
                fontSize: 7
            });
            y += interestHeight + 1;
        });
        return y;
    }

    addExperiences(experiences, x, y, width) {
        y = this.sectionRenderer.addSection('Expériences professionnelles', x, y, width);
        experiences.forEach((exp, index) => {
            y = this.addExperienceItem(exp, x, y, width, index, index === experiences.length - 1);
        });
        return y;
    }

    addEducation(education, x, y, width) {
        if (this.layoutManager.checkPageOverflow(y + 30)) return y;
        
        y = this.sectionRenderer.addSection('Formations', x, y, width);
        education.forEach((edu, index) => {
            y = this.addEducationItem(edu, x, y, width, index, index === education.length - 1);
        });
        return y + this.layoutManager.config.sectionGap;
    }

    addProjects(projects, x, y, width) {
        if (this.layoutManager.checkPageOverflow(y + 40)) return y;
        
        y = this.sectionRenderer.addSection('Projets clés', x, y, width);
        const availableProjects = projects.slice(0, 2);
        availableProjects.forEach((project, index) => {
            y = this.addProjectItem(project, x, y, width, index, index === availableProjects.length - 1);
        });
        return y + this.layoutManager.config.sectionGap;
    }

    addLanguages(languages, x, y, width) {
        if (this.layoutManager.checkPageOverflow(y + 30)) return y;
        
        y = this.sectionRenderer.addSection('Langues', x, y, width);
        languages.forEach(lang => {
            y = this.addLanguageItem(lang, x, y, width);
        });
        return y + this.layoutManager.config.sectionGap;
    }

    _addTimeline(x, y, isLast) {
        // Dot de timeline
        this.doc.setFillColor(...this.colors.secondary);
        this.doc.circle(x - 3, y + 2, 1.8, 'F');
        
        // Ligne de timeline
        if (!isLast) {
            this.doc.setDrawColor(...this.colors.veryLightText);
            this.doc.setLineWidth(0.8);
            const lineEnd = Math.min(y + 25, this.layoutManager.config.pageHeight - this.layoutManager.config.footerHeight - 10);
            this.doc.line(x - 3, y + 4, x - 3, lineEnd);
        }
    }

    _addExperienceContent(exp, x, y, maxWidth) {
        // Titre et période
        this.textRenderer.addText(exp.title, x, y, { 
            fontSize: 9, 
            color: this.colors.text, 
            bold: true,
            maxWidth: maxWidth - 50
        });
        
        this.textRenderer.addText(exp.period, x + maxWidth, y, { 
            fontSize: 7, 
            color: this.colors.secondary, 
            align: 'right',
            italic: true,
            bold: true
        });
        y += 6;

        // Lieu
        if (exp.location) {
            this.textRenderer.addText(exp.location, x, y, { 
                fontSize: 7, 
                color: this.colors.lightText,
                italic: true
            });
            y += 4;
        }

        // Points clés
        exp.highlights.forEach(highlight => {
            if (this.layoutManager.checkPageOverflow(y, 8)) {
                y = this.layoutManager.addPageBreak();
            }
            
            const highlightHeight = this.sectionRenderer.addBulletPoint(highlight, x, y, maxWidth, {
                fontSize: 7,
                bulletColor: this.colors.accent
            });
            y += highlightHeight + 2;
        });
        
        return y;
    }

    _addProjectTitle(project, x, y, maxWidth) {
        this.textRenderer.addText(project.title, x, y, { 
            fontSize: 9, 
            color: this.colors.text, 
            bold: true,
            maxWidth: maxWidth - 20
        });
        y += 5;

        this.textRenderer.addText(project.type, x, y, { 
            fontSize: 7, 
            color: this.colors.secondary,
            italic: true
        });
        
        return y + 4;
    }

    _addProjectDetails(project, x, y, maxWidth) {
        // Description
        const descHeight = this.textRenderer.addText(project.description, x, y, { 
            fontSize: 7, 
            color: this.colors.text, 
            maxWidth: maxWidth
        });
        y += descHeight + 2;

        // Technologies
        const techText = project.technologies.length > 5 
            ? `Technologies: ${project.technologies.slice(0, 5).join(', ')}...`
            : `Technologies: ${project.technologies.join(', ')}`;
        
        this.textRenderer.addText(techText, x, y, { 
            fontSize: 6, 
            color: this.colors.accent,
            maxWidth: maxWidth 
        });
        y += 6;

        // URL
        if (project.url) {
            this.textRenderer.addText(project.url, x, y, { 
                fontSize: 6, 
                color: this.colors.link,
                maxWidth: maxWidth,
                link: project.url
            });
            y += 6;
        }
        
        return y;
    }

    _addProjectSeparator(x, y, maxWidth) {
        this.doc.setDrawColor(...this.colors.veryLightText);
        this.doc.setLineWidth(0.3);
        this.doc.line(x, y + 1, x + maxWidth * 0.5, y + 1);
        return y + 4;
    }

    _addEducationHeader(edu, x, y, maxWidth) {
        this.textRenderer.addText(edu.title, x, y, { 
            fontSize: 9, 
            color: this.colors.text, 
            bold: true,
            maxWidth: maxWidth - 50
        });
        
        this.textRenderer.addText(edu.period, x + maxWidth, y, { 
            fontSize: 7, 
            color: this.colors.secondary, 
            align: 'right',
            italic: true,
            bold: true
        });
        
        return y + 5;
    }

    _addEducationDetails(edu, x, y) {
        if (edu.institution) {
            const institutionText = typeof edu.institution === 'string' ? 
                edu.institution : edu.institution.text;
            const institutionLink = typeof edu.institution === 'object' && edu.institution.url ? 
                edu.institution.url : null;
            
            this.textRenderer.addText(institutionText, x, y, { 
                fontSize: 7, 
                color: institutionLink ? this.colors.link : this.colors.lightText,
                italic: true,
                link: institutionLink
            });
            y += 3;
        }

        if (edu.specialization) {
            this.textRenderer.addText(`Spécialisation: ${edu.specialization}`, x, y, { 
                fontSize: 7, 
                color: this.colors.accent,
                bold: true
            });
            y += 5;
        }
        
        return y;
    }

    _addLanguageLevel(lang, x, y, maxWidth) {
        const levelWidth = this.doc.getTextWidth(lang.level) + 6;
        this.doc.setFillColor(...this.colors.accent);
        this.doc.roundedRect(x + maxWidth - levelWidth, y - 3, levelWidth, 6, 2, 2, 'F');
        this.textRenderer.addText(lang.level, x + maxWidth - levelWidth/2, y + 0.5, { 
            fontSize: 6, 
            color: this.colors.white, 
            align: 'center',
            bold: true
        });
    }
}

window.CVComponentRenderer = CVComponentRenderer;
