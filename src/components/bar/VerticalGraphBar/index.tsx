import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../config';
import SVText from '../../common/SVText';

type PropsType = {
  percent: number;
};

function VerticalGraphBar({percent}: PropsType) {
  const colorBarHeight = {height: AppStyles.scaleWidth(percent)};
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.colorBar, colorBarHeight]} />
      </View>
      <SVText caption01>{`${percent}%`}</SVText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  barContainer: {
    justifyContent: 'flex-end',
    width: AppStyles.scaleWidth(30),
    height: AppStyles.scaleWidth(100),
    borderRadius: AppStyles.scaleWidth(5),
    marginBottom: AppStyles.scaleWidth(3),
    backgroundColor: AppStyles.color.lightGray02,
  },
  colorBar: {
    width: '100%',
    borderRadius: AppStyles.scaleWidth(5),
    backgroundColor: AppStyles.color.point01,
  },
});

export default React.memo(VerticalGraphBar);
