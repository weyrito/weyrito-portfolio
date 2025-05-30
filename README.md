## 🎯 Description

Personal portfolio showcasing my skills, projects and experiences in cybersecurity, software architecture, and development. The site offers a traditional user interface as well as an interactive terminal for original navigation.

**Note:** This project was initially created to test Claude Sonnet 4 capabilities, but the results were so impressive that I decided to publish it as my main portfolio, replacing my previous one.

## ✨ Features

- Modern and responsive portfolio interface
- Interactive terminal with Unix commands
- Command-based navigation
- Cybersecurity theme
- Custom CSS animations
- Modular JavaScript architecture
- JSON-based data management
- PDF CV generation system with component-based architecture

## 🛠️ Technologies used

- HTML5
- CSS3 (with CSS Variables and Grid/Flexbox)
- Vanilla JavaScript (ES6 modules)
- Responsive design
- JSON for data storage
- jsPDF for dynamic CV generation

**Tech stack philosophy:** The technology stack is intentionally kept simple and lightweight, focusing on vanilla web technologies without frameworks or complex dependencies. This approach ensures fast loading times, easy maintenance, and demonstrates proficiency with core web technologies while showcasing architectural design patterns.

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/weyrito/weyrito-portfolio.git
```

2. Open `index.html` in a web browser

## 📁 Project structure

```
├── index.html              # Main HTML page
├── data.json              # Portfolio data (personal info, skills, projects)
├── css/
│   └── style.css          # Main stylesheet with cybersecurity theme
├── js/
│   ├── portfolio.js       # Main portfolio logic and rendering
│   ├── terminal.js        # Interactive terminal functionality
│   ├── utils.js           # Utility functions (DOM, Template helpers)
│   ├── cv-web-generator.js # CV generation orchestrator
│   └── components/        # Modular CV generation components
│       ├── CVColors.js           # Color scheme configuration
│       ├── CVComponentRenderer.js # High-level component rendering
│       ├── CVConfig.js           # Layout and sizing configuration
│       ├── CVLayoutManager.js    # Page layout and overflow management
│       ├── CVSectionRenderer.js  # Section formatting and styling
│       └── CVTextRenderer.js     # Text rendering and formatting
│
├── LICENSE                # MIT License
├── CNAME                  # Domain configuration
└── README.md              # Documentation
```

## 🏗️ Architecture Overview

The portfolio features a component-based architecture, particularly evident in the CV generation system:

### CV Generation Components
- **[`CVWebGenerator`](js/cv-web-generator.js)**: Main orchestrator class that coordinates the entire PDF generation process
- **[`CVLayoutManager`](js/components/CVLayoutManager.js)**: Manages page layout, headers, footers, and page overflow
- **[`CVComponentRenderer`](js/components/CVComponentRenderer.js)**: High-level component rendering (profiles, skills, projects, etc.)
- **[`CVSectionRenderer`](js/components/CVSectionRenderer.js)**: Section formatting and bullet point rendering
- **[`CVTextRenderer`](js/components/CVTextRenderer.js)**: Low-level text rendering with styling and links
- **[`CVColors`](js/components/CVColors.js)**: Centralized color scheme management
- **[`CVConfig`](js/components/CVConfig.js)**: Layout configuration and constants

### Design Patterns
- **Component Pattern**: Modular, reusable components with single responsibilities
- **Dependency Injection**: Components receive dependencies through constructors
- **Strategy Pattern**: Different rendering strategies for various content types
- **Template Method**: Consistent rendering flow with customizable steps

## 🖥️ Terminal commands

The interactive terminal supports various commands:

- `help` - Show available commands
- `about` - Personal information
- `skills` - Technical skills overview
- `projects` - Projects portfolio
- `experience` - Professional experience
- `education` - Educational background
- `languages` - Language proficiency
- `contact` - Contact information
- `ls` - List files
- `cat <file>` - Display file content
- `download <file>` - Download files (CV)
- `clear` - Clear terminal
- `exit` - Return to traditional interface

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

You are free to:

- ✅ Use this code for personal or commercial projects
- ✅ Modify and adapt the code to your needs
- ✅ Distribute copies of the code
- ✅ Include the code in larger projects

Just remember to include the original copyright notice and license in any copies or substantial portions of the software.

## 👨‍💻 Author

**Thomas Fouquet**
- Email: alternance@thomas-fouquet.fr
- Specialization: Cybersecurity & Software Architecture
- Status: Looking for internship/apprenticeship



**Last updated:** May 30 2025
