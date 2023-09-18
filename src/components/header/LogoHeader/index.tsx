import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStyles} from '../../../config';
import SVText from '../../common/SVText';

function LogoHeader() {
  return (
    <View style={styles.headerContainer}>
      <SVText logo>savable</SVText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: AppStyles.scaleWidth(24),
    paddingVertical: AppStyles.scaleWidth(16),
  },
});

export default React.memo(LogoHeader);
