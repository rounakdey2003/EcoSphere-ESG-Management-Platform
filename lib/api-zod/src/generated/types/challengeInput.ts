import type { ChallengeInputDifficulty } from './challengeInputDifficulty';
import type { ChallengeInputStatus } from './challengeInputStatus';

export interface ChallengeInput {
  title: string;
  description?: string;
  categoryId: number;
  xp: number;
  difficulty: ChallengeInputDifficulty;
  evidenceRequired?: boolean;
  deadline?: Date;
  status?: ChallengeInputStatus;
}
