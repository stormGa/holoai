export interface TCCUser {
    id: string;
    name: string;
    avatar: string;
    balance: number; // TCC Token Balance
    stakedAmount: number; // Staked TCC
    reputation: number; // 0-100
    role: 'USER' | 'VERIFIER' | 'LEADER' | 'GUARDIAN';
}

export type CommunityType = 'MAIN' | 'SUB';
export type CommunityAccess = 'PUBLIC' | 'INVITE_ONLY' | 'PAID';

export interface Community {
    id: string;
    type: CommunityType;
    name: string;
    description: string;
    icon: string;
    leaderId?: string; // Main community might not have a single leader in same way
    taxRate: number; // e.g. 0.01 for 1%
    memberCount: number;
    accessType: CommunityAccess;
    tags: string[];
    // Trusted Info
    isInstitution: boolean;
    trustedScore: number; // 0-100
    trustedContentCount: number;
    reportedContentCount: number;
    complaintCount: number;
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
