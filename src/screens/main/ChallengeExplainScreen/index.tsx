import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Sentry from '@sentry/react-native';

import Api from '../../../lib/api/Api';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import {CHALLENGE_GUIDE_CONFIG} from '../../../config/base';
import {ChallengeInfoViewType} from '../../../types/view';

import ChallengeInfoCard from '../../../components/card/ChallengeInfoCard';
import SVDivider from '../../../components/common/SVDivider';
import PointGuideCard from '../../../components/card/PointGuideCard';
import ChallengeGuideCard from '../../../components/card/ChallengeGuideCard';
import SVButton from '../../../components/common/SVButton';
import VerificationGuideCard from '../../../components/card/VerificationGuideCard';
import {useAmplitude} from '../../../lib/hook/useAmplitude';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.CHALLENGE_EXPLAIN_SCREEN>;
};

function ChallengeExplainScreen({route}: PropsType): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();
  const {trackEvent} = useAmplitude();

  const [challengeInfo, setChallengeInfo] = useState<ChallengeInfoViewType>();

  const navigateToApplyScreen = useCallback(() => {
    trackEvent('CLICK_NAVIGATE_TO_APPLY_IN_EXPLAIN_SCREEN');
    navigation.navigate(ROUTER.CHALLENGE_APPLY_SCREEN, {
      challengeInfo: challengeInfo,
    });
  }, [navigation, challengeInfo, trackEvent]);

  const handleNavigationHeader = useCallback(
    (title: string) => {
      navigation.setOptions({title: title});
    },
    [navigation],
  );

  const getChallengeDetail = useCallback(async (challengeId: number) => {
    try {
      const response = await Api.shared.getChallengeDetail(challengeId);

      setChallengeInfo({
        ...response.challenge,
        guide: response.verificationGuide,
        isParticipatable: response.isParticipatable,
      });
      trackEvent('CHALLENGE_EXPLAIN_SCREEN_VIEW');
    } catch (error) {
      console.log('[Error: Failed to get challenge details]', error);
      Sentry.captureException(error);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in getChallengeDetail Method',
      );
    }
  }, []);

  useEffect(() => {
    handleNavigationHeader(route.params.challengeTitle);
    getChallengeDetail(route.params.challengeId);
  }, [route, getChallengeDetail, handleNavigationHeader]);

  if (!challengeInfo) return <></>;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image
        source={{uri: challengeInfo.image}}
        style={styles.challengeImage}
      />
      <View style={styles.defaultHorizontal}>
        <ChallengeInfoCard
          title={challengeInfo.title}
          explanation={challengeInfo.explanation}
          reward={challengeInfo.reward}
          hasDeadline={challengeInfo.hasDeadline}
          startDate={challengeInfo.startDate}
          endDate={challengeInfo.endDate}
        />
      </View>
      <SVDivider />
      <View style={styles.defaultHorizontal}>
        <PointGuideCard />
      </View>
      <SVDivider />
      <View style={styles.defaultHorizontal}>
        <ChallengeGuideCard {...CHALLENGE_GUIDE_CONFIG[0]} />
      </View>
      <SVDivider />
      <View>
        <VerificationGuideCard
          flatListData={challengeInfo.guide}
          verificationDescription={challengeInfo.verificationDescription}
        />
      </View>
      <SVDivider />
      <View style={styles.defaultHorizontal}>
        <ChallengeGuideCard {...CHALLENGE_GUIDE_CONFIG[1]} />
      </View>
      <View style={styles.buttonContainer}>
        <SVButton
          borderRadius={AppStyles.scaleWidth(8)}
          color={
            challengeInfo.isParticipatable
              ? AppStyles.color.mint05
              : AppStyles.color.gray02
          }
          onPress={
            challengeInfo.isParticipatable ? navigateToApplyScreen : () => {}
          }>
          {challengeInfo.isParticipatable ? '신청하기' : '신청 완료'}
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

export default React.memo(ChallengeExplainScreen);
