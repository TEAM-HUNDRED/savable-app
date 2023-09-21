import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../config';

import SVText from '../../common/SVText';

type PropsType = {
  title: string;
  value: string;
  description?: string;
  valueIcon?: ImageSourcePropType;
};

function ChallengeInfoBar({
  title,
  value,
  valueIcon,
  description,
}: PropsType): React.ReactElement {
  return (
    <View style={styles.container}>
      <SVText body08>{title}</SVText>
      <View>
        <View style={styles.valueContainer}>
          {valueIcon && <Image source={valueIcon} style={styles.image} />}
          <SVText right body06 style={styles.titleText}>
            {value}
          </SVText>
        </View>
        {description && (
          <SVText right caption01 style={styles.descriptionText}>
            {description}
          </SVText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: AppStyles.scaleWidth(6),
    paddingBottom: AppStyles.scaleWidth(10),
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    marginRight: AppStyles.scaleWidth(3),
    marginBottom: AppStyles.scaleWidth(2),
  },
  titleText: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  descriptionText: {
    color: AppStyles.color.gray03,
    marginTop: AppStyles.scaleWidth(4),
  },
});

export default React.memo(ChallengeInfoBar);
