class CVSectionRenderer {
    constructor(doc, colors, textRenderer) {
        this.doc = doc;
        this.colors = colors;
        this.textRenderer = textRenderer;
    }

    addSection(title, x, y, width, options = {}) {
        const { fontSize = 10, color = this.colors.primary, lineColor = this.colors.secondary } = options;
        
        // Background subtil pour les en-têtes de section
        this.doc.setFillColor(...this.colors.accentLight);
        this.doc.roundedRect(x - 2, y - 4, width + 4, 8, 1, 1, 'F');
        
        this.textRenderer.addText(title.toUpperCase(), x, y, { 
            fontSize, 
            color, 
            bold: true 
        });
        
        // Lignes décoratives
        this._addSectionLines(x, y, width, lineColor);
        
        return y + 10;
    }

    addBulletPoint(text, x, y, maxWidth, options = {}) {
        const { bulletColor = this.colors.secondary, fontSize = 7, indent = 4, link = null } = options;
        
        // Bullet point carré arrondi
        this.doc.setFillColor(...bulletColor);
        this.doc.roundedRect(x + 1, y - 2, 2, 2, 0.3, 0.3, 'F');
        
        const textHeight = this.textRenderer.addText(text, x + indent, y, { 
            fontSize, 
            color: link ? this.colors.link : this.colors.text, 
            maxWidth: maxWidth - indent,
            link
        });
        
        return Math.max(textHeight, 3);
    }

    _addSectionLines(x, y, width, lineColor) {
        // Ligne principale colorée
        this.doc.setDrawColor(...lineColor);
        this.doc.setLineWidth(1.5);
        this.doc.line(x, y + 2.5, x + width * 0.4, y + 2.5);
        
        // Ligne subtile complète
        this.doc.setDrawColor(...this.colors.borderLight);
        this.doc.setLineWidth(0.5);
        this.doc.line(x, y + 3.5, x + width, y + 3.5);
    }
}

window.CVSectionRenderer = CVSectionRenderer;
