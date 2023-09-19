import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {ROUTER, MainScreenStackPropsList} from '../../config';

import HomeScreen from './HomeScreen';
import ChallengeExplainScreen from './ChallengeExplainScreen';
import ChallengeApplyScreen from './ChallengeApplyScreen';

const MainStack = createStackNavigator<MainScreenStackPropsList>();

function MainStackScreen(): React.ReactElement {
  const headerHideOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={ROUTER.HOME_SCREEN}
        component={HomeScreen}
        options={headerHideOptions}
      />
      <MainStack.Screen
        name={ROUTER.CHALLENGE_EXPLAIN_SCREEN}
        component={ChallengeExplainScreen}
        options={headerHideOptions}
      />
      <MainStack.Screen
        name={ROUTER.CHALLENGE_APPLY_SCREEN}
        component={ChallengeApplyScreen}
        options={headerHideOptions}
      />
    </MainStack.Navigator>
  );
}

export default MainStackScreen;
