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
  SignUpAPIResponse,
  SignUpPayload,
  UpdateMemberPayload,
  UpdateMemberAPIResponse,
  UpdateMemberURLPayload,
  RemoveMemberAPIResponse,
} from '../../types/api';

export interface ISvApi {
  deleteCookie(): void;
  setCookie(accessToken: string): void;
  setBaseUrl(baseURL: string): void;
  setSessionKeyOnStorage(value: string): Promise<void>;
  deleteSessionKeyOnStorage(): Promise<void>;

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

  signUp(payload: SignUpPayload): Promise<SignUpAPIResponse>;

  updateMemberProfile(
    payload: UpdateMemberPayload,
  ): Promise<UpdateMemberAPIResponse>;

  updateMemberURLProfile(
    payload: UpdateMemberURLPayload,
  ): Promise<UpdateMemberAPIResponse>;

  removeMember(): Promise<RemoveMemberAPIResponse>;
  logout(): Promise<void>;
}
