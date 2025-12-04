import React from 'react';
import { Plus, Book, Video, Link as LinkIcon } from 'lucide-react';

interface Tag {
  name: string;
  color: string;
}

interface KnowledgeItem {
  id: number;
  type: 'article' | 'video' | 'url';
  title: string;
  summary: string;
  tags: Tag[];
  status: '已分析' | '待分析';
}

const mockKnowledgeItems: KnowledgeItem[] = [
  { id: 1, type: 'article', title: 'React Hooks 深度解析', summary: 'AI摘要：本文深入探讨了 useState, useEffect, useContext 等核心 Hooks 的工作原理与最佳实践。', tags: [{ name: 'React', color: '#61DAFB' }, { name: 'Frontend', color: '#F0DB4F' }], status: '已分析' },
  { id: 2, type: 'video', title: 'CSS Grid 响应式布局教程', summary: 'AI摘要：通过实例讲解了如何使用 CSS Grid 创建灵活、强大的响应式网页布局。', tags: [{ name: 'CSS', color: '#2965f1' }, { name: 'Layout', color: '#4CAF50' }], status: '已分析' },
  { id: 3, type: 'url', title: 'MDN Web Docs: async/await', summary: 'AI摘要：关于 JavaScript 中异步编程 async/await 语法的权威指南和技术参考。', tags: [{ name: 'JavaScript', color: '#F7DF1E' }, { name: 'Async', color: '#FF5722' }], status: '待分析' },
];

const TypeIcon: React.FC<{ type: KnowledgeItem['type'] }> = ({ type }) => {
  const iconProps = { className: "w-5 h-5 text-gray-500" };
  switch (type) {
    case 'article': return <Book {...iconProps} />;
    case 'video': return <Video {...iconProps} />;
    case 'url': return <LinkIcon {...iconProps} />;
    default: return null;
  }
};

const TagChip: React.FC<{ tag: Tag }> = ({ tag }) => (
  <div className="flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-medium" style={{ backgroundColor: `${tag.color}20` }}>
    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }}></span>
    <span style={{ color: tag.color }}>{tag.name}</span>
  </div>
);

const KnowledgePage: React.FC = () => {
  return (
    <div className="h-full bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">知识库</h2>
        <button className="flex items-center gap-2 h-9 px-4 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
          <Plus size={16} />
          <span>添加内容</span>
        </button>
      </div>

      <div className="space-y-4">
        {mockKnowledgeItems.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <TypeIcon type={item.type} />
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.summary}</p>
                <div className="flex gap-2 pt-1">
                  {item.tags.map(tag => <TagChip key={tag.name} tag={tag} />)}
                </div>
              </div>
            </div>
            <div className={`text-xs font-medium py-1 px-3 rounded-full ${
              item.status === '已分析' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgePage;
