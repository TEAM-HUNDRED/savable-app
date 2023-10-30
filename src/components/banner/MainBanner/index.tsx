import React from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {track} from '@amplitude/analytics-react-native';
import {useSelector} from 'react-redux';

import Images from '../../../assets/images';
import {AppStyles} from '../../../config';
import {RootState} from '../../../modules/redux/RootReducer';

function MainBanner() {
  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonContainer}
        onPress={() => {
          track('CLICK_MAIN_BANNER', {
            userName: userInfo.userName,
            phoneNumber: userInfo.userPhoneNumber,
          });
          Linking.openURL('https://bit.ly/savable-event-oopy');
        }}>
        <Image source={Images.rewardEvent} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(190),
  },
  buttonContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(MainBanner);
