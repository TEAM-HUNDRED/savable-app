import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {MainScreenStackPropsList, ROUTER} from '../../config/router';
import LoginScreen from './LoginScreen';
import ChallengeScreen from './ChallengeScreen';

const MainStack = createStackNavigator<MainScreenStackPropsList>();

function MainStackScreen(): React.ReactElement {
  const screenOptions: StackNavigationOptions = {};
  const headerHideOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen
        name={ROUTER.LOGIN_SCREEN}
        component={ChallengeScreen}
        options={headerHideOptions}
      />
    </MainStack.Navigator>
  );
}

export default MainStackScreen;
