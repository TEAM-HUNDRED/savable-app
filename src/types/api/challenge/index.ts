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
    reward: number;
    hasDeadline: boolean;
    startDate: string;
    endDate: string;
  };
  verificationGuide: Array<{
    isPass: boolean;
    image: string;
    explanation: string;
  }>;
};
