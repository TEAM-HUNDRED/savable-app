import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {ROUTER, MainScreenStackPropsList, AppStyles} from '../../config';

import HomeScreen from './HomeScreen';
import ChallengeExplainScreen from './ChallengeExplainScreen';
import ChallengeApplyScreen from './ChallengeApplyScreen';
import HeaderIconButton from '../../components/header/HeaderIconButton';
import Icons from '../../assets/icons';

const MainStack = createStackNavigator<MainScreenStackPropsList>();

function MainStackScreen(): React.ReactElement {
  const navigation = useNavigation();

  const screenOptions: StackNavigationOptions = {
    headerTitleStyle: AppStyles.headerTitleStyle,
    headerTitleAlign: 'center',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerLeft: () => (
      <HeaderIconButton icon={Icons.leftArrow} onPress={navigation.goBack} />
    ),
  };

  const headerHideOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen
        name={ROUTER.HOME_SCREEN}
        component={HomeScreen}
        options={headerHideOptions}
      />
      <MainStack.Screen
        name={ROUTER.CHALLENGE_EXPLAIN_SCREEN}
        component={ChallengeExplainScreen}
      />
      <MainStack.Screen
        name={ROUTER.CHALLENGE_APPLY_SCREEN}
        component={ChallengeApplyScreen}
      />
    </MainStack.Navigator>
  );
}

export default MainStackScreen;
