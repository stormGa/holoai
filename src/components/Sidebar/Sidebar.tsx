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


interface SidebarProps {
  isCollapsed: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
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

export function Sidebar({ isCollapsed, activeSection, onSectionChange }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(allParentMenuIds());

  function allParentMenuIds() {
    return navItems.filter(item => item.subItems).map(item => item.id);
  }

  const toggleMenu = (menuId: string) => {
    if (isCollapsed) return;
    setExpandedMenus(prev => prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]);
  };

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId);

  return (
    <aside className={`h-screen bg-white flex flex-col transition-all duration-300 ease-soft-ease ${isCollapsed ? 'w-[72px]' : 'w-72'} shadow-[1px_0_20px_rgba(0,0,0,0.02)] z-30`}>
      {/* Logo Area */}
      <div className={`h-20 flex items-center flex-shrink-0 ${isCollapsed ? 'justify-center' : 'px-8'}`}>
        <div className="flex items-center gap-3.5">
          <div className="size-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && <span className="text-lg font-bold text-gray-900 tracking-tight">HoloAI</span>}
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isParentActive = activeSection.startsWith(item.id);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = isMenuExpanded(item.id);

            return (
              <div key={item.id}>
                <button
                  onClick={() => { onSectionChange(hasSubItems ? item.subItems![0].id : item.id); if (hasSubItems) toggleMenu(item.id); }}
                  className={`w-full flex items-center h-12 rounded-xl transition-all duration-200 group relative ${isCollapsed ? 'justify-center' : 'justify-between px-4'} 
                    ${isParentActive
                      ? 'bg-blue-50/80 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  {isParentActive && !isCollapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-blue-600" />
                  )}

                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-[22px] h-[22px] flex-shrink-0 transition-colors duration-200 ${isParentActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}
                      strokeWidth={isParentActive ? 2.5 : 2}
                    />
                    {!isCollapsed && (
                      <span className={`text-[15px] font-medium whitespace-nowrap transition-all duration-200 ${isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && hasSubItems && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 text-gray-400 group-hover:text-gray-600 ${isExpanded ? 'rotate-180' : ''}`}
                      strokeWidth={2}
                    />
                  )}
                </button>

                {!isCollapsed && hasSubItems && (
                  <div className="transition-all duration-300 ease-in-out overflow-hidden" style={{ maxHeight: isExpanded ? `${item.subItems!.length * 48}px` : '0px' }}>
                    <div className="pt-1 pb-1 ml-[22px] pl-[22px] border-l border-gray-100 space-y-0.5">
                      {item.subItems!.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeSection === subItem.id;

                        return (
                          <button
                            key={subItem.id}
                            onClick={() => onSectionChange(subItem.id)}
                            className={`w-full flex items-center gap-3 h-10 px-3 rounded-lg transition-all text-left duration-200
                              ${isSubActive
                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                          >
                            <SubIcon
                              className={`w-4 h-4 flex-shrink-0 transition-colors ${isSubActive ? 'text-blue-600' : 'text-gray-400'}`}
                              strokeWidth={isSubActive ? 2.5 : 2}
                            />
                            <span className="text-sm font-medium">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
