export type UserInfoAPIResponse = {
  username: string;
  profileImage: string;
  totalSavings: number;
  totalReward: number;
  scheduledReward: number;
  verificationCount: number;
  challengeInfo: {
    successChallengeCount: number;
    completeChallengeCount: number;
    currentParticipationCount: number;
  };
};

export type SMSAPIResponse = {
  number: number;
};
