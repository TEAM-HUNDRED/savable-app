import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStyles} from '../../../config';
import SVButton from '../../common/SVButton';
import SVText from '../../common/SVText';

type PropsType = {
  title: string;
  subButtonText: string;
  buttonText: string;
  onPressButton: () => void;
  children: JSX.Element[] | JSX.Element;
};

function PopUpCard({
  title,
  subButtonText,
  buttonText,
  onPressButton,
  children,
}: PropsType) {
  return (
    <View style={styles.container}>
      <SVText body04 style={styles.titleText}>
        {title}
      </SVText>
      {children}
      <SVText
        body06
        color={AppStyles.color.gray04}
        style={styles.subButtonText}>
        {subButtonText}
      </SVText>
      <View style={styles.buttonContainer}>
        <SVButton
          onPress={onPressButton}
          borderRadius={AppStyles.scaleWidth(8)}>
          {buttonText}
        </SVButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: AppStyles.scaleWidth(24),
    paddingHorizontal: AppStyles.scaleWidth(20),
    paddingVertical: AppStyles.scaleWidth(20),
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.scaleWidth(16),
    borderWidth: 1,
  },
  titleText: {
    fontWeight: 'bold',
    paddingVertical: AppStyles.scaleWidth(10),
  },
  subButtonText: {
    fontWeight: 'bold',
    paddingTop: AppStyles.scaleWidth(10),
  },
  buttonContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(40),
    marginTop: AppStyles.scaleWidth(10),
  },
});

export default React.memo(PopUpCard);
