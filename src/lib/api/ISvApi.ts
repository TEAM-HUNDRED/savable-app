import {
  ChallengeListAPIResponse,
  ChallengeDetailAPIResponse,
  ParticipationChallengeListAPIResponse,
  ParticipationChallengeStatusAPIResponse,
} from '../../types/api';

export interface ISvApi {
  setBaseUrl(baseURL: string): void;

  getChallengeList(): Promise<ChallengeListAPIResponse>;
  getChallengeDetail(challengeId: number): Promise<ChallengeDetailAPIResponse>;

  getParticipationChallengeList(): Promise<ParticipationChallengeListAPIResponse>;
  getParticipationChallengeStatus(
    challengeId: number,
  ): Promise<ParticipationChallengeStatusAPIResponse>;
}
