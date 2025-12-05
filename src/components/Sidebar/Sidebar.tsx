import {
  Home,
  MessageSquare,
  Users,
  Library,
  Sparkles,
  Wrench,
  Settings,
  ChevronDown,
  Zap,
  FolderUp,
  Tag,
  Network,
  Loader,
  TrendingUp,
  UserPlus,
  Lightbulb,
  FileText,
  Languages,
  BarChart3,
  Star,
  User,
  Shield,
  Palette,
  Bell
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface SidebarProps {
  isCollapsed: boolean;
  activeSection: string;
}
interface SubMenuItem { id: string; label: string; icon: React.ElementType; }
interface NavItem { id: string; icon: React.ElementType; label: string; color: string; subItems?: SubMenuItem[]; }

const navItems: NavItem[] = [
  { id: 'home', icon: Home, label: '工作台', color: '#2D7FFD' },
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
      { id: 'knowledge-graph', label: '知识图谱', icon: Network },
      { id: 'knowledge-pending', label: '待学习内容', icon: Loader },
    ]
  },
  {
    id: 'community', icon: Users, label: '社区', color: '#F59E0B', subItems: [
      { id: 'community-feed', label: '信任内容流', icon: TrendingUp },
      { id: 'community-orgs', label: '机构媒体', icon: Shield },
      { id: 'community-follow', label: '我的关注', icon: UserPlus },
      { id: 'community-insights', label: '趋势洞察', icon: Lightbulb },
    ]
  },
  {
    id: 'tools', icon: Wrench, label: '工具', color: '#6366F1', subItems: [
      { id: 'tools-productivity', label: '生产力套件', icon: FileText },
      { id: 'tools-text', label: '文本助手', icon: Languages },
      { id: 'tools-analysis', label: '数据分析', icon: BarChart3 },
      { id: 'tools-favorites', label: '工具收藏', icon: Star },
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
  const [expandedMenus, setExpandedMenus] = useState<string[]>(allParentMenuIds());
  const navigate = useNavigate();

  function allParentMenuIds() {
    return navItems.filter(item => item.subItems).map(item => item.id);
  }

  const toggleMenu = (menuId: string) => {
    if (isCollapsed) return;
    setExpandedMenus(prev => prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]);
  };

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId);

  const handleNavigation = (id: string, isParent: boolean = false) => {
    // Map IDs to Routes
    let path = '/';
    const parts = id.split('-');

    if (id === 'home') {
      path = '/';
    } else if (parts.length === 2) {
      // e.g., knowledge-graph -> /knowledge/graph
      path = `/${parts[0]}/${parts[1]}`;
    } else if (id === 'knowledge') {
      path = '/knowledge/sources';
      toggleMenu(id);
    } else if (id === 'interaction') {
      path = '/interaction/chat';
      toggleMenu(id);
    } else if (id === 'community') {
      path = '/community/feed';
      toggleMenu(id);
    } else {
      path = `/${id}`;
      if (isParent) toggleMenu(id);
    }

    navigate(path);
  };

  return (
    <aside className={`h-screen bg-white flex flex-col transition-all duration-300 ease-soft-ease ${isCollapsed ? 'w-[72px]' : 'w-72'} shadow-[1px_0_20px_rgba(0,0,0,0.02)] z-30`}>
      {/* Logo Area */}
      <div className={`h-20 flex items-center flex-shrink-0 ${isCollapsed ? 'justify-center' : 'px-8'}`}>
        <div className="flex items-center gap-3.5">
          <div className="size-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg leading-tight tracking-tight">HoloAI</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">Enterprise</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 space-y-2 scrollbar-thin scrollbar-thumb-gray-100 hover:scrollbar-thumb-gray-200">
        {navItems.map((item) => {
          const isActive = activeSection.startsWith(item.id);
          const isItemExpanded = isMenuExpanded(item.id);
          const hasCloudEffect = isActive && !isCollapsed;

          return (
            <div key={item.id} className="px-4 mb-2">
              <div
                className={`
                  relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300 group
                  ${isActive ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                onClick={() => handleNavigation(item.id, true)}
              >
                {/* Active Indicator Line (Left) */}
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
                )}

                <item.icon
                  size={20}
                  className={`
                    transition-all duration-300 relative z-10
                    ${isActive ? 'text-blue-600' : ''}
                    ${isActive && isCollapsed ? 'text-blue-600 scale-110 drop-shadow-sm' : ''}
                  `}
                  style={{ color: !isActive ? item.color : undefined }}
                />

                {!isCollapsed && (
                  <>
                    <span className={`font-semibold text-[14px] flex-1 relative z-10 ${isActive ? 'text-blue-700' : ''}`}>
                      {item.label}
                    </span>
                    {item.subItems && (
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 opacity-50 relative z-10 ${isItemExpanded ? 'rotate-180' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(item.id);
                        }}
                      />
                    )}
                  </>
                )}

                {isActive && isCollapsed && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl opacity-100 z-0 shadow-lg shadow-blue-900/40"></div>
                )}
              </div>

              {/* Submenu */}
              {!isCollapsed && item.subItems && (
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out pl-10 space-y-0.5
                    ${isItemExpanded ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="relative border-l border-gray-100 pl-2 space-y-1">
                    {item.subItems.map(sub => {
                      const isSubActive = activeSection === sub.id;
                      return (
                        <div
                          key={sub.id}
                          className={`
                              flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] cursor-pointer transition-all duration-200
                              ${isSubActive
                              ? 'text-blue-600 font-semibold bg-blue-50/80 shadow-sm border border-blue-100/50'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 transparent-border'
                            }
                            `}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation(sub.id);
                          }}
                        >
                          <sub.icon size={15} strokeWidth={isSubActive ? 2.5 : 2} className={isSubActive ? 'animate-pulse-subtle' : ''} />
                          <span>{sub.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer / User Profile */}
      <div className={`p-4 border-t border-gray-100 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} bg-gray-50/50`}>
        <div className="relative cursor-pointer group">
          <div className="size-9 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-md group-hover:scale-105 transition-transform">
            JS
          </div>
          <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-white"></div>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-bold text-gray-800 text-xs truncate">John Smith</span>
            <span className="text-[10px] text-gray-400 truncate">john@holoai.com</span>
          </div>
        )}
        {!isCollapsed && (
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-gray-400 hover:text-gray-600 transition-all">
            <Settings size={15} />
          </button>
        )}
      </div>
    </aside>
  );
}
