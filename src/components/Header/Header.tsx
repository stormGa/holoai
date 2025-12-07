import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';
import { useUser } from '../../context/UserContext.tsx';
import NotificationDropdown from './NotificationDropdown.tsx';

import UserDropdown from './UserDropdown.tsx';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { themeMode, setThemeMode } = useTheme();
  const { currentUser } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300">
      {/* Search Bar - Hidden on mobile, visible on tablet+ */}
      <div className="flex-1 max-w-2xl relative hidden md:block group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2 border border-gray-200 dark:border-slate-700 rounded-xl leading-5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 sm:text-sm transition-all duration-300"
          placeholder="搜索内容..."
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-amber-500 text-gray-400 transition-colors">
          <Mic className="h-5 w-5" />
        </div>
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-2 pl-4">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-all"
          title={themeMode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all relative ${showNotifications ? 'bg-gray-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400' : ''}`}
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 block w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
          </button>
          {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>

        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 border border-transparent hover:border-gray-200 dark:hover:border-slate-700 transition-all ${showUserMenu ? 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700' : ''}`}
          >
            <div className="size-8 rounded-full overflow-hidden flex items-center justify-center bg-indigo-100 text-indigo-600 text-sm font-bold">
              {currentUser.avatar}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block max-w-[100px] truncate">
              {currentUser.name}
            </span>
          </button>
          {showUserMenu && <UserDropdown onClose={() => setShowUserMenu(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
