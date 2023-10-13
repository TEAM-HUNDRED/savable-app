import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Api from '../../../lib/api/Api';
import {
  AppStyles,
  HomeScreenStackPropsList,
  MainScreenStackPropsList,
  ROUTER,
} from '../../../config';
import {VerificationDetailPropsType} from '../../../types/view';
import SVText from '../../../components/common/SVText';
import Icons from '../../../assets/icons';
import SVButton from '../../../components/common/SVButton';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.FINISH_VERIFICATION_SCREEN>;
};

function FinishVerificationScreen({route}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();
  const homeNavigation =
    useNavigation<StackNavigationProp<HomeScreenStackPropsList>>();

  const [verificationData, setVerificationDate] =
    useState<VerificationDetailPropsType>();

  const getVerificationDetail = async () => {
    try {
      const response = await Api.shared.getVerificationDetail(
        String(route.params.challengeId),
      );

      setVerificationDate(response);
    } catch (error) {
      console.log('[Error: Failed to get verification detail]:', error);
    }
  };

  const navigateToChallengeScreen = () => {
    homeNavigation.navigate(ROUTER.PARTICIPATION_SCREEN);
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params.challengeTitle,
      headerLeft: () => <></>,
    });

    getVerificationDetail();
  }, []);

  if (!verificationData) return <></>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        {verificationData.percentage === 100 && (
          <ImageBackground
            source={Icons.celebrate}
            style={styles.backgroundImage}
          />
        )}
        <Image source={{uri: verificationData.image}} style={styles.image} />
        <View style={styles.titleContainer}>
          <SVText header01>{'절약 목표의 '}</SVText>
          <SVText header01 style={styles.highlightText}>
            {`${verificationData.percentage}%`}
          </SVText>
          <SVText header01>{' 달성'}</SVText>
        </View>
        <SVText body03 style={styles.subText}>
          {verificationData.percentage === 100
            ? '고생 많으셨어요!'
            : '잘하고 있어요!'}
        </SVText>
        <View style={styles.statusBarContainer}>
          <View
            style={[
              styles.statusBar,
              {width: AppStyles.scaleWidth(2.38 * verificationData.percentage)},
            ]}
          />
        </View>
        <View style={styles.percentContainer}>
          <SVText
            body07
            style={{
              marginLeft: AppStyles.scaleWidth(
                2.38 * verificationData.percentage,
              ),
            }}>
            {`${verificationData.percentage}%`}
          </SVText>
        </View>
        <SVText body02 style={styles.currentText}>
          {verificationData.percentage === 100
            ? '사진 확인까지 1시간 가량 소요돼요!'
            : `지금까지 ${verificationData.currentCount}회 인증 성공\n앞으로  ${
                verificationData.goalsCount - verificationData.currentCount
              }회 남았어요!`}
        </SVText>
      </View>
      <View style={styles.rewardContainer}>
        <View style={styles.statusContainer}>
          <View style={styles.barContainer}>
            <SVText body06>{'지급 예정 포인트'}</SVText>
            <View>
              <View style={styles.valueContainer}>
                <Image source={Icons.point} style={styles.icon} />
                <SVText right body06 style={styles.barValueText}>
                  {`${verificationData.scheduledReward} 포인트`}
                </SVText>
              </View>
              <SVText right caption01 style={styles.descriptionText}>
                {`이번 인증으로 ${verificationData.additionalReward}포인트 획득`}
              </SVText>
            </View>
          </View>
          <View style={styles.barContainer}>
            <SVText body06>{'총 절약 금액'}</SVText>
            <View>
              <View style={styles.valueContainer}>
                <SVText right body06 style={styles.barValueText}>
                  {`${verificationData.savings.toLocaleString()}원`}
                </SVText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SVButton
            borderRadius={AppStyles.scaleWidth(8)}
            onPress={navigateToChallengeScreen}>
            {'완료'}
          </SVButton>
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
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: AppStyles.scaleWidth(36),
    marginBottom: AppStyles.scaleWidth(12),
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex: 0,
  },
  image: {
    width: AppStyles.scaleWidth(238),
    height: AppStyles.scaleWidth(238),
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: AppStyles.scaleWidth(8),
  },
  highlightText: {
    color: AppStyles.color.mint05,
  },
  subText: {
    color: AppStyles.color.gray04,
  },
  statusBarContainer: {
    display: 'flex',
    width: AppStyles.scaleWidth(238),
    height: AppStyles.scaleWidth(22),
    borderRadius: AppStyles.scaleWidth(10),
    backgroundColor: AppStyles.color.lightGray02,
    marginTop: AppStyles.scaleWidth(16),
  },
  statusBar: {
    height: '100%',
    borderRadius: AppStyles.scaleWidth(10),
    backgroundColor: AppStyles.color.mint02,
  },
  percentContainer: {
    width: AppStyles.scaleWidth(270),
    marginTop: AppStyles.scaleWidth(4),
  },
  currentText: {
    marginVertical: AppStyles.scaleWidth(16),
  },
  rewardContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: AppStyles.scaleWidth(24),
  },
  statusContainer: {
    display: 'flex',
    height: AppStyles.scaleWidth(96),
    marginHorizontal: AppStyles.scaleWidth(46),
  },
  barContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: AppStyles.scaleWidth(12),
  },
  barValueText: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginRight: AppStyles.scaleWidth(3),
    marginBottom: AppStyles.scaleWidth(2),
  },
  descriptionText: {
    color: AppStyles.color.gray03,
  },
  buttonContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(50),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
});

export default React.memo(FinishVerificationScreen);
