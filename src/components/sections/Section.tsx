import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title: string;
}

const Section: React.FC<SectionProps> = ({ children, title }) => (
  <section className="m-4 sm:m-6 md:m-8 lg:m-12 p-4 sm:p-6 md:p-8 bg-cyber-terminal/80 border border-cyber-border rounded-xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-green/10 hover:border-primary-green group">
    <div className="absolute top-0 left-[-100%] w-full h-0.5 bg-gradient-to-r from-primary-green to-cyber-cyan transition-all duration-500 group-hover:left-0"></div>
    <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl text-primary-green mb-4 sm:mb-6 uppercase tracking-wide border-l-4 border-primary-green pl-3 sm:pl-4 relative break-words">
      <span className="text-cyber-cyan">&gt; </span>
      {title}
    </h3>
    {children}
  </section>
);

export default Section;
