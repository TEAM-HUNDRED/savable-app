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
    useState<ParticipationChallengeInfoPropsType>();
  const [verificationInfo, setVerificationInfo] =
    useState<ChallengeVerificationInfoPropsType>();

  const getParticipationChallengeStatus = useCallback(
    async (challengeId: number) => {
      const response = await Api.shared.getParticipationChallengeStatus(
        challengeId,
      );
      setVerificationInfo(response.verificationInfo);
      setChallengeInfo(response.participationChallengeInfo);
    },
    [],
  );

  const handleNavigationHeader = useCallback(
    (title: string) => {
      navigation.setOptions({title: title});
    },
    [navigation],
  );

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

      <View style={styles.buttonContainer}>
        <SVButton borderRadius={AppStyles.scaleWidth(8)} onPress={() => {}}>
          {'신청하기'}
        </SVButton>
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
    paddingBottom: AppStyles.statusBarHeight,
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
    marginTop: AppStyles.scaleWidth(24),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
});

export default React.memo(ParticipatedChallengeStatusScreen);
