import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Images from '../../../assets/images';
import Icon from '../../../assets/icons';
import {AppStyles} from '../../../config';
import SVText from '../../../components/common/SVText';

function LoginScreen(): React.ReactElement {
  return (
    <View style={styles.container}>
      <ImageBackground source={Images.splash} style={styles.container} />
      <View style={styles.LoginContainer}>
        <TouchableOpacity style={styles.kakaoLogin} activeOpacity={1}>
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
  LoginContainer: {
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
