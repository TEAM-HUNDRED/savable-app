export type ParticipationChallengeListAPIResponse = Array<{
  participationChallengeId: number;
  image: string;
  title: string;
  remainingVerification: number;
  percentage: number;
  scheduledReward: number;
  savings: number;
  isVerifiedToday: boolean;
}>;

export type ParticipationChallengeStatusAPIResponse = {
  participationChallengeInfo: {
    challengeId: number;
    image: string;
    title: string;
    startDate: string;
    endDate: string;
    verificationGoal: number;
    scheduledReward: number;
    savings: number;
  };
  verificationInfo: {
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
};
