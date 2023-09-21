import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStyles} from '../../../config';

function SVDivider() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: AppStyles.scaleWidth(10),
    backgroundColor: AppStyles.color.lightGray02,
  },
});

export default React.memo(SVDivider);
