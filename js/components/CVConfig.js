class CVConfig {
    static getConfig() {
        return {
            pageWidth: 210,
            pageHeight: 297,
            margin: 15,
            headerHeight: 45,
            footerHeight: 20,
            columnGap: 8,
            sectionGap: 8,
            itemGap: 4,
            lineHeight: 1.4,
            leftColumnWidth: 65,
            rightColumnWidth: 115,
            minSectionHeight: 15,
            maxContentHeight: 240,
        };
    }

    static getFontSizes() {
        return {
            title: 18,
            subtitle: 10,
            sectionHeader: 10,
            normal: 8,
            small: 7,
            tiny: 6
        };
    }
}

window.CVConfig = CVConfig;
