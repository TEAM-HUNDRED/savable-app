import axios, {AxiosInstance} from 'axios';
import {API_URL} from '@env';

import {ISvApi} from './ISvApi';
import {
  CreateVerificationAPIResponse,
  GiftCardListAPIResponse,
  OrderHistoryAPIResponse,
  ParticipationChallengeListAPIResponse,
  ParticipationChallengeStatusAPIResponse,
  SMSAPIResponse,
  UserInfoAPIResponse,
  VerificationDetailAPIResponse,
} from '../../types/api';
import {
  dummyChallengeDetail,
  dummyChallengeList,
  dummyGiftCardList,
  dummyOrderHistory,
  dummyParticipationList,
  dummyParticipationStatus,
  dummyUserInfo,
  dummyVerificationChallenge,
  dummyVerificationNumber,
} from '../../mock';

export default class MockApi implements ISvApi {
  static instance: ISvApi;
  axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
    });
  }

  static get shared() {
    if (!MockApi.instance) MockApi.instance = new MockApi();
    return MockApi.instance;
  }

  setBaseUrl(baseURL: string) {
    this.axios.defaults.baseURL = baseURL;
  }

  public getChallengeList = async () => {
    return dummyChallengeList;
  };

  public getChallengeDetail = async (challengeId: number) => {
    return dummyChallengeDetail;
  };

  public getParticipationChallengeList =
    async (): Promise<ParticipationChallengeListAPIResponse> => {
      return dummyParticipationList;
    };

  public getParticipationChallengeStatus = async (
    challengeId: number,
  ): Promise<ParticipationChallengeStatusAPIResponse> => {
    return dummyParticipationStatus;
  };

  public async getGiftCardList(
    price: number,
  ): Promise<GiftCardListAPIResponse> {
    return dummyGiftCardList;
  }

  public async getUserInfo(): Promise<UserInfoAPIResponse> {
    return dummyUserInfo;
  }

  public async getOrderHistoryList(): Promise<OrderHistoryAPIResponse> {
    return dummyOrderHistory;
  }

  public async createVerification(
    participationChallengeId: string,
    image: FormData,
  ): Promise<CreateVerificationAPIResponse> {
    return 'success';
  }

  public async getVerificationDetail(
    participationChallengeId: string,
  ): Promise<VerificationDetailAPIResponse> {
    return dummyVerificationChallenge;
  }

  public async sendSMS(phoneNumber: string): Promise<SMSAPIResponse> {
    return dummyVerificationNumber;
  }
}
