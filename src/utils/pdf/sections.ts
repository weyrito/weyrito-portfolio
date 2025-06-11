import { PortfolioData } from '../../types/portfolio';
import { PDFDocument, CVConfig, CVColors } from './types';
import { PDFElementRenderer } from './elements';

export class CVSectionGenerator {
  private renderer: PDFElementRenderer;

  constructor(
    private doc: PDFDocument,
    private data: PortfolioData,
    private config: CVConfig,
    private colors: CVColors
  ) {
    this.renderer = new PDFElementRenderer(doc, config, colors);
  }

  addHeader(): void {
    // Background header
    this.doc.setFillColor(...this.colors.primary);
    this.doc.rect(0, 0, this.config.pageWidth, this.config.headerHeight, 'F');

    // Nom
    this.renderer.addTextWithStyles(
      this.data.personal.name.toUpperCase(), 
      this.config.pageWidth / 2, 
      18, 
      { fontSize: 18, color: this.colors.white, fontStyle: 'bold', align: 'center' }
    );

    // Titre
    this.renderer.addTextWithStyles(
      this.data.personal.title, 
      this.config.pageWidth / 2, 
      30, 
      { fontSize: 10, color: this.colors.white, fontStyle: 'italic', align: 'center' }
    );

    // Contact avec liens cliquables
    const contactY = 39;
    const contactSpacing = (this.config.pageWidth - 2 * this.config.margin) / 3;
    
    // Email cliquable
    const emailX = this.config.margin + contactSpacing/2;
    this.renderer.addClickableText(
      this.data.personal.email,
      `mailto:${this.data.personal.email}`,
      emailX,
      contactY,
      { fontSize: 7, color: this.colors.white, align: 'center' }
    );

    // Téléphone cliquable
    const phoneX = this.config.margin + contactSpacing + contactSpacing/2;
    this.renderer.addClickableText(
      this.data.personal.phone,
      `tel:${this.data.personal.phone.replace(/\s/g, '')}`,
      phoneX,
      contactY,
      { fontSize: 7, color: this.colors.white, align: 'center' }
    );

    // Localisation
    const locationX = this.config.margin + 2 * contactSpacing + contactSpacing/2;
    this.renderer.addTextWithStyles(
      this.data.personal.location, 
      locationX, 
      contactY, 
      { fontSize: 7, color: this.colors.white, align: 'center' }
    );
  }

  generateLeftColumn(): void {
    const leftX = this.config.margin;
    const leftWidth = this.config.leftColumnWidth;
    let leftY = this.config.headerHeight + this.config.margin;

    // Profil
    leftY = this.renderer.addSection('PROFIL', leftX, leftY, leftWidth);
    const profileLines = this.doc.splitTextToSize(this.data.personal.about, leftWidth);
    this.renderer.addTextWithStyles(profileLines.join('\n'), leftX, leftY, { fontSize: 8 });
    leftY += profileLines.length * 3.5 + 10;

    // Compétences
    leftY = this.renderer.addSection('COMPÉTENCES', leftX, leftY, leftWidth);
    Object.values(this.data.skills).forEach((skill) => {
      if (skill.excludeFromCV) return;
      
      this.renderer.addTextWithStyles(skill.title, leftX, leftY, { 
        fontSize: 8, 
        color: this.colors.secondary, 
        fontStyle: 'bold' 
      });
      leftY += 4;

      skill.items.forEach((item) => {
        const itemText = typeof item === 'string' ? item : item.text;
        const isClickable = typeof item === 'object' && !!item.url;
        
        this.renderer.addBulletPoint(itemText, leftX, leftY, {
          fontSize: 7,
          color: isClickable ? this.colors.link : this.colors.text,
          isClickable,
          url: isClickable && typeof item === 'object' ? item.url : undefined
        });
        leftY += 3.5;
      });
      leftY += 3;
    });

    // Liens sociaux
    leftY += 10;
    leftY = this.renderer.addSection('LIENS', leftX, leftY, leftWidth);
    
    // GitHub et LinkedIn
    const socialLinks = [
      { text: 'GitHub', url: this.data.personal.social.github },
      { text: 'LinkedIn', url: this.data.personal.social.linkedin }
    ];

    socialLinks.forEach(link => {
      this.renderer.addBulletPoint(link.text, leftX, leftY, {
        fontSize: 8,
        color: this.colors.link,
        isClickable: true,
        url: link.url
      });
      leftY += 6;
    });
  }

  generateRightColumn(): void {
    const rightX = this.config.margin + this.config.leftColumnWidth + this.config.columnGap;
    const rightWidth = this.config.rightColumnWidth;
    let rightY = this.config.headerHeight + this.config.margin;

    // Expériences
    rightY = this.renderer.addSection('EXPÉRIENCES PROFESSIONNELLES', rightX, rightY, rightWidth);
    this.data.experience.forEach((exp) => {
      if (exp.excludeFromCV) return;
      
      rightY = this.renderer.addTitleWithPeriod(exp.title, exp.period, rightX, rightY, rightWidth);

      if (exp.location) {
        this.renderer.addTextWithStyles(exp.location, rightX, rightY, { 
          fontSize: 7, 
          color: this.colors.lightText 
        });
        rightY += 4;
      }

      exp.highlights.forEach((highlight) => {
        this.renderer.addBulletPoint(highlight, rightX, rightY, { fontSize: 7 });
        rightY += 3.5;
      });
      rightY += 5;
    });

    // Formations
    rightY = this.renderer.addSection('FORMATIONS', rightX, rightY, rightWidth);
    this.data.education.forEach((edu) => {
      if (edu.excludeFromCV) return;
      
      rightY = this.renderer.addTitleWithPeriod(edu.title, edu.period, rightX, rightY, rightWidth);

      if (edu.institution) {
        if (typeof edu.institution === 'string') {
          this.renderer.addTextWithStyles(edu.institution, rightX, rightY, { 
            fontSize: 7, 
            color: this.colors.lightText, 
            fontStyle: 'italic' 
          });
        } else {
          this.renderer.addClickableText(
            edu.institution.text,
            edu.institution.url,
            rightX,
            rightY,
            { fontSize: 7, fontStyle: 'italic' }
          );
        }
        rightY += 3;
      }

      if (edu.specialization) {
        this.renderer.addTextWithStyles(
          `Spécialisation: ${edu.specialization}`, 
          rightX, 
          rightY, 
          { fontSize: 7, color: this.colors.accent, fontStyle: 'bold' }
        );
        rightY += 5;
      }
      rightY += 3;
    });

    // Projets
    if (this.data.projects.length > 0) {
      rightY = this.renderer.addSection('PROJETS CLÉS', rightX, rightY, rightWidth);
      const availableProjects = this.data.projects.filter(p => !p.excludeFromCV).slice(0, 2);
      
      availableProjects.forEach((project) => {
        this.renderer.addTextWithStyles(project.title, rightX, rightY, { 
          fontSize: 9, 
          fontStyle: 'bold' 
        });
        rightY += 5;

        this.renderer.addTextWithStyles(project.type, rightX, rightY, { 
          fontSize: 7, 
          color: this.colors.secondary, 
          fontStyle: 'italic' 
        });
        rightY += 4;

        // Description
        const descLines = this.doc.splitTextToSize(project.description, rightWidth);
        this.renderer.addTextWithStyles(descLines.join('\n'), rightX, rightY, { fontSize: 7 });
        rightY += descLines.length * 3.5 + 2;

        // URL du projet cliquable
        if (project.url) {
          const urlText = `Voir le projet: ${project.url}`;
          this.renderer.addClickableText(urlText, project.url, rightX, rightY, { fontSize: 7 });
          rightY += 4;
        }

        // Technologies
        const techText = project.technologies.length > 5 
          ? `Technologies: ${project.technologies.slice(0, 5).join(', ')}...`
          : `Technologies: ${project.technologies.join(', ')}`;
        
        this.renderer.addTextWithStyles(techText, rightX, rightY, { 
          fontSize: 6, 
          color: this.colors.accent 
        });
        rightY += 8;
      });
    }

    // Langues
    if (this.data.languages.length > 0) {
      rightY = this.renderer.addSection('LANGUES', rightX, rightY, rightWidth);
      this.data.languages.forEach((lang) => {
        if (lang.excludeFromCV) return;
        
        this.renderer.addTextWithStyles(lang.language, rightX, rightY, { 
          fontSize: 8, 
          fontStyle: 'bold' 
        });
        
        const levelWidth = this.doc.getTextWidth(lang.level) + 6;
        this.renderer.addBadge(lang.level, rightX + rightWidth, rightY, levelWidth);
        rightY += 8;
      });
    }
  }

  addFooter(): void {
    const footerY = this.config.pageHeight - this.config.footerHeight + 8;
    
    // Ligne de séparation
    this.doc.setDrawColor(...this.colors.borderLight);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.config.margin, footerY - 5, this.config.pageWidth - this.config.margin, footerY - 5);
    
    // Texte du footer avec lien cliquable
    const footerText = 'CV généré automatiquement sur thomas-fouquet.fr';
    this.renderer.addClickableText(
      footerText,
      'https://thomas-fouquet.fr',
      this.config.margin,
      footerY,
      { fontSize: 6, fontStyle: 'italic' }
    );
    
    // Date de mise à jour
    const currentDate = new Date().toLocaleDateString('fr-FR');
    this.renderer.addTextWithStyles(
      `Mis à jour le ${currentDate}`, 
      this.config.pageWidth - this.config.margin, 
      footerY, 
      { fontSize: 6, color: this.colors.veryLightText, align: 'right' }
    );
  }
}
