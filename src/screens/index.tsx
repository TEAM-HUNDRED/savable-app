import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {RootScreenStackPropsList, ROUTER} from '../config';
import MainStackScreen from './main';

const RootStack = createStackNavigator<RootScreenStackPropsList>();

function RouterScreen(): React.ReactElement {
  const headerShownOptions: StackNavigationOptions = {
    headerShown: false,
    headerTitleAlign: 'center',
  };

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={ROUTER.MAIN_SCREEN}
        component={MainStackScreen}
        options={headerShownOptions}
      />
    </RootStack.Navigator>
  );
}

export default RouterScreen;
