export interface Tag {
    name: string;
    color: string;
}

export interface KnowledgeItem {
    id: number;
    type: 'article' | 'video' | 'url' | 'image' | 'pdf';
    title: string;
    source: string;
    summary: string;
    tags: Tag[];
    status: '已分析' | '待分析' | '分析中' | '待确认';
    date: string;
    size?: string;
    verification?: string;
    ragStage?: 'ingesting' | 'review' | 'ready';
    ingestProgress?: number;
    reviewType?: 'tag_confirm' | 'sensitive_check' | 'duplicate_check';
    aiSuggestion?: string;
    similarItem?: string;
}

export interface GraphNode {
    id: string;
    x: number;
    y: number;
    r: number;
    label: string;
    group: 'hub' | 'tech' | 'design' | 'finance';
    color: string;
    description: string;
}

export interface GraphLink {
    source: string;
    target: string;
    strength: number;
}

// Mock Data
export const initialItems: KnowledgeItem[] = [
    { id: 1, type: 'article', title: 'React Hooks 深度解析', source: '内部文档', summary: '关于 useState、useEffect 和自定义 Hook 模式的综合指南。', tags: [{ name: 'React', color: '#61DAFB' }, { name: '前端', color: '#F0DB4F' }], status: '已分析', date: '2024年3月20日', size: '2.4 MB', verification: '技术主管于3月21日验证', ragStage: 'ready' },
    { id: 2, type: 'video', title: '高级 CSS Grid 布局', source: 'Youtube', summary: '掌握使用 CSS Grid 和 Flexbox 的现代网页布局。', tags: [{ name: 'CSS', color: '#2965f1' }], status: '已分析', date: '2024年3月18日', size: '150 MB', verification: '设计团队于3月19日验证', ragStage: 'ready' },
    { id: 3, type: 'image', title: '系统架构图', source: 'Figma 导出', summary: '微服务架构的高层概览。', tags: [{ name: '架构', color: '#FF5722' }], status: '已分析', date: '2024年3月15日', size: '4.2 MB', verification: '系统自动验证', ragStage: 'ready' },
    { id: 101, type: 'pdf', title: '2024世界经济展望.pdf', source: '文件上传', summary: '正在进行全文提取与分块处理...', tags: [], status: '分析中', date: '刚刚', size: '12 MB', ragStage: 'ingesting', ingestProgress: 45 },
    { id: 102, type: 'url', title: 'TypeScript 5.5 新特性', source: 'DevBlog', summary: 'AI 已生成摘要，建议添加“前端开发”标签。', tags: [{ name: 'TypeScript', color: '#3178C6' }], status: '待确认', date: '1分钟前', ragStage: 'review', reviewType: 'tag_confirm', aiSuggestion: '建议标签: 前端开发' },
    { id: 103, type: 'article', title: 'Q1 财务审计报告_草稿', source: '内部网盘', summary: '检测到包含敏感财务数据。', tags: [{ name: '财务', color: '#EF4444' }], status: '待确认', date: '10分钟前', ragStage: 'review', reviewType: 'sensitive_check' },
    { id: 104, type: 'article', title: 'React Hooks 指南 (副本)', source: '文件上传', summary: '检测到与 "React Hooks 深度解析" 内容高度相似 (98%)。', tags: [], status: '待确认', date: '20分钟前', ragStage: 'review', reviewType: 'duplicate_check', similarItem: 'React Hooks 深度解析' },
];
