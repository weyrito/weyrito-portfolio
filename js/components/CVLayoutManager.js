class CVLayoutManager {
    constructor(doc, config, colors, textRenderer) {
        this.doc = doc;
        this.config = config;
        this.colors = colors;
        this.textRenderer = textRenderer;
        this.currentPage = 1;
        this.totalPages = 1;
    }

    checkPageOverflow(currentY, requiredHeight = 10) {
        const availableSpace = this.config.pageHeight - this.config.footerHeight - 5;
        return (currentY + requiredHeight) > availableSpace;
    }

    addPageBreak() {
        this.addFooter();
        this.doc.addPage();
        this.currentPage++;
        this.totalPages = Math.max(this.totalPages, this.currentPage);
        return this.config.margin + 10;
    }

    addHeader(personal) {
        this.doc.setFillColor(...this.colors.headerBackground);
        this.doc.rect(0, 0, this.config.pageWidth, this.config.headerHeight, 'F');
        
        this.doc.setFillColor(...this.colors.accent);
        this.doc.triangle(this.config.pageWidth - 70, 0, this.config.pageWidth, 0, this.config.pageWidth, 30, 'F');
        
        this._addHeaderText(personal);
        this._addContactInfo(personal);
    }

    addFooter() {
        const footerY = this.config.pageHeight - this.config.footerHeight + 8;
        
        this.doc.setDrawColor(...this.colors.borderLight);
        this.doc.setLineWidth(0.5);
        this.doc.line(this.config.margin, footerY - 5, this.config.pageWidth - this.config.margin, footerY - 5);
        
        this._addFooterContent(footerY);
    }

    _addHeaderText(personal) {
        this.textRenderer.addText(personal.name.toUpperCase(), this.config.pageWidth / 2, 18, { 
            fontSize: 18,
            color: this.colors.white, 
            align: 'center',
            bold: true
        });
        
        this.textRenderer.addText(personal.title, this.config.pageWidth / 2, 30, { 
            fontSize: 10,
            color: [220, 225, 235], 
            align: 'center',
            italic: true
        });
    }

    _addContactInfo(personal) {
        const contactY = 39;
        const contactInfo = [
            { text: personal.email, link: `mailto:${personal.email}`, bold: false },
            { text: personal.phone, link: `tel:${personal.phone}`, bold: true },
            { text: personal.location, link: null, bold: true }
        ];
        
        const contactSpacing = (this.config.pageWidth - 2 * this.config.margin) / contactInfo.length;
        contactInfo.forEach((info, index) => {
            const xPos = this.config.margin + (index * contactSpacing) + contactSpacing/2;
            this.textRenderer.addText(info.text, xPos, contactY, { 
                fontSize: 7, 
                color: info.link ? [255, 255, 255] : [200, 210, 220],
                align: 'center',
                link: info.link,
                bold: info.bold
            });
        });
    }

    _addFooterContent(footerY) {
        this.textRenderer.addText('CV généré automatiquement sur thomas-fouquet.fr', this.config.margin, footerY, { 
            fontSize: 6, 
            color: this.colors.link,
            italic: true,
            link: 'https://thomas-fouquet.fr'
        });
        
        if (this.totalPages > 1) {
            this.textRenderer.addText(`Page ${this.currentPage}/${this.totalPages}`, this.config.pageWidth / 2, footerY, { 
                fontSize: 6, 
                color: this.colors.veryLightText,
                align: 'center',
                italic: true
            });
        }
        
        const currentDate = new Date().toLocaleDateString('fr-FR');
        this.textRenderer.addText(`Mis à jour le ${currentDate}`, this.config.pageWidth - this.config.margin, footerY, { 
            fontSize: 6, 
            color: this.colors.veryLightText,
            align: 'right',
            italic: true
        });
    }
}

window.CVLayoutManager = CVLayoutManager;
