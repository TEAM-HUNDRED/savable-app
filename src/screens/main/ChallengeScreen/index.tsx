import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import MainBanner from '../../../components/banner/MainBanner';
import LogoHeader from '../../../components/header/LogoHeader';
import ChallengeContainer from '../../../container/ChallengeContainer';

function ChallengeScreen(): React.ReactElement {
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
