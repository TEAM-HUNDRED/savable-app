export type ChallengeListAPIResponse = Array<{
  challengeId: number;
  image: string;
  title: string;
  hasDeadline: string;
  startDate: string;
  endDate: string;
}>;
