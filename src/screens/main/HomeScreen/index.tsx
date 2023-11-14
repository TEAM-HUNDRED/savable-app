import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';
import {track} from '@amplitude/analytics-react-native';

import Api from '../../../lib/api/Api';
import {MainScreenStackPropsList, ROUTER} from '../../../config/router';
import {AppStyles} from '../../../config';
import {
  ChallengeIcon,
  HomeIcon,
  PersonIcon,
  StoreIcon,
} from '../../../assets/icons';
import {handleUserInfo} from '../../../modules/redux/slice/userInfoSlice';

import ChallengeTabScreen from './ChallengeTabScreen';
import ParticipationTabScreen from './ParticipationTabScreen';
import StoreTabScreen from './StoreTabScreen';
import ProfileTabScreen from './ProfileTabScreen';

const BottomTabNavigation = createBottomTabNavigator();

async function onSignIn(user) {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
      role: 'saver',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
  ]);
}

function HomeScreen(): React.ReactElement {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const getUserInfo = async () => {
    try {
      const response = await Api.shared.getUserInfo();

      dispatch(
        handleUserInfo({
          value: {
            userName: response.username,
            userPhoneNumber: response.phoneNumber,
            userProfileImageUrl: response.profileImage,
            userTotalReward: response.totalReward,
          },
        }),
      );
      track('HOME_SCREEN_VIEW', {
        userName: response.username,
        phoneNumber: response.phoneNumber,
      });
    } catch (error) {
      console.log('[Error: Failed to get user Info', error);
      Sentry.captureException(error);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in getUserInfo Method on Home Screen',
      );

      await Api.shared.deleteCookie();
      await Api.shared.deleteSessionKeyOnStorage();
      navigation.navigate(ROUTER.LOGIN_SCREEN);
    }
  };

  const tabBarIcon = useCallback((routeName: string, color: string) => {
    switch (routeName) {
      case ROUTER.CHALLENGE_SCREEN:
        return <HomeIcon color={color} style={styles.icon} />;

      case ROUTER.PARTICIPATION_SCREEN:
        return <ChallengeIcon color={color} style={styles.icon} />;

      case ROUTER.STORE_SCREEN:
        return <StoreIcon color={color} style={styles.icon} />;

      case ROUTER.PROFILE_SCREEN:
        return <PersonIcon color={color} style={styles.icon} />;
      default:
        return <HomeIcon color={color} style={styles.icon} />;
    }
  }, []);

  const tabBarLabel: Record<string, string> = {
    [ROUTER.CHALLENGE_SCREEN]: '홈',
    [ROUTER.PARTICIPATION_SCREEN]: '인증',
    [ROUTER.STORE_SCREEN]: '상점',
    [ROUTER.PROFILE_SCREEN]: '마이페이지',
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <BottomTabNavigation.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: AppStyles.color.mint05,
        headerShown: false,
        tabBarIcon: ({color}) => tabBarIcon(route.name, color),
        tabBarLabel: tabBarLabel[route.name],
      })}>
      <BottomTabNavigation.Screen
        name={ROUTER.CHALLENGE_SCREEN}
        component={ChallengeTabScreen}
      />
      <BottomTabNavigation.Screen
        name={ROUTER.PARTICIPATION_SCREEN}
        component={ParticipationTabScreen}
      />
      <BottomTabNavigation.Screen
        name={ROUTER.STORE_SCREEN}
        component={StoreTabScreen}
      />
      <BottomTabNavigation.Screen
        name={ROUTER.PROFILE_SCREEN}
        component={ProfileTabScreen}
      />
    </BottomTabNavigation.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: AppStyles.scaleWidth(24),
    height: AppStyles.scaleWidth(24),
    marginTop: AppStyles.scaleWidth(4),
  },
  tabBarStyle: {
    height: AppStyles.scaleWidth(50),
  },
  tabStyle: {
    borderTopColor: AppStyles.color.lightGray,
    borderTopWidth: AppStyles.scaleWidth(0.5),
    height: AppStyles.scaleWidth(50),
  },
});

export default HomeScreen;
