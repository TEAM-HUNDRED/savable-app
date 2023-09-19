import {ChallengeListAPIResponse} from '../../types/api/challenge';

export interface ISvApi {
  setBaseUrl(baseURL: string): void;

  getChallengeList(): Promise<ChallengeListAPIResponse>;
}
