export type UserInfoAPIResponse = {
  username: string;
  profileImage: string;
  totalSavings: number;
  totalReward: number;
  scheduledReward: number;
  verificationCount: number;
  challengeInfoResponseDto: {
    successChallengeCount: number;
    completeChallengeCount: number;
    currentParticipationCount: number;
  };
};

export type SMSAPIResponse = {
  number: number;
};

export type SignUpPayload = {
  ageRange: string;
  ageRangeNeedsAgreement: boolean;
  birthday: string;
  birthdayNeedsAgreement: boolean;
  birthdayType: string;
  birthyear: string;
  birthyearNeedsAgreement: boolean;
  email: string;
  emailNeedsAgreement: boolean;
  gender: string;
  genderNeedsAgreement: boolean;
  id: string;
  isEmailValid: boolean;
  isEmailVerified: boolean;
  isKorean: boolean;
  isKoreanNeedsAgreement: boolean;
  name: string;
  nickname: string;
  phoneNumber: string;
  phoneNumberNeedsAgreement: boolean;
  profileImageUrl: string;
  profileNeedsAgreement: boolean;
  thumbnailImageUrl: string;
};

export type SignUpAPIResponse = {
  sessionKey: string;
  data: {
    createdAt: string;
    lastModifiedAt: string;
    id: number;
    socialId: string;
    username: any;
    reward: number;
    savings: number;
    phoneNumber: any;
    profileImage: string;
    role: string;
    accountState: string;
    deletedAt: any;
    socialData: string;
    participationChallengeList: any;
    giftcardOrderList: any;
    rewardHistoryList: any;
    savingHistoryList: any;
    roleKey: string;
  };
};

export type UpdateMemberPayload = {
  username: string;
  phoneNumber: string;
  image: string;
};

export type UpdateMemberURLPayload = {
  username: string;
  phoneNumber: string;
  imageUrl: string;
};

export type UpdateMemberAPIResponse = {};
