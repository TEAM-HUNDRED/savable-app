export type ChallengeListAPIResponse = Array<{
  challengeId: number;
  image: string;
  title: string;
  hasDeadline: boolean;
  startDate: string;
  endDate: string;
}>;
