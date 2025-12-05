import React, { useState } from 'react';
import { BrainCircuit, Plus } from 'lucide-react';
import { initialItems, KnowledgeItem } from './types.ts';
import { ContentCard } from './components/Shared.tsx';

const PendingView = () => {
    const [items] = useState<KnowledgeItem[]>(initialItems);
    const stagingItems = items.filter(i => i.ragStage === 'ingesting' || i.ragStage === 'review');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="col-span-full mb-2 flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <BrainCircuit size={20} className="text-[#4285F4]" />
                <div>
                    <span className="font-bold text-[#202124]">RAG 知识缓冲区：</span>
                    <span className="ml-1 opacity-80">此处的文件正在排队进入 AI 大脑。请确认标签与隐私设置以完成知识入库。</span>
                </div>
            </div>

            {stagingItems.map(item => (
                <ContentCard key={item.id} item={item} />
            ))}

            <button className="h-full min-h-[200px] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-[#4285F4] hover:border-[#4285F4] hover:bg-blue-50/10 transition-all group">
                <div className="p-4 rounded-full bg-gray-50 group-hover:bg-blue-50 mb-3 transition-colors">
                    <Plus size={32} />
                </div>
                <span className="font-medium">导入新知识</span>
            </button>
        </div>
    );
};

export default PendingView;
