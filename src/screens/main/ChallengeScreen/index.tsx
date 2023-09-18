import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import MainBanner from '../../../components/banner/MainBanner';
import ChallengeCard from '../../../components/card/ChallengeCard';
import LogoHeader from '../../../components/header/LogoHeader';

function ChallengeScreen(): React.ReactElement {
  const dummy = {
    imageURI:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvELDx%2Fbtq6p7TgsZ5%2FeyuWSkOo6mY3P5hJlM1SRk%2Fimg.jpg',
    title: 'string',
    category: 'string',
  };

  return (
    <ScrollView style={styles.container}>
      <LogoHeader />
      <MainBanner />
      <ChallengeCard {...dummy} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ChallengeScreen);
