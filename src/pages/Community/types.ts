export interface TCCUser {
    id: string;
    name: string;
    avatar: string;
}

export type CommunityType = 'MAIN' | 'INTEREST';
export type CommunityAccess = 'PUBLIC' | 'INVITE_ONLY' | 'PAID';

export interface Community {
    id: string;
    type: CommunityType;
    name: string;
    description: string;
    icon: string;
    leaderId?: string;
    memberCount: number;
    accessType: CommunityAccess;
    tags: string[];
}

export type ContentStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
export type ContentCategory = 'CAT_I' | 'CAT_II' | 'CAT_III'; // High, Standard, Low Risk

export interface Content {
    id: string;
    title: string;
    summary: string;
    authorId: string;
    communityId: string | null; // NULL for Main Chain, UUID for Sub-chain
    status: ContentStatus;
    category: ContentCategory;
    riskFactor: number; // Snapshot of Risk Factor
    rewardPool: number; // Projected Reward
    createdAt: string;
    tags: string[];
}
