import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CollapseButtonProps {
  isCollapsed: boolean;
  isSidebarHovered: boolean;
  onToggle: () => void;
  sidebarWidth: number;
  collapsedWidth: number;
}

export const CollapseButton: React.FC<CollapseButtonProps> = ({
  isCollapsed,
  isSidebarHovered,
  onToggle,
  sidebarWidth,
  collapsedWidth,
}) => {
  const buttonLeftPosition = isCollapsed ? collapsedWidth - 12 : sidebarWidth - 12;

  return (
    <button
      onClick={onToggle}
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-gray-300 shadow-md hover:border-blue-500 transition-all duration-200 flex items-center justify-center ${
        isSidebarHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ left: `${buttonLeftPosition}px` }}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {isCollapsed ? (
        <ChevronRight className="w-4 h-4 text-gray-600" />
      ) : (
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      )}
    </button>
  );
};
