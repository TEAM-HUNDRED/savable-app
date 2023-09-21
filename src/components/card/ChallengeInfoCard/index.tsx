import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../config';

import SVText from '../../common/SVText';

type PropsType = {
  title: string;
  explanation: string;
  verificationDescription: string;
  reward: number;
  hasDeadline: boolean;
  startDate: string;
  endDate: string;
};

function ChallengeInfoCard({
  title,
  explanation,
  verificationDescription,
  reward,
  hasDeadline,
  startDate,
  endDate,
}: PropsType): React.ReactElement {
  console.log(
    title,
    explanation,
    verificationDescription,
    reward,
    hasDeadline,
    startDate,
    endDate,
  );

  return (
    <View style={styles.container}>
      <SVText body06 style={styles.titleText}>
        {title}
      </SVText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: AppStyles.scaleWidth(20),
    marginHorizontal: AppStyles.scaleWidth(24),
  },
  image: {
    width: '100%',
    height: AppStyles.scaleWidth(104),
    borderRadius: AppStyles.scaleWidth(10),
  },
  titleText: {
    marginVertical: AppStyles.scaleWidth(4),
  },
  category: {
    backgroundColor: AppStyles.color.lightGray02,
    borderRadius: AppStyles.scaleWidth(4),
    paddingHorizontal: AppStyles.scaleWidth(6),
    marginRight: AppStyles.scaleWidth(6),
    alignSelf: 'flex-start',
  },
});

export default React.memo(ChallengeInfoCard);
