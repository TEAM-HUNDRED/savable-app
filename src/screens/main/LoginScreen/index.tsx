import React, {useEffect} from 'react';
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

  const navigateToHomeScreen = () => {
    navigation.replace(ROUTER.HOME_SCREEN);
  };

  const signUp = async (payload: SignUpPayload) => {
    return await Api.shared
      .signUp(payload)
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error;
      });
  };

  const onPressKakaoLogin = async () => {
    try {
      await login();
      const profile = await getProfile();

      const {sessionKey: currentSessionKey, data} = await signUp(
        profile as SignUpPayload,
      );

      if (data.isRegistered) {
        await Api.shared.setSessionKeyOnStorage(currentSessionKey);
        navigateToHomeScreen();
      } else {
        navigateToUpdateProfileScreen(currentSessionKey);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthentication) navigation.navigate(ROUTER.HOME_SCREEN);
  }, [isAuthentication, navigation, loading]);

  console.log(loading, isAuthentication);

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
