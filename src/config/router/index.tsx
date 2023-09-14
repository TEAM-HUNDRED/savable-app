export enum ROUTER {
  MAIN_SCREEN = 'MAIN_SCREEN',
}

export type RootScreenKeyList = keyof RootScreenStackPropsList;

export type RootScreenStackPropsList = {
  [ROUTER.MAIN_SCREEN]: undefined;
};

export type MainScreenKeyList = keyof MainScreenStackPropsList;

export type MainScreenStackPropsList = RootScreenStackPropsList;
