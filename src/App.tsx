import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar.tsx';
import { CollapseButton } from './components/Sidebar/CollapseButton.tsx';
import Header from './components/Header/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import ChatPage from './pages/Interaction/ChatPage.tsx';
import TrustedSearchPage from './pages/Interaction/TrustedSearchPage.tsx';
import MemoryPage from './pages/Memory/MemoryPage.tsx';

// Community Pages (TCC)
import MainCommunityView from './pages/Community/MainCommunityView.tsx';
import CommunityDirectory from './pages/Community/CommunityDirectory.tsx';
import SubCommunityView from './pages/Community/SubCommunityView.tsx';
import FollowingPage from './pages/Community/FollowingPage.tsx';
import CreatePostPage from './pages/Community/CreatePostPage.tsx';

// Tools Pages
import ProductivityPage from './pages/Tools/ProductivityPage.tsx';
import TextHelperPage from './pages/Tools/TextHelperPage.tsx';
import DataAnalysisPage from './pages/Tools/DataAnalysisPage.tsx';
import FavoritesPage from './pages/Tools/FavoritesPage.tsx';
import TranslatorPage from './pages/Tools/sub/TranslatorPage.tsx';
import TrendAnalyzerPage from './pages/Tools/sub/TrendAnalyzerPage.tsx';
import ChartBuilderPage from './pages/Tools/sub/ChartBuilderPage.tsx';
import MeetingNotesPage from './pages/Tools/sub/MeetingNotesPage.tsx';
import OKRGeneratorPage from './pages/Tools/sub/OKRGeneratorPage.tsx';
import EmailPolisherPage from './pages/Tools/sub/EmailPolisherPage.tsx';

// Knowledge Sub-Views
import SourcesView from './pages/Knowledge/SourcesView.tsx';
import TagsView from './pages/Knowledge/TagsView.tsx';
import GraphView from './pages/Knowledge/GraphView.tsx';
import PendingView from './pages/Knowledge/PendingView.tsx';

// Settings Pages
import AccountPage from './pages/Settings/AccountPage.tsx';
import PrivacyPage from './pages/Settings/PrivacyPage.tsx';
import ThemePage from './pages/Settings/ThemePage.tsx';
import NotificationsPage from './pages/Settings/NotificationsPage.tsx';


const SIDEBAR_WIDTH = 288;
const COLLAPSED_WIDTH = 72;
const GAP = 24;

// Import WelcomePage
import WelcomePage from './pages/Welcome/WelcomePage.tsx';

const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const location = useLocation();

  const getActiveSection = (path: string) => {
    // Remove /platform prefix for matching
    const p = path.replace(/^\/platform/, '') || '/';

    if (p === '/' || p === '') return 'home';
    if (p.startsWith('/memory')) return 'memory';
    if (p.startsWith('/knowledge/graph')) return 'knowledge-graph';
    if (p.startsWith('/knowledge/tags')) return 'knowledge-tags';
    if (p.startsWith('/knowledge/pending')) return 'knowledge-pending';
    if (p.startsWith('/knowledge')) return 'knowledge-sources';
    if (p.startsWith('/interaction')) return 'interaction';
    if (p.startsWith('/community')) return 'community';
    if (p.startsWith('/tools/favorites')) return 'tools-favorites';
    if (p.startsWith('/tools/productivity/meeting-notes')) return 'tools-productivity-meeting';
    if (p.startsWith('/tools/productivity/okr')) return 'tools-productivity-okr';
    if (p.startsWith('/tools/productivity/email-polisher')) return 'tools-productivity-email';
    if (p.startsWith('/tools/productivity')) return 'tools-productivity';
    if (p.startsWith('/tools/text/translator')) return 'tools-text-translator';
    if (p.startsWith('/tools/text')) return 'tools-text';
    if (p.startsWith('/tools/analysis/trend-analyzer')) return 'tools-analysis-trend';
    if (p.startsWith('/tools/analysis/chart-builder')) return 'tools-analysis-chart';
    if (p.startsWith('/tools/analysis')) return 'tools-analysis';

    if (p.startsWith('/settings/account')) return 'settings-account';
    if (p.startsWith('/settings/privacy')) return 'settings-privacy';
    if (p.startsWith('/settings/theme')) return 'settings-theme';
    if (p.startsWith('/settings/notifications')) return 'settings-notifications';
    if (p.startsWith('/settings')) return 'settings';

    return p.substring(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div
        className="fixed top-0 left-0 h-full z-20"
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        style={{ width: (isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH) + GAP }}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          activeSection={getActiveSection(location.pathname)}
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
            <Route path="/home" element={<Navigate to="/platform" replace />} />

            {/* Interaction */}
            <Route path="/memory" element={<MemoryPage />} />
            <Route path="/interaction/chat" element={<ChatPage />} />
            <Route path="/interaction/search" element={<TrustedSearchPage />} />

            {/* Knowledge Base */}
            <Route path="/knowledge" element={<Navigate to="/platform/knowledge/sources" replace />} />
            <Route path="/knowledge/sources" element={<SourcesView />} />
            <Route path="/knowledge/tags" element={<TagsView />} />
            <Route path="/knowledge/graph" element={<GraphView />} />
            <Route path="/knowledge/pending" element={<PendingView />} />

            {/* Community (TCC) */}
            <Route path="/community" element={<Navigate to="/platform/community/main" replace />} />
            <Route path="/community/main" element={<MainCommunityView />} />
            <Route path="/community/create" element={<CreatePostPage />} />
            <Route path="/community/explore" element={<CommunityDirectory />} />
            <Route path="/community/following" element={<FollowingPage />} />
            <Route path="/community/sub/:id" element={<SubCommunityView />} />

            {/* Tools */}
            <Route path="/tools" element={<Navigate to="/platform/tools/productivity" replace />} />
            <Route path="/tools/productivity" element={<ProductivityPage />} />
            <Route path="/tools/productivity/meeting-notes" element={<MeetingNotesPage />} />
            <Route path="/tools/productivity/okr" element={<OKRGeneratorPage />} />
            <Route path="/tools/productivity/email-polisher" element={<EmailPolisherPage />} />
            <Route path="/tools/text" element={<TextHelperPage />} />
            <Route path="/tools/analysis" element={<DataAnalysisPage />} />
            <Route path="/tools/favorites" element={<FavoritesPage />} />
            <Route path="/tools/text/translator" element={<TranslatorPage />} />
            <Route path="/tools/analysis/trend-analyzer" element={<TrendAnalyzerPage />} />
            <Route path="/tools/analysis/chart-builder" element={<ChartBuilderPage />} />

            {/* Settings */}
            <Route path="/settings" element={<Navigate to="/platform/settings/account" replace />} />
            <Route path="/settings/account" element={<AccountPage />} />
            <Route path="/settings/privacy" element={<PrivacyPage />} />
            <Route path="/settings/theme" element={<ThemePage />} />
            <Route path="/settings/notifications" element={<NotificationsPage />} />

            <Route path="*" element={<Navigate to="/platform" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

import { ThemeProvider } from './context/ThemeContext.tsx';

import { UserProvider, useUser } from './context/UserContext.tsx';

// Protected Route Wrapper
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    // Or a spinner
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
      <div className="size-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
    </div>;
  }

  if (!currentUser) {
    // Redirect them to the / page, but save the current location they were testing
    // to send them along to that page after they login, which makes for a nicer user experience
    // For now just /
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<WelcomePage />} />

            {/* Protected Routes (Platform) */}
            <Route path="/platform/*" element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            } />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
