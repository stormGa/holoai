import React from 'react';
import { Outlet } from 'react-router-dom';

const KnowledgePage = () => {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default KnowledgePage;
