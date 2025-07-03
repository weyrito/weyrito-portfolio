import { PortfolioData } from '../types/portfolio';
import { PDFDocument } from '../types/pdf';
import { CV_CONFIG, CV_COLORS } from './pdf/config';
import { CVSectionGenerator } from './pdf/sections';

type Language = 'fr' | 'en';

export class CVGenerator {
  private data: PortfolioData;
  private language: Language;
  private doc!: PDFDocument;
  private sectionGenerator!: CVSectionGenerator;

  constructor(data: PortfolioData, language: Language = 'fr') {
    this.data = data;
    this.language = language;
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
    
    this.sectionGenerator = new CVSectionGenerator(
      this.doc,
      this.data,
      CV_CONFIG,
      CV_COLORS,
      this.language
    );
  }

  private generateContent(): void {
    if (!this.doc || !this.sectionGenerator) {
      throw new Error('Document not initialized');
    }
    
    this.sectionGenerator.addHeader();
    this.sectionGenerator.generateLeftColumn();
    this.sectionGenerator.generateRightColumn();
    this.sectionGenerator.addFooter();
  }

  private saveDocument(): void {
    if (!this.doc) {
      throw new Error('Document not initialized');
    }
    
    const fileName = `${this.data.personal.name.replace(/\s+/g, '-')}-CV.pdf`;
    this.doc.save(fileName);
  }
}