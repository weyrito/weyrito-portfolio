class CVColors {
    static getColors() {
        return {
            primary: [20, 40, 100],         
            secondary: [45, 85, 165],       
            accent: [15, 165, 115],         
            text: [25, 35, 50],             
            lightText: [95, 105, 125],      
            veryLightText: [140, 150, 165], 
            background: [250, 252, 255],    
            white: [255, 255, 255],
            link: [20, 100, 200],
            headerBackground: [15, 30, 80],
            accentLight: [200, 235, 220],
            borderLight: [220, 230, 240]
        };
    }

    static getContactColors() {
        return {
            email: [255, 255, 255],
            phone: [200, 210, 220],
            location: [200, 210, 220]
        };
    }
}

window.CVColors = CVColors;
