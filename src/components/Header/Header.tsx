import React from 'react';
import { Search, Mic, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center py-4 px-6 relative bg-white border-b border-gray-200">
      {/* A1: Global Search Bar */}
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="搜索个人知识库或社区内容..."
          className="w-full h-12 pl-11 pr-12 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 rounded-full focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <Mic className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Right-side controls */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
        {/* A2: Notifications / Dynamic Reminders */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
          {/* Red dot for new notifications */}
          <span className="absolute top-2 right-2 block w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <button className="w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <img src="https://i.pravatar.cc/40" alt="User" className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
};

export default Header;
