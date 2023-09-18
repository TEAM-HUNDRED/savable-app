export enum ROUTER {
  MAIN_SCREEN = 'MAIN_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  CHALLENGE_SCREEN = 'CHALLENGE_SCREEN',
}

export type RootScreenKeyList = keyof RootScreenStackPropsList;

export type RootScreenStackPropsList = {
  [ROUTER.MAIN_SCREEN]: undefined;
  [ROUTER.LOGIN_SCREEN]: undefined;
  [ROUTER.CHALLENGE_SCREEN]: undefined;
};

export type MainScreenKeyList = keyof MainScreenStackPropsList;

export type MainScreenStackPropsList = RootScreenStackPropsList;
