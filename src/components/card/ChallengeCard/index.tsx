import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../config';
import {ChallengeViewType} from '../../../types/view/challenge';
import SVText from '../../common/SVText';

type PropsType = ChallengeViewType & {};

function ChallengeCard({
  image,
  title,
  hasDeadline,
}: PropsType): React.ReactElement {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <SVText body06 style={styles.titleText}>
        {title}
      </SVText>
      <View style={styles.category}>
        <SVText caption01>{hasDeadline ? '' : '상시 모집'}</SVText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: AppStyles.scaleWidth(160),
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

export default React.memo(ChallengeCard);
