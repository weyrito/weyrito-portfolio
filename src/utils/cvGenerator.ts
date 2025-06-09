import { PortfolioData } from '../types/portfolio';

declare global {
  interface Window {
    jspdf: {
      jsPDF: new (options?: {
        orientation?: string;
        unit?: string;
        format?: string;
      }) => PDFDocument;
    };
  }
}

interface PDFDocument {
  setFillColor: (...color: number[]) => void;
  rect: (x: number, y: number, width: number, height: number, style?: string) => void;
  setFontSize: (size: number) => void;
  setTextColor: (...color: number[]) => void;
  setFont: (fontName: string, fontStyle?: string) => void;
  text: (text: string | string[], x: number, y: number, options?: { align?: string }) => void;
  link: (x: number, y: number, width: number, height: number, options: { url: string }) => void;
  splitTextToSize: (text: string, maxWidth: number) => string[];
  getTextWidth: (text: string) => number;
  setDrawColor: (...color: number[]) => void;
  setLineWidth: (width: number) => void;
  line: (x1: number, y1: number, x2: number, y2: number) => void;
  roundedRect: (x: number, y: number, width: number, height: number, rx: number, ry: number, style?: string) => void;
  save: (filename: string) => void;
}

interface CVConfig {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  headerHeight: number;
  footerHeight: number;
  columnGap: number;
  leftColumnWidth: number;
  rightColumnWidth: number;
}

interface CVColors {
  primary: number[];
  secondary: number[];
  accent: number[];
  text: number[];
  lightText: number[];
  white: number[];
  headerBackground: number[];
  borderLight: number[];
  link: number[];
  veryLightText: number[];
  accentLight: number[];
}

export class CVGenerator {
  private data: PortfolioData;
  private doc!: PDFDocument; 
  private config: CVConfig;
  private colors: CVColors;

  constructor(data: PortfolioData) {
    this.data = data;
    this.config = {
      pageWidth: 210,
      pageHeight: 297,
      margin: 15,
      headerHeight: 45,
      footerHeight: 20,
      columnGap: 8,
      leftColumnWidth: 65,
      rightColumnWidth: 115,
    };
    this.colors = {
      primary: [20, 40, 100],
      secondary: [45, 85, 165],
      accent: [15, 165, 115],
      text: [25, 35, 50],
      lightText: [95, 105, 125],
      white: [255, 255, 255],
      headerBackground: [20, 40, 100],
      borderLight: [200, 210, 220],
      link: [15, 165, 115],
      veryLightText: [150, 160, 170],
      accentLight: [240, 248, 255],
    };
  }

  async generatePDF(): Promise<void> {
    try {
      await this.loadJsPDF();
      this.initializeDocument();
      this.generateContent();
      this.saveDocument();
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      throw error;
    }
  }

  private async loadJsPDF(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.jspdf) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load jsPDF'));
      document.head.appendChild(script);
    });
  }

  private initializeDocument(): void {
    const { jsPDF } = window.jspdf;
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  }

  private generateContent(): void {
    if (!this.doc) {
      throw new Error('Document not initialized');
    }
    this.addHeader();
    this.generateLeftColumn();
    this.generateRightColumn();
    this.addFooter();
  }

  private addHeader(): void {
    if (!this.doc) return;
    
    // Background header
    this.doc.setFillColor(...this.colors.primary);
    this.doc.rect(0, 0, this.config.pageWidth, this.config.headerHeight, 'F');

    // Nom
    this.doc.setFontSize(18);
    this.doc.setTextColor(...this.colors.white);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(this.data.personal.name.toUpperCase(), this.config.pageWidth / 2, 18, { align: 'center' });

    // Titre
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'italic');
    this.doc.text(this.data.personal.title, this.config.pageWidth / 2, 30, { align: 'center' });

    // Contact avec liens cliquables
    this.doc.setFontSize(7);
    this.doc.setFont('helvetica', 'normal');
    const contactY = 39;
    const contactSpacing = (this.config.pageWidth - 2 * this.config.margin) / 3;
    
    // Email cliquable
    const emailX = this.config.margin + contactSpacing/2;
    this.doc.setTextColor(...this.colors.white);
    this.doc.text(this.data.personal.email, emailX, contactY, { align: 'center' });
    this.addClickableLink(
      `mailto:${this.data.personal.email}`,
      emailX - this.doc.getTextWidth(this.data.personal.email)/2,
      contactY - 2,
      this.doc.getTextWidth(this.data.personal.email),
      4
    );

    // Téléphone cliquable
    const phoneX = this.config.margin + contactSpacing + contactSpacing/2;
    this.doc.text(this.data.personal.phone, phoneX, contactY, { align: 'center' });
    this.addClickableLink(
      `tel:${this.data.personal.phone.replace(/\s/g, '')}`,
      phoneX - this.doc.getTextWidth(this.data.personal.phone)/2,
      contactY - 2,
      this.doc.getTextWidth(this.data.personal.phone),
      4
    );

    // Localisation
    const locationX = this.config.margin + 2 * contactSpacing + contactSpacing/2;
    this.doc.text(this.data.personal.location, locationX, contactY, { align: 'center' });
  }

  private addClickableLink(url: string, x: number, y: number, width: number, height: number): void {
    if (!this.doc) return;
    this.doc.link(x, y, width, height, { url: url });
  }

  private generateLeftColumn(): void {
    if (!this.doc) return;
    
    const leftX = this.config.margin;
    const leftWidth = this.config.leftColumnWidth;
    let leftY = this.config.headerHeight + this.config.margin;

    // Profil
    leftY = this.addSection('PROFIL', leftX, leftY, leftWidth);
    const profileLines = this.doc.splitTextToSize(this.data.personal.about, leftWidth);
    this.doc.setFontSize(8);
    this.doc.setTextColor(...this.colors.text);
    this.doc.text(profileLines, leftX, leftY);
    leftY += profileLines.length * 3.5 + 10;

    // Compétences
    leftY = this.addSection('COMPÉTENCES', leftX, leftY, leftWidth);
    Object.values(this.data.skills).forEach((skill) => {
      if (skill.excludeFromCV) return;
      
      this.doc.setFontSize(8);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(skill.title, leftX, leftY);
      leftY += 4;

      skill.items.forEach((item) => {
        const itemText = typeof item === 'string' ? item : item.text;
        this.doc.setFontSize(7);
        this.doc.setTextColor(...this.colors.text);
        this.doc.setFont('helvetica', 'normal');
        
        // Si l'item a une URL, on le rend cliquable
        if (typeof item === 'object' && item.url) {
          this.doc.setTextColor(...this.colors.link);
          this.doc.text(`• ${itemText}`, leftX + 2, leftY);
          this.addClickableLink(
            item.url,
            leftX + 2,
            leftY - 2,
            this.doc.getTextWidth(`• ${itemText}`),
            4
          );
        } else {
          this.doc.text(`• ${itemText}`, leftX + 2, leftY);
        }
        leftY += 3.5;
      });
      leftY += 3;
    });

    // Langues
    if (this.data.languages.length > 0) {
      leftY = this.addSection('LANGUES', leftX, leftY, leftWidth);
      this.data.languages.forEach((lang) => {
        if (lang.excludeFromCV) return;
        
        this.doc.setFontSize(8);
        this.doc.setTextColor(...this.colors.text);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(lang.language, leftX, leftY);
        
        // Niveau en badge
        const levelWidth = this.doc.getTextWidth(lang.level) + 6;
        this.doc.setFillColor(...this.colors.accent);
        this.doc.roundedRect(leftX + leftWidth - levelWidth, leftY - 3, levelWidth, 6, 2, 2, 'F');
        this.doc.setFontSize(6);
        this.doc.setTextColor(...this.colors.white);
        this.doc.text(lang.level, leftX + leftWidth - levelWidth/2, leftY + 0.5, { align: 'center' });
        leftY += 8;
      });
    }

    // Liens sociaux
    leftY += 5;
    leftY = this.addSection('LIENS', leftX, leftY, leftWidth);
    
    // GitHub
    this.doc.setFontSize(8);
    this.doc.setTextColor(...this.colors.link);
    this.doc.setFont('helvetica', 'normal');
    const githubText = 'GitHub';
    this.doc.text(`• ${githubText}`, leftX + 2, leftY);
    this.addClickableLink(
      this.data.personal.social.github,
      leftX + 2,
      leftY - 2,
      this.doc.getTextWidth(`• ${githubText}`),
      4
    );
    leftY += 6;

    // LinkedIn
    const linkedinText = 'LinkedIn';
    this.doc.text(`• ${linkedinText}`, leftX + 2, leftY);
    this.addClickableLink(
      this.data.personal.social.linkedin,
      leftX + 2,
      leftY - 2,
      this.doc.getTextWidth(`• ${linkedinText}`),
      4
    );
  }

  private generateRightColumn(): void {
    if (!this.doc) return;
    
    const rightX = this.config.margin + this.config.leftColumnWidth + this.config.columnGap;
    const rightWidth = this.config.rightColumnWidth;
    let rightY = this.config.headerHeight + this.config.margin;

    // Expériences
    rightY = this.addSection('EXPÉRIENCES PROFESSIONNELLES', rightX, rightY, rightWidth);
    this.data.experience.forEach((exp) => {
      if (exp.excludeFromCV) return;
      
      // Titre et période
      this.doc.setFontSize(9);
      this.doc.setTextColor(...this.colors.text);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(exp.title, rightX, rightY);
      
      this.doc.setFontSize(7);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'italic');
      this.doc.text(exp.period, rightX + rightWidth, rightY, { align: 'right' });
      rightY += 6;

      if (exp.location) {
        this.doc.setFontSize(7);
        this.doc.setTextColor(...this.colors.lightText);
        this.doc.text(exp.location, rightX, rightY);
        rightY += 4;
      }

      // Points clés
      exp.highlights.forEach((highlight) => {
        this.doc.setFontSize(7);
        this.doc.setTextColor(...this.colors.text);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text(`• ${highlight}`, rightX + 2, rightY);
        rightY += 3.5;
      });
      rightY += 5;
    });

    // Formations
    rightY = this.addSection('FORMATIONS', rightX, rightY, rightWidth);
    this.data.education.forEach((edu) => {
      if (edu.excludeFromCV) return;
      
      // Titre et période
      this.doc.setFontSize(9);
      this.doc.setTextColor(...this.colors.text);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text(edu.title, rightX, rightY);
      
      this.doc.setFontSize(7);
      this.doc.setTextColor(...this.colors.secondary);
      this.doc.setFont('helvetica', 'italic');
      this.doc.text(edu.period, rightX + rightWidth, rightY, { align: 'right' });
      rightY += 5;

      if (edu.institution) {
        this.doc.setFontSize(7);
        this.doc.setFont('helvetica', 'italic');
        
        if (typeof edu.institution === 'string') {
          this.doc.setTextColor(...this.colors.lightText);
          this.doc.text(edu.institution, rightX, rightY);
        } else {
          // Institution avec lien cliquable
          this.doc.setTextColor(...this.colors.link);
          this.doc.text(edu.institution.text, rightX, rightY);
          this.addClickableLink(
            edu.institution.url,
            rightX,
            rightY - 2,
            this.doc.getTextWidth(edu.institution.text),
            4
          );
        }
        rightY += 3;
      }

      if (edu.specialization) {
        this.doc.setFontSize(7);
        this.doc.setTextColor(...this.colors.accent);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(`Spécialisation: ${edu.specialization}`, rightX, rightY);
        rightY += 5;
      }
      rightY += 3;
    });

    // Projets
    if (this.data.projects.length > 0) {
      rightY = this.addSection('PROJETS CLÉS', rightX, rightY, rightWidth);
      const availableProjects = this.data.projects.filter(p => !p.excludeFromCV).slice(0, 2);
      
      availableProjects.forEach((project) => {
        this.doc.setFontSize(9);
        this.doc.setTextColor(...this.colors.text);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(project.title, rightX, rightY);
        rightY += 5;

        this.doc.setFontSize(7);
        this.doc.setTextColor(...this.colors.secondary);
        this.doc.setFont('helvetica', 'italic');
        this.doc.text(project.type, rightX, rightY);
        rightY += 4;

        // Description
        const descLines = this.doc.splitTextToSize(project.description, rightWidth);
        this.doc.setFontSize(7);
        this.doc.setTextColor(...this.colors.text);
        this.doc.setFont('helvetica', 'normal');
        this.doc.text(descLines, rightX, rightY);
        rightY += descLines.length * 3.5 + 2;

        // URL du projet cliquable
        if (project.url) {
          this.doc.setFontSize(7);
          this.doc.setTextColor(...this.colors.link);
          this.doc.setFont('helvetica', 'normal');
          const urlText = `Voir le projet: ${project.url}`;
          this.doc.text(urlText, rightX, rightY);
          this.addClickableLink(
            project.url,
            rightX,
            rightY - 2,
            this.doc.getTextWidth(urlText),
            4
          );
          rightY += 4;
        }

        // Technologies
        const techText = project.technologies.length > 5 
          ? `Technologies: ${project.technologies.slice(0, 5).join(', ')}...`
          : `Technologies: ${project.technologies.join(', ')}`;
        
        this.doc.setFontSize(6);
        this.doc.setTextColor(...this.colors.accent);
        this.doc.text(techText, rightX, rightY);
        rightY += 8;
      });
    }
  }

  private addSection(title: string, x: number, y: number, width: number): number {
    if (!this.doc) return y;
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(...this.colors.primary);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, x, y);
    
    // Ligne décorative
    this.doc.setDrawColor(...this.colors.secondary);
    this.doc.setLineWidth(1.5);
    this.doc.line(x, y + 2.5, x + width * 0.4, y + 2.5);
    
    return y + 10;
  }

  private addFooter(): void {
    if (!this.doc) return;
    
    const footerY = this.config.pageHeight - this.config.footerHeight + 8;
    
    // Ligne de séparation
    this.doc.setDrawColor(...this.colors.borderLight);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.config.margin, footerY - 5, this.config.pageWidth - this.config.margin, footerY - 5);
    
    // Texte du footer avec lien cliquable
    this.doc.setFontSize(6);
    this.doc.setTextColor(...this.colors.link);
    this.doc.setFont('helvetica', 'italic');
    const footerText = 'CV généré automatiquement sur thomas-fouquet.fr';
    this.doc.text(footerText, this.config.margin, footerY);
    this.addClickableLink(
      'https://thomas-fouquet.fr',
      this.config.margin,
      footerY - 2,
      this.doc.getTextWidth(footerText),
      4
    );
    
    // Date de mise à jour
    const currentDate = new Date().toLocaleDateString('fr-FR');
    this.doc.setTextColor(...this.colors.veryLightText);
    this.doc.text(`Mis à jour le ${currentDate}`, this.config.pageWidth - this.config.margin, footerY, { align: 'right' });
  }

  private saveDocument(): void {
    if (!this.doc) {
      throw new Error('Document not initialized');
    }
    
    const timestamp = new Date().toISOString().slice(0, 10);
    const fileName = `${this.data.personal.name.replace(/\s+/g, '_')}_CV_${timestamp}.pdf`;
    this.doc.save(fileName);
  }
}