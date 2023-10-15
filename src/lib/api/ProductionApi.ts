import axios, {AxiosInstance} from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ISvApi} from './ISvApi';
import {
  ApplyChallengeAPIResponse,
  ApplyChallengePayload,
  ChallengeDetailAPIResponse,
  ChallengeListAPIResponse,
  CreateOrderAPIResponse,
  CreateOrderPayload,
  CreateVerificationAPIResponse,
  GiftCardListAPIResponse,
  OrderHistoryAPIResponse,
  ParticipationChallengeListAPIResponse,
  ParticipationChallengeStatusAPIResponse,
  RemoveMemberAPIResponse,
  SignUpAPIResponse,
  SignUpPayload,
  SMSAPIResponse,
  UpdateMemberAPIResponse,
  UpdateMemberPayload,
  UpdateMemberURLPayload,
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

  setAuthToken(accessToken: string) {
    this.axios.defaults.headers['Cookie'] = accessToken;
  }

  setBaseUrl(baseURL: string) {
    this.axios.defaults.baseURL = baseURL;
  }

  setSessionKeyOnStorage = async (value: string) => {
    try {
      await AsyncStorage.setItem('session_key', value);
      this.setAuthToken(value);
    } catch (error) {
      console.log('[Session Storage Error]', error);
    }
  };

  public getChallengeList = async (): Promise<ChallengeListAPIResponse> => {
    const {data: challengeList} = await this.axios.get('challenges');

    return challengeList.data;
  };

  public getChallengeDetail = async (
    challengeId: number,
  ): Promise<ChallengeDetailAPIResponse> => {
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
    const {data} = await this.axios.get(`participations/${challengeId}`);

    return data.data;
  };

  public async getGiftCardList(
    price: number,
  ): Promise<GiftCardListAPIResponse> {
    const {data} = await this.axios.get(`shop/giftcards/${price}`);

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
    participationChallengeId: number,
    payload: FormData,
  ): Promise<CreateVerificationAPIResponse> {
    const {data} = await this.axios.post(
      `participations/${participationChallengeId}/verification`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log(data);

    return data;
  }

  public async getVerificationDetail(
    participationChallengeId: string,
  ): Promise<VerificationDetailAPIResponse> {
    const {data} = await this.axios.get(
      `participations/${participationChallengeId}/verification`,
    );

    return data.data;
  }

  public async sendSMS(phoneNumber: string): Promise<SMSAPIResponse> {
    const {data} = await this.axios.post('send-sms', {
      phoneNumber: phoneNumber,
    });

    return {number: data};
  }

  public async ApplyChallenge(
    payload: ApplyChallengePayload,
  ): Promise<ApplyChallengeAPIResponse> {
    const {data} = await this.axios.post('challenges/participations', payload);

    return data;
  }

  public async createOrder(
    payload: CreateOrderPayload,
  ): Promise<CreateOrderAPIResponse> {
    const {data} = await this.axios.post('shop/order', payload);

    return data;
  }

  public async signUp(payload: SignUpPayload): Promise<SignUpAPIResponse> {
    const data = await this.axios
      .post('login/kakao', JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const cookies = response.headers['set-cookie'];

        let currentKey = '';

        if (cookies) {
          const regex = /SESSION=([A-Za-z0-9]+);/;
          const match = cookies[0].match(regex);

          if (match) {
            const sessionValue = match[1];

            currentKey = `SESSION=${sessionValue}`;
            this.setAuthToken(`SESSION=${sessionValue}`);
          }
        }
        return {response, sessionKey: currentKey};
      });

    return {sessionKey: data.sessionKey, data: data.response.data};
  }

  public async updateMemberProfile(
    payload: UpdateMemberPayload,
  ): Promise<UpdateMemberAPIResponse> {
    const {data} = await this.axios.patch('member/settings', payload);

    return data;
  }

  public async updateMemberURLProfile(
    payload: UpdateMemberURLPayload,
  ): Promise<UpdateMemberAPIResponse> {
    const {data} = await this.axios.patch('member/sign-up', payload);

    return data;
  }

  public async removeMember(): Promise<RemoveMemberAPIResponse> {
    const {data} = await this.axios.patch('member/deletion');

    return data;
  }
}
