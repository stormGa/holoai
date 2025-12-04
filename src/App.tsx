import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar.tsx';
import { CollapseButton } from './components/Sidebar/CollapseButton.tsx';
import Header from './components/Header/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import ChatPage from './pages/ChatPage.tsx';
import KnowledgePage from './pages/KnowledgePage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8 bg-white h-full">
    <h1 className="text-2xl font-bold">{title}</h1>
  </div>
);

const SIDEBAR_WIDTH = 288; // w-72
const COLLAPSED_WIDTH = 72; // w-[72px]
const GAP = 24; // 1.5rem, corresponds to gap-6

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const activeComponent = useMemo(() => {
    const [mainSection] = activeSection.split('-');
    switch (mainSection) {
      case 'home': return <HomePage />;
      case 'chat': return <ChatPage />;
      case 'knowledge': return <KnowledgePage />;
      case 'community': return <CommunityPage />;
      case 'tools': return <Placeholder title="AI 工具" />;
      case 'settings': return <Placeholder title="设置" />;
      default: return <HomePage />;
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* This outer div now acts as the hover sensor area */}
      <div
        className="fixed top-0 left-0 h-full z-20"
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        // The width of the sensor area includes the sidebar and the gap
        style={{ width: (isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH) + GAP }}
      >
        <Sidebar 
          isCollapsed={isCollapsed}
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
        />
        
        <CollapseButton
          isCollapsed={isCollapsed}
          isSidebarHovered={isSidebarHovered}
          onToggle={() => setIsCollapsed(!isCollapsed)}
          sidebarWidth={SIDEBAR_WIDTH}
          collapsedWidth={COLLAPSED_WIDTH}
        />
      </div>

      {/* Main Panel with a dynamic margin that includes the gap */}
      <div 
        className="flex flex-col h-screen transition-all duration-300 ease-soft-ease"
        style={{ marginLeft: (isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH) + GAP }}
      >
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          {activeComponent}
        </main>
      </div>
    </div>
  );
}

export default App;
