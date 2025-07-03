import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Layout 
      title={`${t('privacyPolicyTitle')} - Thomas Fouquet`}
      description={t('privacyPolicyDescription')}
    >
      <div className="min-h-screen bg-cyber-darker relative">
        {/* Language switcher positioned in top right */}
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-cyber-terminal/80 border border-cyber-border rounded-xl p-6 sm:p-8 backdrop-blur-xl">
            <Link 
              href="/"
              className="inline-flex items-center text-cyber-cyan hover:text-primary-green transition-colors mb-6 text-sm"
            >
              <span className="mr-2">←</span>
              {t('backToPortfolio')}
            </Link>

            <h1 className="font-orbitron text-2xl sm:text-3xl text-primary-green mb-8 border-l-4 border-primary-green pl-4">
              {t('privacyPolicyTitle')}
            </h1>

            <div className="space-y-8 text-sm sm:text-base leading-relaxed">
              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">1. {t('generalInformation')}</h2>
                <p className="mb-4">
                  {t('privacyGeneralInfo')}
                </p>
                <p className="text-text-gray">
                  <strong>{t('contact')} :</strong> {t('privacyContactInfo').replace('Contact : ', '')}
                </p>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">2. {t('dataCollected')}</h2>
                <p className="mb-4">{t('privacyDataRespect')}</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyNavigationData')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyLocalStorage')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyServerLogs')}</strong></span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">3. {t('privacyDataUsage')}</h2>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span>{t('privacyDataUsageImprove')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span>{t('privacyNoSelling')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span>{t('privacyNoTracking')}</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">4. {t('privacyExternalServices')}</h2>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyGoogleFonts')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyJsPDF')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyHosting')}</strong></span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">5. {t('userRights')}</h2>
                <p className="mb-4">{t('privacyRightsGDPR')}</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyRightAccess')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyRightRectification')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyRightErasure')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyRightOpposition')}</strong></span>
                  </li>
                </ul>
                <p className="mt-4 text-text-gray">
                  {t('privacyExerciseRights').replace('thomasfouquet76@gmail.com', '')}<a href="mailto:thomasfouquet76@gmail.com" className="text-cyber-cyan hover:text-primary-green underline">thomasfouquet76@gmail.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">6. {t('privacySecurity')}</h2>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyHTTPS')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacySecurityHeaders')}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>{t('privacyNoCookies')}</strong></span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">7. {t('privacyContactAndComplaints')}</h2>
                <p className="mb-4">
                  {t('privacyContactQuestion')}
                </p>
                <div className="bg-cyber-dark/50 border border-cyber-border/50 rounded-lg p-4">
                  <p><strong>{t('privacyEmail')}</strong></p>
                  <p className="mt-2 text-text-gray text-sm">
                    {t('privacyCNILInfo').replace('www.cnil.fr', '')}<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-cyber-cyan hover:text-primary-green underline ml-1">
                      www.cnil.fr
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">8. {t('privacyModifications')}</h2>
                <p>
                  {t('privacyModificationInfo')}
                </p>
              </section>

              <div className="border-t border-cyber-border/50 pt-6 mt-8 text-center text-text-gray text-sm">
                <p>{t('privacyLastUpdate')}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
