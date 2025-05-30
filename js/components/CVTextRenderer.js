class CVTextRenderer {
    constructor(doc, colors) {
        this.doc = doc;
        this.colors = colors;
    }

    addText(text, x, y, options = {}) {
        const { 
            fontSize = 8, 
            color = this.colors.text, 
            align = 'left', 
            maxWidth,
            bold = false,
            italic = false,
            underline = false,
            link = null
        } = options;
        
        if (!text || typeof text !== 'string') return 0;
        
        this.doc.setFontSize(fontSize);
        this.doc.setTextColor(...color);
        
        this._setFontStyle(bold, italic);
        
        const cleanText = this._cleanText(text);
        const { finalX, textWidth, textHeight } = this._calculateTextDimensions(cleanText, x, y, align, maxWidth);
        
        this._renderText(cleanText, x, y, finalX, align, maxWidth);
        this._addTextEffects(link, underline, finalX, y, textWidth, fontSize, color);
        
        return textHeight;
    }

    _setFontStyle(bold, italic) {
        let fontStyle = 'normal';
        if (bold && italic) fontStyle = 'bolditalic';
        else if (bold) fontStyle = 'bold';
        else if (italic) fontStyle = 'italic';
        this.doc.setFont('helvetica', fontStyle);
    }

    _cleanText(text) {
        return text.replace(/[""]/g, '"').replace(/['']/g, "'");
    }

    _calculateTextDimensions(text, x, y, align, maxWidth) {
        let finalX = x;
        let textWidth = this.doc.getTextWidth(text);
        let textHeight = this.doc.getFontSize() * 0.4;
        
        if (maxWidth) {
            const lines = this.doc.splitTextToSize(text, maxWidth);
            textHeight = lines.length * this.doc.getFontSize() * 0.4;
            textWidth = Math.min(textWidth, maxWidth);
        } else {
            if (align === 'right') finalX = x - textWidth;
            else if (align === 'center') finalX = x - textWidth/2;
        }
        
        return { finalX, textWidth, textHeight };
    }

    _renderText(text, x, y, finalX, align, maxWidth) {
        if (maxWidth) {
            const lines = this.doc.splitTextToSize(text, maxWidth);
            const fontSize = this.doc.getFontSize();
            
            if (align === 'right') {
                lines.forEach((line, index) => {
                    const lineWidth = this.doc.getTextWidth(line);
                    this.doc.text(line, x - lineWidth, y + (index * fontSize * 0.4));
                });
            } else if (align === 'center') {
                lines.forEach((line, index) => {
                    const lineWidth = this.doc.getTextWidth(line);
                    this.doc.text(line, x - lineWidth/2, y + (index * fontSize * 0.4));
                });
            } else {
                this.doc.text(lines, x, y);
            }
        } else {
            this.doc.text(text, finalX, y);
        }
    }

    _addTextEffects(link, underline, finalX, y, textWidth, fontSize, color) {
        if (link) {
            this.doc.setTextColor(...this.colors.link);
            this.doc.link(finalX, y - fontSize * 0.3, textWidth, fontSize, { 
                url: link,
                target: '_blank'
            });
            this._addUnderline(finalX, y, textWidth, this.colors.link);
        } else if (underline) {
            this._addUnderline(finalX, y, textWidth, color);
        }
    }

    _addUnderline(x, y, width, color) {
        this.doc.setDrawColor(...color);
        this.doc.setLineWidth(0.2);
        this.doc.line(x, y + 1, x + width, y + 1);
    }
}

window.CVTextRenderer = CVTextRenderer;
