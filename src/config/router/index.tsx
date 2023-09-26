import {ChallengeInfoViewType} from '../../types/view';

export enum ROUTER {
  MAIN_SCREEN = 'MAIN_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  CHALLENGE_SCREEN = 'CHALLENGE_SCREEN',
  STORE_SCREEN = 'STORE_SCREEN',
  PARTICIPATION_SCREEN = 'PARTICIPATION_SCREEN',
  PROFILE_SCREEN = 'PROFILE_SCREEN',
  CHALLENGE_EXPLAIN_SCREEN = 'CHALLENGE_EXPLAIN_SCREEN',
  CHALLENGE_APPLY_SCREEN = 'CHALLENGE_APPLY_SCREEN',
  PARTICIPATED_CHALLENGE_STATUS_SCREEN = 'PARTICIPATED_CHALLENGE_STATUS_SCREEN',
}

// 최상단 RootScreen
export type RootScreenKeyList = keyof RootScreenStackPropsList;

export type RootScreenStackPropsList = {
  [ROUTER.MAIN_SCREEN]: undefined;
  [ROUTER.LOGIN_SCREEN]: undefined;
};

// MainScreen을 Navigator에 내부 Screen
// RootScreen에서 이동했기에 RootScreen을 포함한다.
export type MainScreenKeyList = keyof MainScreenStackPropsList;

export type MainScreenStackPropsList = RootScreenStackPropsList & {
  [ROUTER.HOME_SCREEN]: undefined;
  [ROUTER.CHALLENGE_EXPLAIN_SCREEN]: {challengeId: number};
  [ROUTER.CHALLENGE_APPLY_SCREEN]: {
    challengeInfo: ChallengeInfoViewType | undefined;
  };
  [ROUTER.PARTICIPATED_CHALLENGE_STATUS_SCREEN]: {
    challengeId: number;
    challengeTitle: string;
  };
};

// HomeScreen Navigator에 내부 Screen
// MainScreen에서 이동했기에 MainScreen을 포함한다.
export type HomeScreenKeyList = keyof HomeScreenStackPropsList;

export type HomeScreenStackPropsList = MainScreenStackPropsList & {
  [ROUTER.CHALLENGE_SCREEN]: undefined;
  [ROUTER.STORE_SCREEN]: undefined;
  [ROUTER.PARTICIPATION_SCREEN]: undefined;
  [ROUTER.PROFILE_SCREEN]: undefined;
};
