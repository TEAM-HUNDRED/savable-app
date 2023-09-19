import React from 'react';
import {StyleSheet, View} from 'react-native';

import ChallengeCard from '../../components/card/ChallengeCard';
import SVText from '../../components/common/SVText';
import {AppStyles} from '../../config';
import {ChallengeViewType} from '../../types/view/challenge';

type PropsType = {
  challengeList: Array<ChallengeViewType>;
};

function ChallengeContainer({challengeList}: PropsType): React.ReactElement {
  const listArray = () => {
    const divider = 2;
    const array = [];
    let index = 0;

    while (challengeList.length > index) {
      array.push(challengeList.slice(index, index + divider));
      index = index + divider;
    }

    return array;
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
