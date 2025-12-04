import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard.tsx';

const HomePage: React.FC = () => {
  return (
    // This page is responsible for providing the gray canvas for the dashboard cards
    <div className="w-full bg-gray-50">
      <Dashboard />
    </div>
  );
};

export default HomePage;
