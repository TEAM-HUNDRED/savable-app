export type ChallengeListAPIResponse = Array<{
  id: number;
  image: string;
  title: string;
  hasDeadline: boolean;
  startDate: string;
  endDate: string;
}>;

export type ChallengeDetailAPIResponse = {
  challenge: {
    id: number;
    title: string;
    image: string;
    explanation: string;
    verificationDescription: string;
    estimatedSavings: number;
    reward: number;
    hasDeadline: boolean;
    startDate: string;
    endDate: string;
  };
  isParticipatable: boolean;
  verificationGuide: Array<{
    isPass: boolean;
    image: string;
    explanation: string;
  }>;
};

export type ApplyChallengePayload = {
  challengeId: number;
  duration: number;
  verificationGoal: number;
};

export type ApplyChallengeAPIResponse = {};
