export interface PDFDocument {
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

export interface CVConfig {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  headerHeight: number;
  footerHeight: number;
  columnGap: number;
  leftColumnWidth: number;
  rightColumnWidth: number;
}

export interface CVColors {
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
