export enum ROUTER {
  MAIN_SCREEN = 'MAIN_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  CHALLENGE_SCREEN = 'CHALLENGE_SCREEN',
  STORE_SCREEN = 'STORE_SCREEN',
  PARTICIPATION_SCREEN = 'PARTICIPATION_SCREEN',
  PROFILE_SCREEN = 'PROFILE_SCREEN',
}

export type RootScreenKeyList = keyof RootScreenStackPropsList;

export type RootScreenStackPropsList = {
  [ROUTER.MAIN_SCREEN]: undefined;
  [ROUTER.LOGIN_SCREEN]: undefined;
  [ROUTER.CHALLENGE_SCREEN]: undefined;
  [ROUTER.STORE_SCREEN]: undefined;
  [ROUTER.PARTICIPATION_SCREEN]: undefined;
  [ROUTER.PROFILE_SCREEN]: undefined;
};

export type MainScreenKeyList = keyof MainScreenStackPropsList;

export type MainScreenStackPropsList = RootScreenStackPropsList;
