import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface CommunityPost {
  id: number;
  author: string;
  isVerified: boolean;
  title: string;
  summary: string;
  tags: { name: string }[];
  imageUrl: string;
}

const mockCommunityPosts: CommunityPost[] = [
  { id: 1, author: 'Alice', isVerified: true, title: '我如何用 React Hooks 构建一个可复用的表单', summary: 'AI摘要：通过一个实用的自定义 Hook，封装了表单状态管理和验证逻辑，大大提高了开发效率。', tags: [{ name: 'React' }, { name: 'Hooks' }], imageUrl: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400' },
  { id: 2, author: 'Bob', isVerified: false, title: 'CSS-in-JS：Styled-Components vs. Emotion', summary: 'AI摘要：对比了两种流行的 CSS-in-JS 库在性能、API 设计和开发者体验方面的差异。', tags: [{ name: 'CSS' }, { name: 'Styled-Components' }], imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400' },
  { id: 3, author: 'Charlie', isVerified: true, title: '探索 WebAssembly 的未来', summary: 'AI摘要：WebAssembly 不仅仅是性能的提升，它正在为浏览器带来全新的可能性，比如运行传统的桌面应用。', tags: [{ name: 'WASM' }, { name: 'Performance' }], imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400' },
  { id: 4, author: 'David', isVerified: true, title: '构建一个轻量级的状态管理器', summary: 'AI摘要：本文介绍了如何使用 React Context 和 useReducer 来创建一个简单的、无需依赖第三方库的状态管理器。', tags: [{ name: 'React' }, { name: 'State Management' }], imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400' },
];

const CommunityCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1">
    <img src={post.imageUrl} alt={post.title} className="h-40 w-full object-cover" />
    <div className="p-4 space-y-2">
      <h4 className="font-semibold text-gray-800 truncate">{post.title}</h4>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>{post.author}</span>
        {post.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
      </div>
      <p className="text-xs text-gray-600 leading-relaxed h-16 overflow-hidden">{post.summary}</p>
      <div className="flex gap-2 pt-1">
        {post.tags.map(tag => (
          <span key={tag.name} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">{tag.name}</span>
        ))}
      </div>
    </div>
  </div>
);

const CommunityPage: React.FC = () => {
  return (
    <div className="h-full bg-white p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">社区分享</h2>
        <p className="text-sm text-gray-500 mt-1">发现、学习、分享你的见解</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCommunityPosts.map(post => (
          <CommunityCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
