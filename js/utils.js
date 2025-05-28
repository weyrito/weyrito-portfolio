export const DOM = {
    select: (selector) => document.querySelector(selector),
    selectAll: (selector) => document.querySelectorAll(selector),
    
    create: (tag, attributes = {}, content = '') => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') element.className = value;
            else if (key === 'innerHTML') element.innerHTML = value;
            else element.setAttribute(key, value);
        });
        if (content && !attributes.innerHTML) element.textContent = content;
        return element;
    },
    
    render: (containerId, html) => {
        const container = DOM.select(`#${containerId}`);
        if (container) container.innerHTML = html;
    },
    
    append: (containerId, element) => {
        const container = DOM.select(`#${containerId}`);
        if (container) {
            if (typeof element === 'string') {
                container.insertAdjacentHTML('beforeend', element);
            } else {
                container.appendChild(element);
            }
        }
    }
};

export const Template = {
    list: (items, transform = (item) => item) => 
        items.map(item => {
            const content = typeof item === 'string' ? item : 
                           item.url ? `<a href="${item.url}" target="_blank" class="skill-link">${item.text}</a>` : item.text;
            return `<li>${transform(content)}</li>`;
        }).join(''),
    
    // Template simple avec placeholders
    compile: (template, data) => {
        return template.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
            const value = path.split('.').reduce((obj, key) => obj?.[key], data);
            return value ?? match;
        });
    }
};
