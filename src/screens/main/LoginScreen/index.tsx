import React, {useCallback, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {login, getProfile} from '@react-native-seoul/kakao-login';
import * as Sentry from '@sentry/react-native';
import {track} from '@amplitude/analytics-react-native';

import Api from '../../../lib/api/Api';
import {useAuthentication} from '../../../lib/hook/useAuthentication';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import {SignUpPayload} from '../../../types/api';

import Images from '../../../assets/images';
import Icon from '../../../assets/icons';
import SVText from '../../../components/common/SVText';

function LoginScreen(): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();
  const {isAuthentication, loading} = useAuthentication();

  const navigateToUpdateProfileScreen = (currentKey: string) => {
    navigation.navigate(ROUTER.UPDATE_PROFILE_SCREEN, {sessionKey: currentKey});
  };

  const navigateToHomeScreen = useCallback(() => {
    navigation.replace(ROUTER.HOME_SCREEN);
  }, [navigation]);

  const onPressKakaoLogin = async () => {
    try {
      await login();
      const kakaoProfile = await getProfile();

      const {sessionKey: currentSessionKey, data} = await Api.shared.signUp(
        kakaoProfile as SignUpPayload,
      );

      console.log(currentSessionKey, data, 'kakaoLogin');

      if (data.isRegistered) {
        await Api.shared.setCookie(currentSessionKey);
        await Api.shared.setSessionKeyOnStorage(currentSessionKey);
        navigateToHomeScreen();
      } else {
        navigateToUpdateProfileScreen(currentSessionKey);
      }
      track('SUCCESS_KAKAO_LOGIN', {
        userName: kakaoProfile.nickname,
        age: kakaoProfile.ageRange,
        gender: kakaoProfile.gender,
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in onPressKakaoLogin Method',
      );
      track('FAILURE_KAKAO_LOGIN');
    }
  };

  useEffect(() => {
    if (isAuthentication) navigateToHomeScreen();
  }, [isAuthentication, loading, navigateToHomeScreen]);

  useEffect(() => {
    track('LOGIN_SCREEN_VIEW');
  }, []);

  if (loading || isAuthentication)
    return <ImageBackground source={Images.splash} style={styles.container} />;

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.splash} style={styles.container} />
      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.kakaoLogin}
          activeOpacity={1}
          onPress={onPressKakaoLogin}>
          <Image source={Icon.oauth.kakao} style={styles.icon} />
          <SVText body05 style={styles.buttonText}>
            {'카카오로 시작하기'}
          </SVText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: AppStyles.scaleWidth(42),
    bottom: AppStyles.scaleWidth(42),
  },
  kakaoLogin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7E600',
    width: '100%',
    height: AppStyles.scaleWidth(40),
    paddingHorizontal: AppStyles.scaleWidth(12),
    borderRadius: AppStyles.scaleWidth(6),
    marginBottom: AppStyles.scaleWidth(20),
  },
  icon: {
    width: AppStyles.scaleWidth(36),
    height: AppStyles.scaleWidth(36),
  },
  buttonText: {
    fontFamily: 'NotoSansKR-Bold',
    marginTop: AppStyles.scaleWidth(2),
    marginRight: AppStyles.scaleWidth(10),
  },
});

export default React.memo(LoginScreen);
