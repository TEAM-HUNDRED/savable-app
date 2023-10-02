export type UserInfoAPIResponse = {
  information: {
    totalSavings: number;
    totalReward: number;
    scheduledReward: number;
    verificationCount: number;
  };
  challenge: {
    success: number;
    completion: number;
    participation: number;
  };
};
