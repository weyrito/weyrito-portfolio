import { PDFDocument, CVConfig, CVColors } from './types';

export class PDFElementRenderer {
  constructor(
    private doc: PDFDocument,
    private config: CVConfig,
    private colors: CVColors
  ) {}

  addClickableLink(url: string, x: number, y: number, width: number, height: number): void {
    this.doc.link(x, y, width, height, { url: url });
  }

  addSection(title: string, x: number, y: number, width: number): number {
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

  addTextWithStyles(text: string, x: number, y: number, options: {
    fontSize?: number;
    color?: number[];
    fontStyle?: 'normal' | 'bold' | 'italic';
    align?: 'left' | 'center' | 'right';
  } = {}): void {
    const { fontSize = 8, color = this.colors.text, fontStyle = 'normal', align = 'left' } = options;
    
    this.doc.setFontSize(fontSize);
    this.doc.setTextColor(...color);
    this.doc.setFont('helvetica', fontStyle);
    this.doc.text(text, x, y, { align });
  }

  addClickableText(text: string, url: string, x: number, y: number, options: {
    fontSize?: number;
    color?: number[];
    fontStyle?: 'normal' | 'bold' | 'italic';
    align?: 'left' | 'center' | 'right';
  } = {}): void {
    const { fontSize = 8, color = this.colors.link, fontStyle = 'normal', align = 'left' } = options;
    
    this.addTextWithStyles(text, x, y, { fontSize, color, fontStyle, align });
    
    const textWidth = this.doc.getTextWidth(text);
    const adjustedX = align === 'center' ? x - textWidth/2 : align === 'right' ? x - textWidth : x;
    
    this.addClickableLink(url, adjustedX, y - 2, textWidth, 4);
  }

  addBulletPoint(text: string, x: number, y: number, options: {
    fontSize?: number;
    color?: number[];
    isClickable?: boolean;
    url?: string;
  } = {}): void {
    const { fontSize = 7, color = this.colors.text, isClickable = false, url } = options;
    const bulletText = `• ${text}`;
    
    if (isClickable && url) {
      this.addClickableText(bulletText, url, x + 2, y, { fontSize, color });
    } else {
      this.addTextWithStyles(bulletText, x + 2, y, { fontSize, color });
    }
  }

  addBadge(text: string, x: number, y: number, width: number): void {
    this.doc.setFillColor(...this.colors.accent);
    this.doc.roundedRect(x - width, y - 3, width, 6, 2, 2, 'F');
    this.doc.setFontSize(6);
    this.doc.setTextColor(...this.colors.white);
    this.doc.text(text, x - width/2, y + 0.5, { align: 'center' });
  }

  addTitleWithPeriod(title: string, period: string, x: number, y: number, width: number): number {
    this.addTextWithStyles(title, x, y, { 
      fontSize: 9, 
      color: this.colors.text, 
      fontStyle: 'bold' 
    });
    
    this.addTextWithStyles(period, x + width, y, { 
      fontSize: 7, 
      color: this.colors.secondary, 
      fontStyle: 'italic',
      align: 'right'
    });
    
    return y + 6;
  }
}
