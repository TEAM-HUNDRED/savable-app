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
  participationChallengeInfoDto: {
    challengeId: number;
    image: string;
    title: string;
    startDate: string;
    endDate: string;
    verificationGoal: number;
    scheduledReward: number;
    savings: number;
  };
  verificationInfoDto: {
    successCount: number;
    failCount: number;
    remainingCount: number;
    verificationResponseDtos: Array<{
      id: number;
      image: string;
      state: string;
      dateTime: string;
    }>;
  };
};

export type CreateVerificationAPIResponse = {};
export type VerificationDetailAPIResponse = {
  image: string;
  title: string;
  percentage: number;
  currentCount: number;
  goalsCount: number;
  scheduledReward: number;
  additionalReward: number;
  savings: number;
};
