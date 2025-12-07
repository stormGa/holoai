import { Home, MessageSquare, Users, Library, Sparkles, Wrench, Settings, ChevronDown, Zap, FolderUp, Tag, Network, Loader, TrendingUp, UserPlus, Lightbulb, FileText, Languages, BarChart3, Star, User, Shield, Palette, Bell, Puzzle, Briefcase, Mail, Sun, Moon, Aperture, Hash, Compass, LayoutGrid, PenTool } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.tsx';

interface SidebarProps {
  isCollapsed: boolean;
  activeSection: string;
}
interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  subItems?: SubMenuItem[];
}
interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
  subItems?: SubMenuItem[];
}

const baseNavItems: NavItem[] = [
  { id: 'home', icon: Home, label: '全息概览', color: '#2D7FFD' },
  { id: 'memory', icon: Aperture, label: '全息记忆', color: '#EC4899' },
  {
    id: 'interaction', icon: MessageSquare, label: '智能交互', color: '#14B8A6', subItems: [
      { id: 'interaction-chat', label: 'AI 对话', icon: Zap },
      { id: 'interaction-search', label: '可信数据搜', icon: Shield },
    ]
  },
  {
    id: 'knowledge', icon: Library, label: '知识库', color: '#8B5CF6', subItems: [
      { id: 'knowledge-sources', label: '我的知识源', icon: FolderUp },
      { id: 'knowledge-tags', label: '智能分类', icon: Tag },
      { id: 'knowledge-graph', label: '社交图谱', icon: Users },
      { id: 'knowledge-pending', label: '待学习内容', icon: Loader },
    ]
  },
  {
    id: 'community', icon: Users, label: '全息社区', color: '#F59E0B', subItems: [
      { id: 'community-main', label: '全息广场', icon: LayoutGrid },
      { id: 'community-create', label: '全息创作', icon: PenTool },
      { id: 'community-explore', label: '发现周边', icon: Compass },
      { id: 'community-following', label: '我的关注', icon: UserPlus },
    ]
  },
  {
    id: 'tools', icon: Wrench, label: '工具', color: '#6366F1', subItems: [
      { id: 'tools-favorites', label: '工具市场', icon: Star },
      { id: 'tools-productivity', label: '生产力套件', icon: FileText },
      { id: 'tools-text', label: '文本助手', icon: Languages },
      { id: 'tools-analysis', label: '数据分析', icon: BarChart3 }
    ]
  },
  {
    id: 'settings', icon: Settings, label: '设置', color: '#64748B', subItems: [
      { id: 'settings-account', label: '账户订阅', icon: User },
      { id: 'settings-privacy', label: '隐私安全', icon: Shield },
      { id: 'settings-theme', label: '界面主题', icon: Palette },
      { id: 'settings-notifications', label: '通知管理', icon: Bell },
    ]
  },
];

export function Sidebar({ isCollapsed, activeSection }: SidebarProps) {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['interaction', 'knowledge', 'community', 'tools', 'settings']);
  const [navItems, setNavItems] = useState<NavItem[]>(baseNavItems);
  const [followedCommunities, setFollowedCommunities] = useState<any[]>([]);

  // Simulate loading mock followed communities if any
  const loadDynamicItems = () => {
    // 1. Load Tool Favorites
    let newItems = [...baseNavItems];

    // 2. Load Followed Communities (Mock Logic via Event/State)
    // In a real app we'd fetch from API. Here we use a local check or event listener result.
    const comIdx = newItems.findIndex(i => i.id === 'community');
    if (comIdx !== -1 && followedCommunities.length > 0) {
      const baseSub = baseNavItems.find(i => i.id === 'community')?.subItems || [];
      const followedSub = followedCommunities.map(c => ({
        id: `community-${c.id}`,
        label: c.name,
        icon: Hash // Use Hash # icon for interest communities
      }));

      newItems[comIdx] = {
        ...newItems[comIdx],
        subItems: [...baseSub, { id: 'divider-com', label: '我的关注', icon: Star } as any, ...followedSub]
      };
    }

    setNavItems(newItems);
  };

  useEffect(() => {
    loadDynamicItems();

    // Listen for follow events from CommunityDirectory
    const handleFollow = (e: any) => {
      const { id, followed } = e.detail;
      setFollowedCommunities(prev => {
        if (followed) {
          // Mock name lookup
          const names: Record<string, string> = {
            'c1': '未来财经',
            'c2': '极客前沿',
            'c3': '元宇宙'
          };
          if (prev.find(c => c.id === id)) return prev;
          return [...prev, { id, name: names[id] || '社区' }];
        } else {
          return prev.filter(c => c.id !== id);
        }
      });
    };

    window.addEventListener('communityFollowed', handleFollow);
    return () => window.removeEventListener('communityFollowed', handleFollow);
  }, [followedCommunities]); // Re-run when state changes to update UI

  const toggleMenu = (id: string) => {
    if (isCollapsed) return;
    setExpandedMenus(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const isMenuExpanded = (id: string) => expandedMenus.includes(id);

  const handleNavigation = (id: string, isParent = false) => {
    let path = '/platform'; // Default to platform root
    const parts = id.split('-');
    if (id === 'home') path = '/platform';
    else if (id === 'memory') path = '/platform/memory';
    else if (parts.length === 2 && parts[0] !== 'tools' && parts[0] !== 'community') path = `/platform/${parts[0]}/${parts[1]}`;
    else if (id.startsWith('community-')) {
      if (id === 'community-explore') path = '/platform/community/explore';
      else if (id === 'community-main') path = '/platform/community/main';
      else if (id === 'community-following') path = '/platform/community/following';
      else if (id === 'community-create') path = '/platform/community/create';
      else path = `/platform/community/explore`; // For now just go to explore, or detail if implemented
    }
    else if (id.startsWith('tools-')) {
      if (id === 'tools-favorites') path = '/platform/tools/favorites';
      else if (id === 'tools-productivity') path = '/platform/tools/productivity';
      else if (id === 'tools-productivity-meeting') path = '/platform/tools/productivity/meeting-notes';
      else if (id === 'tools-productivity-okr') path = '/platform/tools/productivity/okr';
      else if (id === 'tools-productivity-email') path = '/platform/tools/productivity/email-polisher';
      else if (parts[1] === 'text' && parts[2] === 'translator') path = '/platform/tools/text/translator';
      else if (parts[1] === 'analysis' && parts[2] === 'trend') path = '/platform/tools/analysis/trend-analyzer';
      else if (parts[1] === 'analysis' && parts[2] === 'chart') path = '/platform/tools/analysis/chart-builder';
      else if (id === 'tools-text') path = '/platform/tools/text';
      else if (id === 'tools-analysis') path = '/platform/tools/analysis';
      else path = `/platform/tools/custom/${parts[1]}`;
    } else if (id === 'knowledge') { path = '/platform/knowledge/sources'; toggleMenu(id); }
    else if (id === 'interaction') { path = '/platform/interaction/chat'; toggleMenu(id); }
    else if (id === 'community') { path = '/platform/community/explore'; toggleMenu(id); }
    else if (id === 'tools') { toggleMenu(id); return; }
    else { path = `/platform/${id}`; if (isParent) toggleMenu(id); }
    navigate(path);
  };

  const { themeMode, setThemeMode } = useTheme();

  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <aside className={`h-screen bg-white dark:bg-gray-900 border-r border-transparent dark:border-gray-800 flex flex-col transition-all duration-300 ease-soft-ease ${isCollapsed ? 'w-[72px]' : 'w-72'} shadow-[1px_0_20px_rgba(0,0,0,0.02)] z-30`}>
      <div className={`h-20 flex items-center flex-shrink-0 ${isCollapsed ? 'justify-center' : 'px-8'}`}>
        <div className="flex items-center gap-3.5">
          <div className="size-9 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg leading-tight tracking-tight">HoloAI</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">企业版</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-6 space-y-2 scrollbar-thin scrollbar-thumb-gray-100 hover:scrollbar-thumb-gray-200">
        {navItems.map(item => {
          const isActive = activeSection.startsWith(item.id);
          const isItemExpanded = isMenuExpanded(item.id);
          return (
            <div key={item.id} className="px-4 mb-2">
              <div
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300 group ${isActive ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400 shadow-sm ring-1 ring-primary-100 dark:ring-primary-900/20' : 'text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`}
                onClick={() => handleNavigation(item.id, true)}
              >
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                )}
                <item.icon size={20} className={`transition-all duration-300 relative z-10 ${isActive ? 'text-primary-600 dark:text-primary-400' : ''} ${isActive && isCollapsed ? 'text-primary-600 dark:text-primary-400 scale-110 drop-shadow-sm' : ''}`} style={{ color: !isActive ? item.color : undefined }} />
                {!isCollapsed && (
                  <>
                    <span className={`font-bold text-[14px] flex-1 relative z-10 ${isActive ? 'text-primary-700 dark:text-primary-400' : 'text-gray-800 dark:text-gray-200'}`}>{item.label}</span>
                    {item.subItems && (
                      <ChevronDown size={15} className={`transition-transform duration-300 opacity-50 relative z-10 ${isItemExpanded ? 'rotate-180' : ''}`} onClick={e => { e.stopPropagation(); toggleMenu(item.id); }} />
                    )}
                  </>
                )}
                {isActive && isCollapsed && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl opacity-100 z-0 shadow-lg shadow-primary-900/40" />
                )}
              </div>
              {!isCollapsed && item.subItems && (
                <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-10 space-y-0.5 ${isItemExpanded ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                  <div className="relative border-l border-gray-200 dark:border-gray-800 pl-2 space-y-1">
                    {item.subItems.map(sub => {
                      if (sub.id === 'divider') {
                        return <div key="divider" className="px-3 py-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">{sub.label}</div>;
                      }
                      const isSubActive = activeSection === sub.id;
                      return (
                        <div
                          key={sub.id}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] cursor-pointer transition-all duration-200 ${isSubActive ? 'text-primary-700 dark:text-primary-400 font-semibold bg-primary-50/80 dark:bg-primary-900/10 shadow-sm border border-primary-100/50 dark:border-primary-900/20' : 'text-gray-700 dark:text-gray-400 font-medium hover:text-black dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transparent-border'}`}
                          onClick={e => { e.stopPropagation(); handleNavigation(sub.id); }}
                        >
                          <sub.icon size={15} strokeWidth={isSubActive ? 2.5 : 2} className={isSubActive ? 'animate-pulse-subtle' : 'opacity-80'} />
                          <span>{sub.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
