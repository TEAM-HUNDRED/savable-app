import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import * as Sentry from '@sentry/react-native';

import MainBanner from '../../../../components/banner/MainBanner';
import LogoHeader from '../../../../components/header/LogoHeader';
import {AppStyles} from '../../../../config';
import ChallengeContainer from '../../../../container/ChallengeContainer';
import Api from '../../../../lib/api/Api';
import {ChallengeViewType} from '../../../../types/view/challenge';

function ChallengeTabScreen(): React.ReactElement {
  const [challengeList, setChallengeList] = useState<ChallengeViewType[]>([]);

  const getChallengeList = async () => {
    try {
      const response = await Api.shared.getChallengeList();
      setChallengeList(response);
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in getChallengeList Method',
      );
    }
  };

  useEffect(() => {
    getChallengeList();
  }, []);

  if (challengeList.length === 0) return <></>;

  return (
    <ScrollView style={styles.container}>
      <LogoHeader />
      <MainBanner />
      <ChallengeContainer challengeList={challengeList} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
});

export default React.memo(ChallengeTabScreen);
