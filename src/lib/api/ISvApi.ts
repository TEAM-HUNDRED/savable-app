import {
  ChallengeListAPIResponse,
  ChallengeDetailAPIResponse,
  ParticipationChallengeListAPIResponse,
  ParticipationChallengeStatusAPIResponse,
  GiftCardListAPIResponse,
  UserInfoAPIResponse,
  OrderHistoryAPIResponse,
  CreateVerificationAPIResponse,
  VerificationDetailAPIResponse,
  SMSAPIResponse,
  ApplyChallengePayload,
  ApplyChallengeAPIResponse,
  CreateOrderPayload,
  CreateOrderAPIResponse,
} from '../../types/api';

export interface ISvApi {
  setBaseUrl(baseURL: string): void;

  getChallengeList(): Promise<ChallengeListAPIResponse>;
  getChallengeDetail(challengeId: number): Promise<ChallengeDetailAPIResponse>;

  getParticipationChallengeList(): Promise<ParticipationChallengeListAPIResponse>;
  getParticipationChallengeStatus(
    challengeId: number,
  ): Promise<ParticipationChallengeStatusAPIResponse>;

  getGiftCardList(price: number): Promise<GiftCardListAPIResponse>;
  getOrderHistoryList(): Promise<OrderHistoryAPIResponse>;

  getUserInfo(): Promise<UserInfoAPIResponse>;

  createVerification(
    participationChallengeId: number,
    image: FormData,
  ): Promise<CreateVerificationAPIResponse>;

  getVerificationDetail(
    participationChallengeId: string,
  ): Promise<VerificationDetailAPIResponse>;

  sendSMS(phoneNumber: string): Promise<SMSAPIResponse>;

  ApplyChallenge(
    payload: ApplyChallengePayload,
  ): Promise<ApplyChallengeAPIResponse>;

  createOrder(payload: CreateOrderPayload): Promise<CreateOrderAPIResponse>;
}
