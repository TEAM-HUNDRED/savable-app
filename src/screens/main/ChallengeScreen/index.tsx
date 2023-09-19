import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import MainBanner from '../../../components/banner/MainBanner';
import LogoHeader from '../../../components/header/LogoHeader';
import ChallengeContainer from '../../../container/ChallengeContainer';
import Api from '../../../lib/api/Api';

function ChallengeScreen(): React.ReactElement {
  const getChallengeList = async () => {
    const response = await Api.shared.getChallengeList();
    console.log(response);
  };

  useEffect(() => {
    getChallengeList();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LogoHeader />
      <MainBanner />
      <ChallengeContainer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ChallengeScreen);
