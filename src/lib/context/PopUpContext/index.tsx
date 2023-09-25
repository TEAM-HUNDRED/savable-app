import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';

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
  }: ShowPopUpParamsType) => void;
};

type ShowPopUpParamsType = {
  title: string;
  subButtonText: string;
  buttonText: string;
  onPressButton: () => void;
  cardChildren: React.JSX.Element[] | React.JSX.Element;
};

export const PopUpContext = React.createContext<PopUpContextType>({
  showPopUp: ({
    title,
    subButtonText,
    buttonText,
    onPressButton,
    cardChildren,
  }: ShowPopUpParamsType) => {},
});

export const usePopUpProvider = () => useContext(PopUpContext);

const PopUpProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [title, setTitle] = useState('');
  const [subButtonText, setSubButtonText] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [onPressButton, setOnPressButton] = useState(() => {});
  const [cardChildren, setCardChildren] = useState<
    React.JSX.Element[] | React.JSX.Element
  >(<></>);
  const [isVisible, setIsVisible] = useState(false);

  const handleOnPress = () => {
    setIsVisible(false);
    onPressButton;
  };

  const showPopUp = ({
    title,
    subButtonText,
    buttonText,
    onPressButton,
    cardChildren,
  }: ShowPopUpParamsType) => {
    setTitle(title);
    setSubButtonText(subButtonText);
    setButtonText(buttonText);
    setOnPressButton(onPressButton);
    setCardChildren(cardChildren);
    setIsVisible(true);
  };

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
