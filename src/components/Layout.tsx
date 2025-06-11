import React from 'react';
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  const canonicalUrl = "https://thomas-fouquet.fr";
  
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
        
        {/* Security Headers Meta */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Privacy and Legal */}
        <meta name="privacy-policy" content={`${canonicalUrl}/privacy`} />
        <meta name="gdpr-compliance" content="true" />
        <meta name="data-collection" content="minimal" />
        <meta name="tracking" content="none" />
        
        <link rel="icon" type="image/svg+xml" href="/terminal-fill.svg" />
        <link rel="apple-touch-icon" href="/terminal-fill.svg" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content={canonicalUrl} />
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
        <meta property="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/c80841ac-e8c4-486c-84f4-336471b97767.png?token=1Wqs8ZsYSGQtnwH9yTrxM3EJDrni46q2VpUlwTVzK3w&height=630&width=1200&expires=33284441152" />
        <meta name="twitter:image:alt" content="Portfolio Thomas Fouquet - Cybersécurité" />
        
        {/* JSON-LD Structured Data for Privacy */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Thomas Fouquet Portfolio",
            "url": canonicalUrl,
            "author": {
              "@type": "Person",
              "name": "Thomas Fouquet",
              "jobTitle": "Étudiant en cybersécurité"
            },
            "privacyPolicy": `${canonicalUrl}/privacy`,
            "dateModified": "2025-01-06"
          })}
        </script>
      </Head>
      
      <div className="min-h-screen bg-cyber-darker font-mono text-text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </div>
    </>
  );
};

export default Layout;
