import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Api from '../../../lib/api/Api';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';

import {
  ChallengeVerificationInfoPropsType,
  ParticipationChallengeInfoPropsType,
} from '../../../types/view';

import SVButton from '../../../components/common/SVButton';
import ParticipationChallengeInfoCard from '../../../components/card/ParticipationChallengeInfoCard';
import SVDivider from '../../../components/common/SVDivider';
import VerificationStatusCard from '../../../components/card/VerificationStatusCard';

type PropsType = {
  route: RouteProp<
    MainScreenStackPropsList,
    ROUTER.PARTICIPATED_CHALLENGE_STATUS_SCREEN
  >;
};

function ParticipatedChallengeStatusScreen({
  route,
}: PropsType): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const [challengeInfo, setChallengeInfo] =
    useState<ParticipationChallengeInfoPropsType>(
      {} as ParticipationChallengeInfoPropsType,
    );
  const [verificationInfo, setVerificationInfo] =
    useState<ChallengeVerificationInfoPropsType>(
      {} as ChallengeVerificationInfoPropsType,
    );

  const getParticipationChallengeStatus = useCallback(
    async (challengeId: number) => {
      try {
        const response = await Api.shared.getParticipationChallengeStatus(
          challengeId,
        );

        setVerificationInfo({
          ...response.verificationInfoDto,
          verificationList:
            response.verificationInfoDto.verificationResponseDtos,
        });
        setChallengeInfo(response.participationChallengeInfoDto);
      } catch (error) {
        console.log(
          '[Error: Failed to get participation challenge status',
          error,
        );
      }
    },
    [],
  );

  const handleNavigationHeader = useCallback(
    (title: string) => {
      navigation.setOptions({title: title});
    },
    [navigation],
  );

  const navigateToVerificationScreen = () => {
    navigation.navigate(ROUTER.VERIFICATION_SCREEN, {
      challengeId: challengeInfo.challengeId,
      participationId: route.params.challengeId,
      challengeTitle: route.params.challengeTitle,
    });
  };

  useEffect(() => {
    handleNavigationHeader(route.params.challengeTitle);
    getParticipationChallengeStatus(route.params.challengeId);
  }, [handleNavigationHeader, getParticipationChallengeStatus, route]);

  if (!challengeInfo || !verificationInfo) return <></>;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image
        source={{uri: challengeInfo.image}}
        style={styles.challengeImage}
      />
      <View style={styles.paddingContainer}>
        <ParticipationChallengeInfoCard
          savings={challengeInfo.savings}
          scheduledReward={challengeInfo.scheduledReward}
          verificationGoal={challengeInfo.verificationGoal}
          startDate={challengeInfo.startDate}
          endDate={challengeInfo.endDate}
        />
      </View>
      <SVDivider />
      <VerificationStatusCard
        {...verificationInfo}
        verificationList={verificationInfo.verificationList}
      />
      {route.params.isVerifiedToday ? (
        <View style={styles.buttonContainer}>
          <SVButton
            borderRadius={AppStyles.scaleWidth(8)}
            color={AppStyles.color.gray}>
            {'인증 완료'}
          </SVButton>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <SVButton
            borderRadius={AppStyles.scaleWidth(8)}
            onPress={navigateToVerificationScreen}>
            {'인증하러 가기'}
          </SVButton>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  contentContainer: {
    paddingBottom: AppStyles.statusBarHeight,
  },
  paddingContainer: {
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  challengeImage: {
    width: '100%',
    height: AppStyles.scaleWidth(226),
  },
  defaultHorizontal: {
    marginHorizontal: AppStyles.scaleWidth(24),
  },
  noticeContainer: {
    backgroundColor: AppStyles.color.gray,
  },
  buttonContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(50),
    marginTop: AppStyles.scaleWidth(10),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
});

export default React.memo(ParticipatedChallengeStatusScreen);
