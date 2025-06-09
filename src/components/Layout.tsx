import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Thomas FOUQUET - Portfolio",
  description = "Étudiant en cybersécurité - Recherche d'alternance pour septembre 2025"
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Thomas" />
        <meta name="keywords" content="cybersécurité, portfolio, développement, sécurité informatique, hacking éthique" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="French" />
        <meta name="theme-color" content="#0a0a0a" />
        
        <link rel="icon" type="image/svg+xml" href="https://icons.getbootstrap.com/assets/icons/terminal-fill.svg" />
        <link rel="apple-touch-icon" href="https://icons.getbootstrap.com/assets/icons/terminal-fill.svg" />
        <link rel="canonical" href="https://thomas-fouquet.fr" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://thomas-fouquet.fr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/c80841ac-e8c4-486c-84f4-336471b97767.png?token=1Wqs8ZsYSGQtnwH9yTrxM3EJDrni46q2VpUlwTVzK3w&height=630&width=1200&expires=33284441152" />
        <meta property="og:image:alt" content="Portfolio Thomas Fouquet - Cybersécurité" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Thomas Portfolio" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="thomas-fouquet.fr" />
        <meta property="twitter:url" content="https://thomas-fouquet.fr" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/c80841ac-e8c4-486c-84f4-336471b97767.png?token=1Wqs8ZsYSGQtnwH9yTrxM3EJDrni46q2VpUlwTVzK3w&height=630&width=1200&expires=33284441152" />
        <meta name="twitter:image:alt" content="Portfolio Thomas Fouquet - Cybersécurité" />
        
      </Head>
      
      <div className="min-h-screen bg-cyber-darker font-mono text-text-white">
        {children}
      </div>
    </>
  );
};

export default Layout;
