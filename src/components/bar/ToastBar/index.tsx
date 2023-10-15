import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStyles} from '../../../config';
import SVText from '../../common/SVText';

type PropsType = {
  text: string;
  handleVisible: () => void;
};

function ToastBar({text, handleVisible}: PropsType) {
  useEffect(() => {
    setTimeout(() => {
      handleVisible();
    }, 2000);
  }, [handleVisible]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SVText body02 color={AppStyles.color.white} style={styles.text}>
          {text}
        </SVText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: AppStyles.scaleWidth(40),
    height: AppStyles.scaleWidth(50),
    paddingHorizontal: AppStyles.scaleWidth(50),
  },
  contentContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.gray03,
    borderRadius: AppStyles.scaleWidth(25),
    paddingHorizontal: AppStyles.scaleWidth(8),
  },
  text: {
    paddingBottom: AppStyles.scaleWidth(2),
  },
});

export default ToastBar;
