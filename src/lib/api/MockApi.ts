import axios, {AxiosInstance} from 'axios';
import {API_URL} from '@env';

import {ISvApi} from './ISvApi';
import {
  ApplyChallengeAPIResponse,
  ApplyChallengePayload,
  CreateOrderAPIResponse,
  CreateOrderPayload,
  CreateVerificationAPIResponse,
  GiftCardListAPIResponse,
  OrderHistoryAPIResponse,
  ParticipationChallengeListAPIResponse,
  ParticipationChallengeStatusAPIResponse,
  SignUpAPIResponse,
  SignUpPayload,
  SMSAPIResponse,
  UpdateMemberAPIResponse,
  UpdateMemberPayload,
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

  setCookie(accessToken: string) {
    this.axios.defaults.headers['Authorization'] = accessToken;
  }

  setBaseUrl(baseURL: string) {
    this.axios.defaults.baseURL = baseURL;
  }

  setSessionKeyOnStorage(value: string): Promise<void> {}

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
    participationChallengeId: number,
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

  public async ApplyChallenge(
    payload: ApplyChallengePayload,
  ): Promise<ApplyChallengeAPIResponse> {
    return 'success';
  }

  public async createOrder(
    payload: CreateOrderPayload,
  ): Promise<CreateOrderAPIResponse> {
    return 'success';
  }

  public async signUp(payload: SignUpPayload): Promise<SignUpAPIResponse> {
    return 'success';
  }

  public async updateMemberProfile(
    payload: UpdateMemberPayload,
  ): Promise<UpdateMemberAPIResponse> {
    return 'success';
  }
}
