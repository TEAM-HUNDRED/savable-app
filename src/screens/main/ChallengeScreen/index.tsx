import React from 'react';
import {StyleSheet, View} from 'react-native';
import ChallengeCard from '../../../components/card/ChallengeCard';

function ChallengeScreen(): React.ReactElement {
  const dummy = {
    imageURI:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvELDx%2Fbtq6p7TgsZ5%2FeyuWSkOo6mY3P5hJlM1SRk%2Fimg.jpg',
    title: 'string',
    category: 'string',
  };

  return (
    <View style={styles.container}>
      <ChallengeCard {...dummy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ChallengeScreen);
