export type ChallengeViewType = {
  id: number;
  image: string;
  title: string;
  hasDeadline: boolean;
  startDate: string;
  endDate: string;
};

export type ChallengeInfoViewType = {
  id: number;
  title: string;
  image: string;
  explanation: string;
  verificationDescription: string;
  reward: number;
  hasDeadline: boolean;
  startDate: string;
  endDate: string;
};

export type ChallengeGuideViewType = {
  isPass: boolean;
  image: string;
  explanation: string;
};
