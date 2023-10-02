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

type PropsType = {};

function ProfileTabScreen({}: PropsType) {
  const [userInfo, setUserInfo] = useState<UserRewardInfoPropsType>(
    {} as UserRewardInfoPropsType,
  );
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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
});

export default React.memo(ProfileTabScreen);
