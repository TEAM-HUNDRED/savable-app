import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import GiftCard from '../../../components/card/GiftCard';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import CreateOrderContainer from '../../../container/CreateOrderContainer';
import {useToastProvider} from '../../../lib/context/ToastContext';
import SVButton from '../../../components/common/SVButton';
import Api from '../../../lib/api/Api';
import {RootState} from '../../../modules/redux/RootReducer';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.CREATE_ORDER_PAGE>;
};

type InputPropsType = {
  amount: number;
  negativePoint: string;
  positivePoint: string;
  challengeOpinion: string;
};

function CreateOrderPage({route}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();
  const {showToast} = useToastProvider();
  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  const [inputData, setInputData] = useState<InputPropsType>({
    amount: 1,
    negativePoint: '',
    positivePoint: '',
    challengeOpinion: '',
  });

  const validationInputData = useCallback(() => {
    if (!inputData.negativePoint || !inputData.positivePoint) {
      showToast({currentText: '필수 항목을 입력해주세요'});
      return false;
    } else return true;
  }, [inputData, showToast]);

  const handleInputData = useCallback((currentInputData: InputPropsType) => {
    setInputData(currentInputData);
  }, []);

  const navigateToPurchaseSuccessScreen = useCallback(() => {
    navigation.replace(ROUTER.ORDER_SUCCESS_SCREEN, {
      giftcardId: route.params.id,
      image: route.params.image,
      productName: route.params.productName,
      price: route.params.price,
      brandName: route.params.brandName,
      amount: inputData.amount,
    });
  }, [navigation, route.params, inputData]);

  const validateReward = useCallback(
    (amount: number) => {
      if (userInfo.userTotalReward < amount * route.params.price) {
        showToast({
          currentText: `포인트가 부족합니다\n현재 보유 포인트: ${userInfo.userTotalReward.toLocaleString()}포인트`,
        });
        return false;
      } else return true;
    },
    [userInfo, route, showToast],
  );

  const createOrder = useCallback(async () => {
    try {
      const response = await Api.shared.createOrder({
        giftcardId: route.params.id,
        quantity: inputData.amount,
        positivePoint: inputData.positivePoint,
        negativePoint: inputData.negativePoint,
        wishChallenge: inputData.challengeOpinion
          ? inputData.challengeOpinion
          : '',
      });

      navigateToPurchaseSuccessScreen();

      return response;
    } catch (error) {
      console.log('[Error: Failed to create order', error);
    }
  }, [route, inputData, navigateToPurchaseSuccessScreen]);

  const onPressPurchaseButton = useCallback(() => {
    if (!validationInputData()) return;
    else {
      createOrder();
    }
  }, [validationInputData, createOrder]);

  useEffect(() => {
    navigation.setOptions({title: '기프티콘 구매'});
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.paddingContainer}>
        <GiftCard
          id={route.params.id}
          image={route.params.image}
          productName={route.params.productName}
          price={route.params.price}
          brandName={route.params.brandName}
        />
        <CreateOrderContainer
          inputData={inputData}
          validateReward={validateReward}
          handleInputData={handleInputData}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SVButton
          borderRadius={AppStyles.scaleWidth(8)}
          onPress={onPressPurchaseButton}>
          {'구매하기'}
        </SVButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  contentContainer: {
    paddingVertical: AppStyles.scaleWidth(36),
  },
  paddingContainer: {
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  buttonContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(50),
    marginTop: AppStyles.scaleWidth(24),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
});

export default React.memo(CreateOrderPage);
