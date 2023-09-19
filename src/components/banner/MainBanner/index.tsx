import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStyles} from '../../../config';

function MainBanner() {
  return <View style={styles.headerContainer} />;
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(190),
    backgroundColor: AppStyles.color.deepGray,
  },
});

export default React.memo(MainBanner);
