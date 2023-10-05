export const dummyParticipationList = [
  {
    participationChallengeId: 2,
    image:
      'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/166557187466942347.jpg?gif=1&w=1440',
    title: 'Challenge 4',
    remainingVerification: 2,
    percentage: 33,
    scheduledReward: 100,
    savings: 80,
    isVerifiedToday: true,
  },
  {
    participationChallengeId: 5,
    image:
      'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/166557187466942347.jpg?gif=1&w=1440',
    title: 'Challenge 4',
    remainingVerification: 1,
    percentage: 0,
    scheduledReward: 0,
    savings: 0,
    isVerifiedToday: false,
  },
];

export const dummyParticipationStatus = {
  participationChallengeInfo: {
    challengeId: 2,
    image:
      'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/166557187466942347.jpg?gif=1&w=1440',
    title: 'Challenge 5',
    startDate: '2023-09-24',
    endDate: '2023-10-09',
    verificationGoal: 3,
    scheduledReward: 100,
    savings: 80,
  },
  verificationInfo: {
    successCount: 1,
    failCount: 1,
    remainingCount: 2,
    verificationList: [
      {
        id: 10,
        image:
          'https://file.newswire.co.kr/data/datafile2/thumb_480/2008/05/2008052212114236950.31638000.jpg',
        state: 'SUCCESS',
        dateTime: '2023-09-15T00:21:45.586+00:00',
      },
      {
        id: 12,
        image:
          'https://file.newswire.co.kr/data/datafile2/thumb_480/2008/05/2008052212114236950.31638000.jpg',
        state: 'FAIL',
        dateTime: '2023-09-09T00:21:45.586+00:00',
      },
      {
        id: 11,
        image:
          'https://file.newswire.co.kr/data/datafile2/thumb_480/2008/05/2008052212114236950.31638000.jpg',
        state: 'WAITING',
        dateTime: '2023-09-03T00:21:45.586+00:00',
      },
      {
        id: 1,
        image:
          'https://file.newswire.co.kr/data/datafile2/thumb_480/2008/05/2008052212114236950.31638000.jpg',
        state: 'WAITING',
        dateTime: '2023-09-10T00:21:45.586+00:00',
      },
      {
        id: 2,
        image:
          'https://file.newswire.co.kr/data/datafile2/thumb_480/2008/05/2008052212114236950.31638000.jpg',
        state: 'WAITING',
        dateTime: '2023-09-10T00:21:45.586+00:00',
      },
      {
        id: 3,
        image:
          'https://file.newswire.co.kr/data/datafile2/thumb_480/2008/05/2008052212114236950.31638000.jpg',
        state: 'WAITING',
        dateTime: '2023-09-10T00:21:45.586+00:00',
      },
      {
        id: 4,
        image:
          'https://file.newswire.co.kr/data/datafile2/thumb_480/2008/05/2008052212114236950.31638000.jpg',
        state: 'WAITING',
        dateTime: '2023-09-10T00:21:45.586+00:00',
      },
    ],
  },
};

export const dummyVerificationChallenge = {
  image:
    'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/advices/166557187466942347.jpg?gif=1&w=1440',
  title: '집밥 먹기 챌린지',
  percentage: 30,
  currentCount: 5,
  goalsCount: 15,
  scheduledReward: 400,
  additionalReward: 100,
  savings: 25000,
};
