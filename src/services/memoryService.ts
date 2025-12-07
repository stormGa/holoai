import { Video, FileText, MessageSquare, MapPin, Users, Clock } from 'lucide-react';

export interface MemoryParticipant {
    name: string;
    avatar: string;
    id?: string;
}

export interface MemoryEvent {
    id: string;
    type: 'video' | 'doc' | 'chat';
    timestamp: string; // ISO string
    title: string;
    summary: string;
    tags: string[];
    metadata: {
        duration?: string;
        location?: string;
        people?: MemoryParticipant[];
        fileType?: string;
        description?: string;
    };
}

// Helper to subtract time
const subDays = (days: number) => new Date(Date.now() - 1000 * 60 * 60 * 24 * days).toISOString();
const subMonths = (months: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() - months);
    return d.toISOString();
};

const generateMockMemories = (): MemoryEvent[] => {
    const memories: MemoryEvent[] = [
        // Today (2 items)
        {
            id: 'm-today-1',
            type: 'video',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
            title: '产品战略会议',
            summary: '讨论 Q4 路线图及全息记忆 (HoloMemory) 功能范围。',
            tags: ['工作', '会议', '产品'],
            metadata: {
                duration: '45:20',
                location: 'B 会议室',
                people: [
                    { name: 'Alice', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', id: 'p1' },
                    { name: 'Bob', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', id: 'p2' },
                    { name: 'Charlie', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', id: 'p3' }
                ],
                description: '通过全息眼镜录制'
            }
        },
        {
            id: 'm-today-2',
            type: 'doc',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            title: 'Transformers 架构详解.pdf',
            summary: '注意力机制和自注意力层的核心概念解析。',
            tags: ['学习', 'AI', '论文'],
            metadata: { fileType: 'PDF', description: '在平板上阅读' }
        },
        // Yesterday (1 item)
        {
            id: 'm-yest-1',
            type: 'chat',
            timestamp: subDays(1),
            title: '询问晚餐建议',
            summary: '询问中央公园附近的意大利餐厅推荐。',
            tags: ['互动', '美食'],
            metadata: { description: 'HoloAI 对话' }
        },
        // Last Week (1 item)
        {
            id: 'm-week-1',
            type: 'video',
            timestamp: subDays(7),
            title: '周会回顾',
            summary: '回顾上周开发进度与下周计划。',
            tags: ['工作', '周会'],
            metadata: {
                duration: '30:00',
                location: '线上会议',
                people: [
                    { name: 'Team', avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Team' },
                    { name: 'David', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' }
                ],
                description: '录屏存档'
            }
        },
        // Last Month (1 item)
        {
            id: 'm-month-1',
            type: 'doc',
            timestamp: subMonths(1),
            title: 'Q3 财务报告粗略',
            summary: '初步浏览了上一季度的财务表现。',
            tags: ['财务', '工作'],
            metadata: { fileType: 'Excel', description: 'PC 端查看' }
        }
    ];

    // 1 per month for the past year (starts from 2 months ago)
    for (let i = 2; i <= 12; i++) {
        memories.push({
            id: `m-past-${i}`,
            type: i % 2 === 0 ? 'video' : 'chat', // Alternate types
            timestamp: subMonths(i),
            title: `${i} 个月前的记忆`,
            summary: `这是一条来自 ${i} 个月前的模拟记忆记录，展示全息记忆的长时存储能力。`,
            tags: ['历史', '回顾'],
            metadata: {
                description: '历史归档',
                duration: i % 2 === 0 ? '10:00' : undefined
            }
        });
    }

    return memories.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const mockMemories: MemoryEvent[] = generateMockMemories();

export const getMemories = async (): Promise<MemoryEvent[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...mockMemories]); // Return copy
        }, 300);
    });
};

export const updateMemory = async (id: string, updates: Partial<MemoryEvent>): Promise<MemoryEvent> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = mockMemories.findIndex(m => m.id === id);
            if (index === -1) {
                reject(new Error('Memory not found'));
                return;
            }

            mockMemories[index] = { ...mockMemories[index], ...updates };
            resolve({ ...mockMemories[index] });
        }, 300);
    });
};

export const deleteMemory = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = mockMemories.findIndex(m => m.id === id);
            if (index !== -1) {
                mockMemories.splice(index, 1);
            }
            resolve();
        }, 300);
    });
};
