import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import KakaoLogins, {getProfile} from '@react-native-seoul/kakao-login';

import {MainScreenStackPropsList} from '../../../config';

function UpdateProfileScreen(): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const [profileData, setProfileData] = useState<KakaoLogins.KakaoProfile>();

  const getKakaoProfile: () => Promise<KakaoLogins.KakaoProfile> = async () => {
    return await getProfile()
      .then(result => {
        setProfileData(result);
        return result;
      })
      .catch(error => {
        throw error;
      });
  };

  console.log(profileData);

  useEffect(() => {
    getKakaoProfile();
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(UpdateProfileScreen);
