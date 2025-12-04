import { 
  Home, 
  MessageSquare, 
  Users, 
  Library, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Wrench,
  Settings,
  ChevronDown,
  Clock,
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

// Interfaces remain the same
interface SidebarProps {
  isCollapsed: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}
interface SubMenuItem { id: string; label: string; icon: React.ElementType; }
interface NavItem { id: string; icon: React.ElementType; label: string; color: string; subItems?: SubMenuItem[]; }

const navItems: NavItem[] = [
    { id: 'home', icon: Home, label: '工作台', color: '#2D7FFD' },
    { id: 'chat', icon: MessageSquare, label: 'AI 对话', color: '#14B8A6', subItems: [
        { id: 'chat-context', label: '情境切换', icon: Zap },
        { id: 'chat-history', label: '对话历史', icon: Clock },
    ]},
    { id: 'knowledge', icon: Library, label: '知识库', color: '#8B5CF6', subItems: [
        { id: 'knowledge-sources', label: '我的知识源', icon: FolderUp },
        { id: 'knowledge-tags', label: '智能分类', icon: Tag },
        { id: 'knowledge-graph', label: '知识图谱', icon: Network },
        { id: 'knowledge-pending', label: '待学习内容', icon: Loader },
    ]},
    { id: 'community', icon: Users, label: '社区', color: '#F59E0B', subItems: [
        { id: 'community-feed', label: '信任内容流', icon: TrendingUp },
        { id: 'community-orgs', label: '机构媒体', icon: Shield },
        { id: 'community-follow', label: '我的关注', icon: UserPlus },
        { id: 'community-insights', label: '趋势洞察', icon: Lightbulb },
    ]},
    { id: 'tools', icon: Wrench, label: '工具', color: '#6366F1', subItems: [
        { id: 'tools-productivity', label: '生产力套件', icon: FileText },
        { id: 'tools-text', label: '文本助手', icon: Languages },
        { id: 'tools-analysis', label: '数据分析', icon: BarChart3 },
        { id: 'tools-favorites', label: '工具收藏', icon: Star },
    ]},
    { id: 'settings', icon: Settings, label: '设置', color: '#64748B', subItems: [
        { id: 'settings-account', label: '账户订阅', icon: User },
        { id: 'settings-privacy', label: '隐私安全', icon: Shield },
        { id: 'settings-theme', label: '界面主题', icon: Palette },
        { id: 'settings-notifications', label: '通知管理', icon: Bell },
    ]},
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
    <aside className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-soft-ease ${isCollapsed ? 'w-[72px]' : 'w-72'}`}>
      <div className={`h-16 flex items-center border-b border-gray-200 flex-shrink-0 ${isCollapsed ? 'justify-center' : 'px-6'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2D7FFD] rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && <span className="text-base font-semibold text-gray-800 tracking-tight">全息智能</span>}
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isParentActive = activeSection.startsWith(item.id);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = isMenuExpanded(item.id);
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => { onSectionChange(hasSubItems ? item.subItems![0].id : item.id); if (hasSubItems) toggleMenu(item.id); }}
                  className={`w-full flex items-center h-11 rounded-md transition-all group relative ${isCollapsed ? 'justify-center' : 'justify-between px-3'} ${isParentActive ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                >
                  {isParentActive && !isCollapsed && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r-full" style={{ backgroundColor: item.color }} />}
                  <div className="flex items-center gap-4">
                    <Icon className="w-5 h-5 flex-shrink-0" style={{ color: item.color }} />
                    {!isCollapsed && (
                      <span className={`text-base font-medium whitespace-nowrap transition-all duration-200 ease-soft-ease ${isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'} ${isParentActive ? 'text-gray-900' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && hasSubItems && <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-gray-400 ${isExpanded ? 'rotate-180' : ''}`} />}
                </button>

                {!isCollapsed && hasSubItems && (
                  <div className="transition-all duration-300 ease-soft-ease overflow-hidden" style={{ maxHeight: isExpanded ? `${item.subItems!.length * 40}px` : '0px' }}>
                    <div className="pt-1 ml-4 pl-4 border-l border-gray-200 space-y-1">
                      {item.subItems!.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeSection === subItem.id;
                        
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => onSectionChange(subItem.id)}
                            className={`w-full flex items-center gap-2.5 h-9 px-3 rounded-md transition-all text-left ${isSubActive ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                          >
                            <SubIcon className={`w-4 h-4 flex-shrink-0 ${isSubActive ? '' : 'text-gray-500'}`} style={{ color: isSubActive ? item.color : undefined }} />
                            <span className={`text-sm ${isSubActive ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>{subItem.label}</span>
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
