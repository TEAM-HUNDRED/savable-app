import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

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

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.CHALLENGE_EXPLAIN_SCREEN>;
};

function ChallengeExplainScreen({route}: PropsType): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const [challengeInfo, setChallengeInfo] = useState<ChallengeInfoViewType>();

  const navigateToApplyScreen = useCallback(() => {
    navigation.navigate(ROUTER.CHALLENGE_APPLY_SCREEN, {
      challengeInfo: challengeInfo,
    });
  }, [navigation, challengeInfo]);

  const handleNavigationHeader = useCallback(
    (title: string) => {
      navigation.setOptions({title: title});
    },
    [navigation],
  );

  const getChallengeDetail = useCallback(
    async (challengeId: number) => {
      try {
        const response = await Api.shared.getChallengeDetail(challengeId);

        setChallengeInfo({
          ...response.challenge,
          guide: response.verificationGuide,
        });

        handleNavigationHeader(response.challenge.title);
      } catch (error) {
        console.log(error);
      }
    },
    [handleNavigationHeader],
  );

  useEffect(() => {
    getChallengeDetail(route.params.challengeId);
  }, [route, getChallengeDetail]);

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
          verificationDescription={challengeInfo.verificationDescription}
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
        <VerificationGuideCard flatListData={challengeInfo.guide} />
      </View>
      <SVDivider />
      <View style={styles.defaultHorizontal}>
        <ChallengeGuideCard {...CHALLENGE_GUIDE_CONFIG[1]} />
      </View>
      <View style={styles.buttonContainer}>
        <SVButton
          borderRadius={AppStyles.scaleWidth(8)}
          onPress={navigateToApplyScreen}>
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

export default React.memo(ChallengeExplainScreen);
