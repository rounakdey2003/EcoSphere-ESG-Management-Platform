import type { ChallengeDifficulty } from './challengeDifficulty';
import type { ChallengeStatus } from './challengeStatus';

export interface Challenge {
  id: number;
  title: string;
    description?: string | null;
  categoryId: number;
    categoryName?: string | null;
  xp: number;
  difficulty: ChallengeDifficulty;
  evidenceRequired?: boolean;
    deadline?: string | null;
  status: ChallengeStatus;
  participantCount?: number;
  createdAt?: Date;
}
