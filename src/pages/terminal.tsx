import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Terminal from '../components/Terminal';
import { portfolioData } from '../data/portfolio';

const TerminalPage: React.FC = () => {
  const router = useRouter();

  const handleCloseTerminal = () => {
    router.push('/');
  };

  return (
    <Layout>
      <Terminal 
        portfolioData={portfolioData}
        isOpen={true}
        onClose={handleCloseTerminal}
      />
    </Layout>
  );
};

export default TerminalPage;
