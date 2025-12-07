import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { useUser } from '../../context/UserContext.tsx';

interface UserDropdownProps {
    onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const { currentUser, logout } = useUser();

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
    };

    const handleLogout = async () => {
        await logout();
        onClose();
    };

    return (
        <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full overflow-hidden flex items-center justify-center bg-indigo-100 text-indigo-600 text-lg font-bold">
                        {currentUser.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">{currentUser.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.email || 'user@example.com'}</p>
                    </div>
                </div>
            </div>

            <div className="p-1.5">
                <button
                    onClick={() => handleNavigate('/platform/settings/account')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <User size={16} className="text-gray-400" />
                    <span>个人中心</span>
                </button>
                <button
                    onClick={() => handleNavigate('/platform/settings/privacy')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Settings size={16} className="text-gray-400" />
                    <span>设置</span>
                </button>
            </div>

            <div className="p-1.5 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                >
                    <LogOut size={16} />
                    <span>退出登录</span>
                </button>
            </div>
        </div>
    );
};

export default UserDropdown;
