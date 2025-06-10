import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout 
      title="Politique de Confidentialité - Thomas Fouquet"
      description="Politique de confidentialité et protection des données personnelles du portfolio de Thomas Fouquet"
    >
      <div className="min-h-screen bg-cyber-darker">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-cyber-terminal/80 border border-cyber-border rounded-xl p-6 sm:p-8 backdrop-blur-xl">
            <Link 
              href="/"
              className="inline-flex items-center text-cyber-cyan hover:text-primary-green transition-colors mb-6 text-sm"
            >
              <span className="mr-2">←</span>
              Retour au portfolio
            </Link>

            <h1 className="font-orbitron text-2xl sm:text-3xl text-primary-green mb-8 border-l-4 border-primary-green pl-4">
              Politique de Confidentialité
            </h1>

            <div className="space-y-8 text-sm sm:text-base leading-relaxed">
              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">1. Informations générales</h2>
                <p className="mb-4">
                  Ce site web personnel (<strong>thomas-fouquet.fr</strong>) est édité par Thomas Fouquet, 
                  étudiant en informatique spécialisé en cybersécurité.
                </p>
                <p className="text-text-gray">
                  <strong>Contact :</strong> thomasfouquet76@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">2. Données collectées</h2>
                <p className="mb-4">Ce portfolio respecte votre vie privée et collecte un minimum de données :</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Données de navigation :</strong> Aucun cookie de tracking ou analytics n&apos;est utilisé</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Stockage local :</strong> Préférences du terminal (historique des commandes) stockées uniquement dans votre navigateur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Logs serveur :</strong> Hébergeur peut conserver des logs d&apos;accès basiques (IP, date, pages visitées) pour la sécurité</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">3. Utilisation des données</h2>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span>Les données de stockage local améliorent votre expérience utilisateur (terminal)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span>Aucune donnée n&apos;est vendue, partagée ou utilisée à des fins commerciales</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span>Aucun profiling ou tracking publicitaire</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">4. Services externes</h2>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Google Fonts :</strong> Chargement des polices depuis Google (soumis à leur politique de confidentialité)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>jsPDF :</strong> Bibliothèque pour génération PDF chargée depuis CDN</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Hébergement :</strong> Site hébergé avec des mesures de sécurité standards</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">5. Vos droits</h2>
                <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Droit d&apos;accès :</strong> Connaître les données vous concernant</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Droit de rectification :</strong> Corriger des données inexactes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Droit à l&apos;effacement :</strong> Demander la suppression de vos données</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Droit d&apos;opposition :</strong> Vous opposer au traitement de vos données</span>
                  </li>
                </ul>
                <p className="mt-4 text-text-gray">
                  Pour exercer ces droits : <a href="mailto:thomasfouquet76@gmail.com" className="text-cyber-cyan hover:text-primary-green underline">thomasfouquet76@gmail.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">6. Sécurité</h2>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>HTTPS :</strong> Toutes les communications sont chiffrées</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Headers de sécurité :</strong> CSP, HSTS et autres mesures de protection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                    <span><strong>Pas de cookies :</strong> Aucun cookie de tracking ou publicitaire</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">7. Contact et réclamations</h2>
                <p className="mb-4">
                  Pour toute question concernant cette politique de confidentialité ou vos données personnelles :
                </p>
                <div className="bg-cyber-dark/50 border border-cyber-border/50 rounded-lg p-4">
                  <p><strong>Email :</strong> thomasfouquet76@gmail.com</p>
                  <p className="mt-2 text-text-gray text-sm">
                    En cas de litige, vous pouvez également saisir la CNIL : 
                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-cyber-cyan hover:text-primary-green underline ml-1">
                      www.cnil.fr
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl text-cyber-cyan font-orbitron mb-4">8. Modifications</h2>
                <p>
                  Cette politique peut être mise à jour. La date de dernière modification est affichée ci-dessous.
                </p>
              </section>

              <div className="border-t border-cyber-border/50 pt-6 mt-8 text-center text-text-gray text-sm">
                <p>Dernière mise à jour : 10 juin 2025</p>
                <p className="mt-2">
                  Ce site respecte votre vie privée et ne collecte aucune donnée personnelle sans votre consentement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
