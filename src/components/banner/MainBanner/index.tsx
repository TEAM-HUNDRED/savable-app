import React from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import Images from '../../../assets/images';
import {AppStyles} from '../../../config';

function MainBanner() {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonContainer}
        onPress={() => {
          Linking.openURL(
            'https://superb-nannyberry-327.notion.site/APP-d0e6b7c5ac9a4186b26fe2292a97b28d?pvs=4',
          );
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
