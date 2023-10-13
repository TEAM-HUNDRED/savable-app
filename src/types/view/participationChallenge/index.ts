export type ParticipationViewPropsType = {
  participationChallengeId: number;
  image: string;
  title: string;
  remainingVerification: number;
  percentage: number;
  scheduledReward: number;
  savings: number;
  isVerifiedToday: boolean;
};

export type ParticipationChallengeInfoPropsType = {
  challengeId: number;
  image: string;
  title: string;
  startDate: string;
  endDate: string;
  verificationGoal: number;
  scheduledReward: number;
  savings: number;
};

export type ChallengeVerificationInfoPropsType = {
  successCount: number;
  failCount: number;
  remainingCount: number;
  verificationList: Array<{
    id: number;
    image: string;
    state: string;
    dateTime: string;
  }>;
};

export type VerificationDetailPropsType = {
  image: string;
  title: string;
  percentage: number;
  currentCount: number;
  goalCount: number;
  scheduledReward: number;
  reward: number;
  savings: number;
};
