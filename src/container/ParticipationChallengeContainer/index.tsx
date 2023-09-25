import React from 'react';
import {StyleSheet, View} from 'react-native';
import ParticipationChallengeCard from '../../components/card/ParticipationChallengeCard';

import SVText from '../../components/common/SVText';
import {AppStyles} from '../../config';
import {ParticipationViewPropsType} from '../../types/view';

type PropsType = {
  participationList: Array<ParticipationViewPropsType>;
};

function ParticipationChallengeContainer({
  participationList,
}: PropsType): React.ReactElement {
  return (
    <View style={styles.container}>
      <SVText header01>참여 중인 챌린지</SVText>

      {participationList.map((item, idx) => {
        return (
          <ParticipationChallengeCard {...item} key={`${item.title}-${idx}`} />
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
});

export default React.memo(ParticipationChallengeContainer);
