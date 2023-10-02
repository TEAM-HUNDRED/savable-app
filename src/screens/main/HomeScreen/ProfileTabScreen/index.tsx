import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AppStyles, HomeScreenStackPropsList, ROUTER} from '../../../../config';
import Icons from '../../../../assets/icons';

import Api from '../../../../lib/api/Api';
import {
  UserChallengeInfoPropsType,
  UserRewardInfoPropsType,
} from '../../../../types/view';

import SVText from '../../../../components/common/SVText';
import SVDivider from '../../../../components/common/SVDivider';

type PropsType = {};

function ProfileTabScreen({}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<HomeScreenStackPropsList>>();

  const [userInfo, setUserInfo] = useState<UserRewardInfoPropsType>(
    {} as UserRewardInfoPropsType,
  );
  const [userChallengeInfo, setUserChallengeInfo] =
    useState<UserChallengeInfoPropsType>({} as UserChallengeInfoPropsType);

  const getUserInfo = async () => {
    try {
      const response = await Api.shared.getUserInfo();

      setUserChallengeInfo(response.challenge);
      setUserInfo(response.information);
    } catch (error) {
      console.log(error);
    }
  };

  const userRewardInfoList = [
    {
      index: '포인트',
      value: `${userInfo.totalReward}포인트`,
      icon: Icons.point,
      description: `${userInfo.scheduledReward}포인트`,
    },
    {
      index: '총 절약 금액',
      value: `${userInfo.totalSavings}원`,
    },
    {
      index: '인증 횟수',
      value: `${userInfo.verificationCount}회`,
    },
  ];

  const userChallengeInfoList = [
    {
      index: '진행중',
      value: `${userChallengeInfo.participation}`,
    },
    {
      index: '성공',
      value: `${userChallengeInfo.success}`,
    },
    {
      index: '완료',
      value: `${userChallengeInfo.completion}`,
    },
  ];

  const navigationBarList = [
    {
      title: '기프티콘 구매 내역',
      onPress: () => {},
    },
    {
      title: '문의하기',
      onPress: () => {},
    },
    {
      title: '로그아웃',
      onPress: () => {},
    },
    {
      title: '탈퇴하기',
      onPress: () => {},
    },
  ];

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.paddingContainer}>
        <View style={styles.profileContainer} />
        <View style={styles.statusContainer}>
          {userRewardInfoList.map((item, idx) => {
            const isLastItem = idx === userRewardInfoList.length - 1;

            return (
              <>
                <View style={styles.barContainer}>
                  <SVText body08>{item.index}</SVText>
                  <View>
                    <View style={styles.valueContainer}>
                      {item.icon && (
                        <Image source={item.icon} style={styles.image} />
                      )}
                      <SVText right body06 style={styles.barValueText}>
                        {item.value}
                      </SVText>
                    </View>
                    {item.description && (
                      <SVText right caption01 style={styles.descriptionText}>
                        {item.description}
                      </SVText>
                    )}
                  </View>
                </View>
                {!isLastItem && <View style={styles.divider} />}
              </>
            );
          })}
        </View>
        <SVText body03 style={styles.titleText}>
          {'챌린지 현황'}
        </SVText>
        <View style={styles.challengeStatusContainer}>
          {userChallengeInfoList.map((item, idx) => {
            const isLastItem = idx === userChallengeInfoList.length - 1;

            return (
              <>
                <View style={styles.challengeBarContainer}>
                  <SVText body06>{item.index}</SVText>
                  <SVText header01>{item.value}</SVText>
                </View>
                {!isLastItem && <View style={styles.verticalDivider} />}
              </>
            );
          })}
        </View>
      </View>
      <SVDivider />
      {navigationBarList.map((item, idx) => {
        const isLastItem = idx === navigationBarList.length - 1;
        return (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.navigateBarContainer}
              onPress={item.onPress}>
              <SVText body04 style={styles.barText}>
                {item.title}
              </SVText>
            </TouchableOpacity>
            {!isLastItem && <View style={styles.divider} />}
          </>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  contentContainer: {
    paddingVertical: AppStyles.scaleWidth(36),
  },
  paddingContainer: {
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  profileContainer: {
    height: AppStyles.scaleWidth(64),
    backgroundColor: AppStyles.color.lightGray02,
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginVertical: AppStyles.scaleWidth(24),
    borderWidth: AppStyles.scaleWidth(1),
    borderRadius: AppStyles.scaleWidth(8),
    borderColor: AppStyles.color.lightGray02,
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: AppStyles.scaleWidth(10),
    marginHorizontal: AppStyles.scaleWidth(12),
  },
  divider: {
    height: AppStyles.scaleWidth(1),
    backgroundColor: AppStyles.color.lightGray02,
  },
  barValueText: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    marginRight: AppStyles.scaleWidth(3),
    marginBottom: AppStyles.scaleWidth(2),
  },
  descriptionText: {
    color: AppStyles.color.gray03,
  },
  titleText: {
    fontWeight: 'bold',
  },
  challengeStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: AppStyles.scaleWidth(16),
    marginBottom: AppStyles.scaleWidth(30),
    borderWidth: AppStyles.scaleWidth(1),
    borderRadius: AppStyles.scaleWidth(8),
    borderColor: AppStyles.color.lightGray02,
  },
  challengeBarContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginVertical: AppStyles.scaleWidth(10),
  },
  verticalDivider: {
    width: AppStyles.scaleWidth(1),
    height: '100%',
    backgroundColor: AppStyles.color.lightGray02,
  },
  valueText: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  indexText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  navigateBarContainer: {
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingVertical: AppStyles.scaleWidth(14),
    paddingHorizontal: AppStyles.scaleWidth(28),
  },
  barText: {
    marginTop: AppStyles.scaleWidth(2),
  },
});

export default React.memo(ProfileTabScreen);
