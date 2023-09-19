export enum ROUTER {
  MAIN_SCREEN = 'MAIN_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  CHALLENGE_SCREEN = 'CHALLENGE_SCREEN',
  STORE_SCREEN = 'STORE_SCREEN',
  PARTICIPATION_SCREEN = 'PARTICIPATION_SCREEN',
  PROFILE_SCREEN = 'PROFILE_SCREEN',
}

// 최상단 RootScreen
export type RootScreenKeyList = keyof RootScreenStackPropsList;

export type RootScreenStackPropsList = {
  [ROUTER.MAIN_SCREEN]: undefined;
  [ROUTER.LOGIN_SCREEN]: undefined;
};

// MainScreen을 Navigator에 내부 Screen
// 상위 RootScreen 포함한다.
export type MainScreenKeyList = keyof MainScreenStackPropsList;

export type MainScreenStackPropsList = RootScreenStackPropsList & {
  [ROUTER.HOME_SCREEN]: undefined;
};

// HomeScreen Navigator에 내부 Screen
// 상위 MainScreen을 포함한다.
export type HomeScreenKeyList = keyof HomeScreenStackPropsList;

export type HomeScreenStackPropsList = MainScreenStackPropsList & {
  [ROUTER.CHALLENGE_SCREEN]: undefined;
  [ROUTER.STORE_SCREEN]: undefined;
  [ROUTER.PARTICIPATION_SCREEN]: undefined;
  [ROUTER.PROFILE_SCREEN]: undefined;
};
