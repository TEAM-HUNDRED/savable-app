import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  AppStyles,
  HomeScreenStackPropsList,
  MainScreenStackPropsList,
  ROUTER,
} from '../../../../config';
import {CheckIcon} from '../../../../assets/icons';

import SVText from '../../../../components/common/SVText';
import SVDivider from '../../../../components/common/SVDivider';
import SVButton from '../../../../components/common/SVButton';
import Api from '../../../../lib/api/Api';
import {
  UserChallengeInfoPropsType,
  UserRewardInfoPropsType,
} from '../../../../types/view';

type PropsType = {};

function ProfileTabScreen({}: PropsType) {
  const [userInfo, setUserInfo] = useState<UserRewardInfoPropsType>();
  const [userChallengeInfo, setUserChallengeInfo] =
    useState<UserChallengeInfoPropsType>();

  const getUserInfo = async () => {
    try {
      const response = await Api.shared.getUserInfo();

      setUserChallengeInfo(response.challenge);
      setUserInfo(response.information);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.paddingContainer}>
        <View style={styles.profileContainer}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  paddingContainer: {
    paddingHorizontal: AppStyles.scaleWidth(24),
    paddingVertical: AppStyles.scaleWidth(36),
  },
  profileContainer: {
    height: AppStyles.scaleWidth(64),
    backgroundColor: AppStyles.color.lightGray02,
  },
});

export default React.memo(ProfileTabScreen);
