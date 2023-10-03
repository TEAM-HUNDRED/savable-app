import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Icons from '../../../assets/icons';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import {ParticipationViewPropsType} from '../../../types/view';

import SVText from '../../common/SVText';

type PropsType = ParticipationViewPropsType & {};

function ParticipationChallengeCard({
  participationChallengeId,
  image,
  title,
  remainingVerification,
  percentage,
  scheduledReward,
  savings,
  isVerifiedToday,
}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const navigateToVerificationScreen = () => {
    navigation.navigate(ROUTER.VERIFICATION_SCREEN);
  };

  const navigateToChallengeStatusScreen = () => {
    navigation.navigate(ROUTER.PARTICIPATED_CHALLENGE_STATUS_SCREEN, {
      challengeId: participationChallengeId,
      challengeTitle: title,
      isVerifiedToday: isVerifiedToday,
    });
  };

  const onPressButton = () => {
    navigateToVerificationScreen();
  };

  const challengeInfoConfig = [
    {
      title: '목표 달성률',
      value: `${percentage}%`,
      description: `남은 인증 횟수 ${remainingVerification}회`,
    },
    {
      title: '지급 예정 포인트',
      value: `${scheduledReward} 포인트`,
      valueIcon: Icons.point,
    },
    {
      title: '총 절약 금액',
      value: `${savings.toLocaleString()}원`,
    },
  ];

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={navigateToChallengeStatusScreen}>
      <View style={styles.contentContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.textContainer}>
          <SVText body06 style={styles.titleText}>
            {title}
          </SVText>
          {challengeInfoConfig.map((item, idx) => {
            return (
              <View style={styles.barContainer} key={`${item.title} - ${idx}`}>
                <SVText body08>{item.title}</SVText>
                <View>
                  <View style={styles.valueContainer}>
                    {item.valueIcon && (
                      <Image source={item.valueIcon} style={styles.icon} />
                    )}
                    <SVText right caption01>
                      {item.value}
                    </SVText>
                  </View>
                  {item.description && (
                    <SVText right caption02 style={styles.descriptionText}>
                      {item.description}
                    </SVText>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <TouchableOpacity
        onPress={onPressButton}
        activeOpacity={0.8}
        disabled={isVerifiedToday ? true : false}
        style={
          isVerifiedToday
            ? styles.highlightButtonContainer
            : styles.buttonContainer
        }>
        <SVText body06 style={styles.buttonText}>
          {isVerifiedToday ? '인증 현황 보러 가기' : '인증하러 가기'}
        </SVText>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: AppStyles.scaleWidth(14),
    paddingHorizontal: AppStyles.scaleWidth(16),
    paddingVertical: AppStyles.scaleWidth(16),
    borderWidth: AppStyles.scaleWidth(1),
    borderRadius: AppStyles.scaleWidth(20),
    borderColor: AppStyles.color.lightGray02,
  },
  image: {
    width: AppStyles.scaleWidth(58),
    height: AppStyles.scaleWidth(58),
    marginRight: AppStyles.scaleWidth(14),
    borderRadius: AppStyles.scaleWidth(29),
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    marginBottom: AppStyles.scaleWidth(8),
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: AppStyles.scaleWidth(4),
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlignVertical: 'center',
  },
  icon: {
    width: AppStyles.scaleWidth(12),
    height: AppStyles.scaleWidth(12),
    marginRight: AppStyles.scaleWidth(3),
    marginTop: AppStyles.scaleWidth(1),
  },
  descriptionText: {
    color: AppStyles.color.gray03,
  },
  buttonContainer: {
    height: AppStyles.scaleWidth(26),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.gray,
    marginTop: AppStyles.scaleWidth(8),
    borderRadius: AppStyles.scaleWidth(6),
  },
  highlightButtonContainer: {
    height: AppStyles.scaleWidth(26),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.gray02,
    marginTop: AppStyles.scaleWidth(8),
    borderRadius: AppStyles.scaleWidth(6),
  },
  buttonText: {
    color: AppStyles.color.white,
    fontWeight: 'bold',
  },
});

export default React.memo(ParticipationChallengeCard);
