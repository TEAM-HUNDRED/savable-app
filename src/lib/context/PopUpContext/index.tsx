import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';

import PopUpCard from '../../../components/card/PopUpCard';
import {AppStyles} from '../../../config';

// We define our type for the context properties right here
type PopUpContextType = {
  showPopUp: ({
    title,
    subButtonText,
    buttonText,
    onPressButton,
    cardChildren,
    onPressLeftButton,
    leftButtonText,
  }: ShowPopUpParamsType) => void;
};

type ShowPopUpParamsType = {
  title: string;
  subButtonText: string;
  buttonText: string;
  onPressButton: () => void;
  cardChildren: React.JSX.Element[] | React.JSX.Element;
  onPressLeftButton?: () => void;
  leftButtonText?: string;
};

export const PopUpContext = React.createContext<PopUpContextType>({
  showPopUp: ({
    title,
    subButtonText,
    buttonText,
    onPressButton,
    cardChildren,
    onPressLeftButton,
    leftButtonText,
  }: ShowPopUpParamsType) => {},
});

export const usePopUpProvider = () => useContext(PopUpContext);

const PopUpProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [title, setTitle] = useState('');
  const [subButtonText, setSubButtonText] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [leftButtonText, setLeftButtonText] = useState('');

  const [onPressLeftButton, setOnPressLeftButton] = useState<() => void>(
    () => {},
  );
  const [onPressButton, setOnPressButton] = useState<() => void>(() => {});
  const [cardChildren, setCardChildren] = useState<
    React.JSX.Element[] | React.JSX.Element
  >(<></>);
  const [isVisible, setIsVisible] = useState(false);

  const handleClosePopUp = useCallback(() => {
    setTitle('');
    setSubButtonText('');
    setButtonText('');
    setOnPressButton(() => {});
    setCardChildren(<></>);
    setIsVisible(false);

    setOnPressLeftButton(() => {});
    setLeftButtonText('');
  }, []);

  const onBackPress = useCallback(() => {
    return isVisible;
  }, [isVisible]);

  const handleOnPress = () => {
    onPressButton();
    handleClosePopUp();
  };

  const handleOnPressLeftButton = () => {
    onPressLeftButton();
    handleClosePopUp();
  };

  const showPopUp = ({
    title,
    subButtonText,
    buttonText,
    onPressButton,
    cardChildren,
    onPressLeftButton,
    leftButtonText,
  }: ShowPopUpParamsType) => {
    setTitle(title);
    setSubButtonText(subButtonText);
    setButtonText(buttonText);
    setOnPressButton(() => onPressButton);
    setCardChildren(cardChildren);
    setIsVisible(true);

    onPressLeftButton && setOnPressLeftButton(() => onPressLeftButton);
    leftButtonText && setLeftButtonText(leftButtonText);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [onBackPress]);

  return (
    <PopUpContext.Provider value={{showPopUp}}>
      {children}
      {isVisible && (
        <View style={styles.container}>
          <PopUpCard
            title={title}
            onPressButton={handleOnPress}
            buttonText={buttonText}
            subButtonText={subButtonText}
            children={cardChildren}
            onPressLeftButton={handleOnPressLeftButton}
            leftButtonText={leftButtonText}
          />
        </View>
      )}
    </PopUpContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: AppStyles.scaleWidth(20),
  },
  titleText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(40),
    marginTop: AppStyles.scaleWidth(10),
  },
});

export default PopUpProvider;
