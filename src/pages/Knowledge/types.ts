export interface Tag {
    name: string;
    color: string;
}

export interface KnowledgeSpace {
    id: string;
    name: string;
    description: string;
    docCount: number;
    updatedAt: string;
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
    spaceId?: string; // Optional linkage to a space
}

export interface GraphNode {
    id: string;
    x: number;
    y: number;
    r: number;
    label: string;
    group: string;
    color: string;
    description: string;
    avatar?: string;
    vx?: number;
    vy?: number;
}

export interface GraphLink {
    source: string;
    target: string;
    strength: number;
}

// Mock Data
export const initialSpaces: KnowledgeSpace[] = [
    { id: 'tech', name: '技术研发', description: '前端、后端、架构设计相关文档', docCount: 12, updatedAt: '10分钟前' },
    { id: 'product', name: '产品规划', description: 'PRD、竞品分析、用户调研', docCount: 8, updatedAt: '2小时前' },
    { id: 'design', name: '设计资源', description: 'UI组件库、品牌VI、设计规范', docCount: 5, updatedAt: '1天前' },
    { id: 'finance', name: '财务法务', description: '审计报告、合同模板、报销流程', docCount: 3, updatedAt: '3天前' },
];

export const initialItems: KnowledgeItem[] = [
    { id: 1, type: 'article', title: 'React Hooks 深度解析', source: '内部文档', summary: '关于 useState、useEffect 和自定义 Hook 模式的综合指南。', tags: [{ name: 'React', color: '#61DAFB' }, { name: '前端', color: '#F0DB4F' }], status: '已分析', date: '2024年3月20日', size: '2.4 MB', verification: '技术主管于3月21日验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 2, type: 'video', title: '高级 CSS Grid 布局', source: 'Youtube', summary: '掌握使用 CSS Grid 和 Flexbox 的现代网页布局。', tags: [{ name: 'CSS', color: '#2965f1' }], status: '已分析', date: '2024年3月18日', size: '150 MB', verification: '设计团队于3月19日验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 3, type: 'image', title: '系统架构图 V2.0', source: 'Figma 导出', summary: '微服务架构的高层概览，包含最新的支付网关设计。', tags: [{ name: '架构', color: '#FF5722' }], status: '已分析', date: '2024年3月15日', size: '4.2 MB', verification: '系统自动验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 4, type: 'pdf', title: 'Q1 财务审计报告_最终版', source: '财务部', summary: '2024第一季度财务收支明细与审计结果。', tags: [{ name: '财务', color: '#EF4444' }], status: '已分析', date: '2024年4月01日', size: '8.5 MB', verification: 'CFO签核', ragStage: 'ready', spaceId: 'finance' },
    { id: 5, type: 'article', title: 'Kubernetes 集群维护手册', source: '运维Wiki', summary: '包括节点扩容、故障排查与版本升级的最佳实践。', tags: [{ name: 'DevOps', color: '#326CE5' }, { name: 'K8s', color: '#326CE5' }], status: '已分析', date: '2024年3月25日', size: '1.2 MB', verification: '运维总监验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 6, type: 'url', title: 'Next.js 14 App Router 迁移指南', source: 'Vercel Blog', summary: '从 Pages Router 迁移到 App Router 的官方分步教程。', tags: [{ name: 'Next.js', color: '#000000' }, { name: '前端', color: '#F0DB4F' }], status: '已分析', date: '2024年3月22日', size: 'N/A', verification: '自动抓取', ragStage: 'ready', spaceId: 'tech' },
    { id: 7, type: 'video', title: '产品发布会 Keynote', source: 'Zoom 录屏', summary: '2024春季产品发布会全过程录像，重点在 AI 功能演示。', tags: [{ name: '产品', color: '#10B981' }], status: '已分析', date: '2024年3月10日', size: '850 MB', verification: '产品部验证', ragStage: 'ready', spaceId: 'product' },
    { id: 8, type: 'pdf', title: '员工入职培训手册 v4.2', source: 'HR', summary: '新员工入职流程、公司文化、福利制度说明。', tags: [{ name: 'HR', color: '#EC4899' }], status: '已分析', date: '2024年2月15日', size: '5.1 MB', verification: 'HRD验证', ragStage: 'ready' },
    { id: 9, type: 'article', title: 'PostgreSQL 性能调优实战', source: 'DBA 团队', summary: '索引优化、查询重写与参数配置案例分析。', tags: [{ name: '数据库', color: '#336791' }], status: '已分析', date: '2024年3月05日', size: '3.8 MB', verification: '首席架构师验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 10, type: 'image', title: '营销活动海报素材包', source: '设计部', summary: '包含五一劳动节营销活动的 banner、落地页 UI 等素材。', tags: [{ name: '设计', color: '#8B5CF6' }], status: '已分析', date: '2024年4月05日', size: '45 MB', verification: '设计总监验证', ragStage: 'ready', spaceId: 'design' },
    { id: 11, type: 'url', title: 'Rust 借用检查机制详解', source: 'Medium', summary: '深入理解 Ownership, Borrowing 和 Lifetimes。', tags: [{ name: 'Rust', color: '#DEA584' }, { name: '后端', color: '#000000' }], status: '待分析', date: '2小时前', size: 'N/A', ragStage: 'ingesting', ingestProgress: 88, spaceId: 'tech' },
    { id: 12, type: 'pdf', title: '竞品分析报告：HoloAI vs Competitors', source: '市场部', summary: 'Q2 市场竞争格局深度分析与策略建议。', tags: [{ name: '市场', color: '#F59E0B' }], status: '已分析', date: '2024年4月10日', size: '6.4 MB', verification: 'CEO已阅', ragStage: 'ready', spaceId: 'product' },
    { id: 13, type: 'article', title: 'Go 语言并发模式', source: 'Golang Blog', summary: 'Goroutines 和 Channels 的高级用法与模式。', tags: [{ name: 'Go', color: '#00ADD8' }], status: '已分析', date: '2024年3月12日', size: '1.5 MB', verification: '后端组长验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 14, type: 'video', title: '用户访谈记录 #202403', source: '腾讯会议', summary: '针对企业版功能的深度用户调研视频。', tags: [{ name: '调研', color: '#6366F1' }], status: '分析中', date: '30分钟前', size: '320 MB', ragStage: 'ingesting', ingestProgress: 20, spaceId: 'product' },
    { id: 15, type: 'pdf', title: 'API 接口文档 v3.0 (Deprecated)', source: 'Swagger', summary: '旧版 API 文档，仅供维护参考。', tags: [{ name: 'API', color: '#85EA2D' }], status: '已分析', date: '2023年12月01日', size: '2.2 MB', verification: '已归档', ragStage: 'ready', spaceId: 'tech' },
    { id: 16, type: 'url', title: 'Tailwind CSS 最佳实践', source: 'Official Docs', summary: '如何构建可维护的 Utility-First CSS 项目。', tags: [{ name: 'CSS', color: '#38BDF8' }], status: '已分析', date: '2024年2月28日', size: 'N/A', verification: '前端组长验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 17, type: 'image', title: 'Logo 概念设计稿', source: '外部设计公司', summary: '新品牌 Logo 的三个备选方案展示。', tags: [{ name: '品牌', color: '#DB2777' }], status: '待确认', date: '15分钟前', size: '8.8 MB', ragStage: 'review', reviewType: 'sensitive_check', spaceId: 'design' },
    { id: 18, type: 'article', title: 'Redis 缓存一致性策略', source: 'Tech Blog', summary: 'Cache-Aside, Read-Through 等策略的对比与选择。', tags: [{ name: '后端', color: '#DC382D' }, { name: '架构', color: '#FF5722' }], status: '已分析', date: '2024年3月08日', size: '1.8 MB', verification: '技术专家验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 19, type: 'pdf', title: '2023 年度 OKR总结', source: '管理层', summary: '全公司 OKR 完成情况复盘与分析。', tags: [{ name: '管理', color: '#4B5563' }], status: '已分析', date: '2024年1月15日', size: '3.5 MB', verification: 'CEO签核', ragStage: 'ready' },
    { id: 20, type: 'url', title: 'LLM Prompt Engineering 指南', source: 'OpenAI Cookbook', summary: '如何编写高质量提示词以获得最佳模型输出。', tags: [{ name: 'AI', color: '#10B981' }, { name: 'Prompt', color: '#8B5CF6' }], status: '已分析', date: '2024年4月12日', size: 'N/A', verification: 'AI 团队验证', ragStage: 'ready', spaceId: 'tech' },
    { id: 101, type: 'pdf', title: '2024世界经济展望.pdf', source: '文件上传', summary: '正在进行全文提取与分块处理...', tags: [], status: '分析中', date: '刚刚', size: '12 MB', ragStage: 'ingesting', ingestProgress: 45, spaceId: 'finance' },
    { id: 102, type: 'url', title: 'TypeScript 5.5 新特性', source: 'DevBlog', summary: 'AI 已生成摘要，建议添加“前端开发”标签。', tags: [{ name: 'TypeScript', color: '#3178C6' }], status: '待确认', date: '1分钟前', ragStage: 'review', reviewType: 'tag_confirm', aiSuggestion: '建议标签: 前端开发', spaceId: 'tech' },
    { id: 103, type: 'article', title: 'Q1 财务审计报告_草稿', source: '内部网盘', summary: '检测到包含敏感财务数据。', tags: [{ name: '财务', color: '#EF4444' }], status: '待确认', date: '10分钟前', ragStage: 'review', reviewType: 'sensitive_check', spaceId: 'finance' },
    { id: 104, type: 'article', title: 'React Hooks 指南 (副本)', source: '文件上传', summary: '检测到与 "React Hooks 深度解析" 内容高度相似 (98%)。', tags: [], status: '待确认', date: '20分钟前', ragStage: 'review', reviewType: 'duplicate_check', similarItem: 'React Hooks 深度解析', spaceId: 'tech' },
];
