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
        <SVText
          center
          body04
          color={AppStyles.color.gray04}
          style={styles.text}>
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
    bottom: AppStyles.scaleWidth(60),
    minHeight: AppStyles.scaleWidth(50),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  contentContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: AppStyles.color.lightGray02,
    borderRadius: AppStyles.scaleWidth(50),
    paddingHorizontal: AppStyles.scaleWidth(24),
    paddingVertical: AppStyles.scaleWidth(10),
  },
  text: {
    paddingBottom: AppStyles.scaleWidth(2),
    lineHeight: AppStyles.scaleWidth(22),
    fontWeight: 'bold',
  },
});

export default ToastBar;
