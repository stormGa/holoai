import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar.tsx';
import { CollapseButton } from './components/Sidebar/CollapseButton.tsx';
import Header from './components/Header/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import ChatPage from './pages/ChatPage.tsx';
import KnowledgePage from './pages/KnowledgePage.tsx';
import TrustedSearchPage from './pages/TrustedSearchPage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';

// Knowledge Sub-Views
import SourcesView from './pages/Knowledge/SourcesView.tsx';
import TagsView from './pages/Knowledge/TagsView.tsx';
import GraphView from './pages/Knowledge/GraphView.tsx';
import PendingView from './pages/Knowledge/PendingView.tsx';

const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8 bg-white h-full">
    <h1 className="text-2xl font-bold">{title}</h1>
  </div>
);

const SIDEBAR_WIDTH = 288;
const COLLAPSED_WIDTH = 72;
const GAP = 24;

const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const location = useLocation();

  // Helper to determine active section for Sidebar highlighting based on URL
  const getActiveSection = () => {
    const path = location.pathname.substring(1); // remove leading /
    const parts = path.split('/');
    if (parts.length === 0 || parts[0] === '') return 'home';

    // Construct ID to match Sidebar items (e.g., 'knowledge-graph')
    if (parts.length >= 2) {
      return `${parts[0]}-${parts[1]}`;
    }
    return parts[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="fixed top-0 left-0 h-full z-20"
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        style={{ width: (isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH) + GAP }}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          activeSection={getActiveSection()}
        />

        <CollapseButton
          isCollapsed={isCollapsed}
          isSidebarHovered={isSidebarHovered}
          onToggle={() => setIsCollapsed(!isCollapsed)}
          sidebarWidth={SIDEBAR_WIDTH}
          collapsedWidth={COLLAPSED_WIDTH}
        />
      </div>

      <div
        className="flex flex-col h-screen transition-all duration-300 ease-soft-ease"
        style={{ marginLeft: (isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH) + GAP }}
      >
        <Header />

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* Interaction */}
            <Route path="/interaction/chat" element={<ChatPage />} />
            <Route path="/interaction/search" element={<TrustedSearchPage />} />

            {/* Knowledge Base (Nested Routes) */}
            <Route path="/knowledge" element={<KnowledgePage />}>
              <Route index element={<Navigate to="sources" replace />} />
              <Route path="sources" element={<SourcesView />} />
              <Route path="tags" element={<TagsView />} />
              <Route path="graph" element={<GraphView />} />
              <Route path="pending" element={<PendingView />} />
            </Route>

            {/* Community */}
            <Route path="/community/*" element={<CommunityPage />} />

            {/* Tools & Settings */}
            <Route path="/tools/*" element={<Placeholder title="AI 工具" />} />
            <Route path="/settings/*" element={<Placeholder title="设置" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
