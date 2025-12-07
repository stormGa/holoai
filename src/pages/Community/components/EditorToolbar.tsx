import React from 'react';
import { Bold, Italic, Link as LinkIcon, Image, List, Code, Quote, Heading } from 'lucide-react';

interface EditorToolbarProps {
    onInsert: (prefix: string, suffix?: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onInsert }) => {
    return (
        <div className="p-3 border-b border-gray-100 dark:border-slate-800 flex items-center gap-1 overflow-x-auto bg-white dark:bg-slate-900 sticky top-0 z-10">
            <ToolbarButton icon={<Heading size={18} />} label="Heading" onClick={() => onInsert('### ', '')} />
            <ToolbarButton icon={<Bold size={18} />} label="Bold" onClick={() => onInsert('**', '**')} />
            <ToolbarButton icon={<Italic size={18} />} label="Italic" onClick={() => onInsert('*', '*')} />
            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-2" />
            <ToolbarButton icon={<LinkIcon size={18} />} label="Link" onClick={() => onInsert('[', '](url)')} />
            <ToolbarButton icon={<Image size={18} />} label="Image" onClick={() => onInsert('![Alt text](', ')')} />
            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-2" />
            <ToolbarButton icon={<List size={18} />} label="List" onClick={() => onInsert('- ', '')} />
            <ToolbarButton icon={<Quote size={18} />} label="Quote" onClick={() => onInsert('> ', '')} />
            <ToolbarButton icon={<Code size={18} />} label="Code" onClick={() => onInsert('```\n', '\n```')} />
        </div>
    );
};

const ToolbarButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        title={label}
        type="button"
    >
        {icon}
    </button>
);

export default EditorToolbar;
