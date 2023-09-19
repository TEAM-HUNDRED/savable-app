import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';

import Api from '../../../lib/api/Api';
import {MainScreenStackPropsList, ROUTER} from '../../../config';
import {ChallengeInfoViewType} from '../../../types/view';

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
    <View style={styles.container}>
      <Text>1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ChallengeExplainScreen);
