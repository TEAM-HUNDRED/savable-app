import React from 'react';
import {StyleSheet, View} from 'react-native';
import ChallengeCard from '../../components/card/ChallengeCard';
import SVText from '../../components/common/SVText';
import {AppStyles} from '../../config';

function ChallengeContainer(): React.ReactElement {
  const dummy = {
    imageURI:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvELDx%2Fbtq6p7TgsZ5%2FeyuWSkOo6mY3P5hJlM1SRk%2Fimg.jpg',
    title: '챌린지',
    category: '상시 모집',
  };

  const list = [dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy];

  const listArray = () => {
    const divider = 2;
    const answer = [];

    while (list.length) {
      answer.push(list.splice(0, divider));
    }

    return answer;
  };

  return (
    <View style={styles.container}>
      <SVText header01>참여 가능한 챌린지</SVText>
      {listArray().map((itemList, idx) => {
        return (
          <View key={idx} style={styles.content}>
            {itemList.map((item, index) => {
              return <ChallengeCard {...item} key={`${item.title}-${index}`} />;
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: AppStyles.scaleWidth(40),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: AppStyles.scaleWidth(30),
  },
});

export default React.memo(ChallengeContainer);
