import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../../config';
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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.paddingContainer}>
        <View style={styles.profileContainer}></View>
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
});

export default React.memo(ProfileTabScreen);
