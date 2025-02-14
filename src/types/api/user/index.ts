export type UserInfoAPIResponse = {
  username: string;
  profileImage: string;
  totalSavings: number;
  totalReward: number;
  scheduledReward: number;
  verificationCount: number;
  phoneNumber: string;
  challengeInfoResponseDto: {
    successChallengeCount: number;
    completeChallengeCount: number;
    currentParticipationCount: number;
  };
};

export type SMSAPIResponse = {
  data: string;
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
    isRegistered: boolean;
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
export type RemoveMemberAPIResponse = {};
