import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';

import Api from '../../../lib/api/Api';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import {ChallengeInfoViewType} from '../../../types/view';
import ChallengeInfoCard from '../../../components/card/ChallengeInfoCard';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.CHALLENGE_EXPLAIN_SCREEN>;
};

function ChallengeExplainScreen({route}: PropsType): React.ReactElement {
  const navigation = useNavigation();

  const [challengeInfo, setChallengeInfo] = useState<ChallengeInfoViewType>();

  const handleNavigationHeader = useCallback(
    (title: string) => {
      navigation.setOptions({title: title});
    },
    [navigation],
  );

  const getChallengeDetail = useCallback(
    async (challengeId: number) => {
      const response = await Api.shared.getChallengeDetail(challengeId);

      setChallengeInfo({
        ...response.challenge,
        guide: response.verificationGuide,
      });

      handleNavigationHeader(response.challenge.title);
    },
    [handleNavigationHeader],
  );

  useEffect(() => {
    getChallengeDetail(route.params.challengeId);
  }, [route, getChallengeDetail]);

  if (!challengeInfo) return <></>;

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  challengeImage: {
    width: '100%',
    height: AppStyles.scaleWidth(226),
  },
  defaultHorizontal: {
    marginHorizontal: AppStyles.scaleWidth(24),
  },
});

export default React.memo(ChallengeExplainScreen);
