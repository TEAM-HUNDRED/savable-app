export type UserInfoPropsType = {
  username: string;
  profileImage: string;
  totalSavings: number;
  totalReward: number;
  scheduledReward: number;
  verificationCount: number;
  phoneNumber: string;
  challengeInfo: {
    successChallengeCount: number;
    completeChallengeCount: number;
    currentParticipationCount: number;
  };
};
