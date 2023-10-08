import axios, {AxiosInstance} from 'axios';
import {API_URL} from '@env';

import {ISvApi} from './ISvApi';
import {
  ApplyChallengeAPIResponse,
  ApplyChallengePayload,
  CreateVerificationAPIResponse,
  GiftCardListAPIResponse,
  OrderHistoryAPIResponse,
  ParticipationChallengeListAPIResponse,
  ParticipationChallengeStatusAPIResponse,
  SMSAPIResponse,
  UserInfoAPIResponse,
  VerificationDetailAPIResponse,
} from '../../types/api';

export default class ProductionApi implements ISvApi {
  static instance: ISvApi;
  axios: AxiosInstance;

  private constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
    });
  }

  static get shared() {
    if (!ProductionApi.instance) ProductionApi.instance = new ProductionApi();
    return ProductionApi.instance;
  }

  setBaseUrl(baseURL: string) {
    this.axios.defaults.baseURL = baseURL;
  }

  public getChallengeList = async () => {
    const {data: challengeList} = await this.axios.get('challenges');

    return challengeList.data;
  };

  public getChallengeDetail = async (challengeId: number) => {
    const {data: challengeDetail} = await this.axios.get(
      `challenges/${challengeId}`,
    );

    return challengeDetail.data;
  };

  public getParticipationChallengeList =
    async (): Promise<ParticipationChallengeListAPIResponse> => {
      const {data} = await this.axios.get('participations');

      return data.data;
    };

  public getParticipationChallengeStatus = async (
    challengeId: number,
  ): Promise<ParticipationChallengeStatusAPIResponse> => {
    const {data} = await this.axios.get(`participation/${challengeId}`);

    return data.data;
  };

  public async getGiftCardList(
    price: number,
  ): Promise<GiftCardListAPIResponse> {
    const {data} = await this.axios.get(`shop/giftcard/${price}`);

    return data.data;
  }

  public async getUserInfo(): Promise<UserInfoAPIResponse> {
    const {data} = await this.axios.get('my-page');

    return data.data;
  }

  public async getOrderHistoryList(): Promise<OrderHistoryAPIResponse> {
    const {data} = await this.axios.get('shop/histories');

    return data.data;
  }

  public async createVerification(
    participationChallengeId: string,
    image: FormData,
  ): Promise<CreateVerificationAPIResponse> {
    const {data} = await this.axios.post(
      `participation/${participationChallengeId}/verification/`,
      {image: image},
    );

    return data;
  }

  public async getVerificationDetail(
    participationChallengeId: string,
  ): Promise<VerificationDetailAPIResponse> {
    const {data} = await this.axios.get(
      `participation/${participationChallengeId}/verification/`,
    );

    return data.data;
  }

  public async sendSMS(phoneNumber: string): Promise<SMSAPIResponse> {
    const {data} = await this.axios.post('send-sms', phoneNumber);

    return data.data;
  }

  public async ApplyChallenge(
    payload: ApplyChallengePayload,
  ): Promise<ApplyChallengeAPIResponse> {
    const {data} = await this.axios.post('challenges/participations', payload);
    return data;
  }
}
