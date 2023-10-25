import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import * as Sentry from '@sentry/react-native';

import GiftCard from '../../../components/card/GiftCard';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import CreateOrderContainer from '../../../container/CreateOrderContainer';
import {useToastProvider} from '../../../lib/context/ToastContext';
import SVButton from '../../../components/common/SVButton';
import Api from '../../../lib/api/Api';
import {RootState} from '../../../modules/redux/RootReducer';
import {handleUserInfo} from '../../../modules/redux/slice/userInfoSlice';
import SVText from '../../../components/common/SVText';
import Icons from '../../../assets/icons';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.CREATE_ORDER_PAGE>;
};

type InputPropsType = {
  amount: number;
  negativePoint: string;
  positivePoint: string;
  challengeOpinion: string;
};

function CreateOrderScreen({route}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();
  const {showToast} = useToastProvider();
  const dispatch = useDispatch();
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

  const getUserInfo = useCallback(async () => {
    try {
      const response = await Api.shared.getUserInfo();

      dispatch(
        handleUserInfo({
          value: {
            userName: response.username,
            userPhoneNumber: response.phoneNumber,
            userProfileImageUrl: response.profileImage,
            userTotalReward: response.totalReward,
          },
        }),
      );
    } catch (error) {
      console.log(
        '[Error: Failed to get user Info in create order screen',
        error,
      );
      Sentry.captureException(error);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in getUserInfo Method on Create Order Screen',
      );
      await Api.shared.setSessionKeyOnStorage('');
    }
  }, [dispatch]);

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
      await getUserInfo();

      navigateToPurchaseSuccessScreen();
      return response;
    } catch (error) {
      console.log('[Error: Failed to create order', error);
      Sentry.captureException(error);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in createOrder Method',
      );
    }
  }, [route, inputData, navigateToPurchaseSuccessScreen, getUserInfo]);

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
        <View style={styles.divider} />
        <View style={styles.remainContainer}>
          <SVText body04>{'구매 시 남은 포인트'}</SVText>
          <View style={styles.rewardContainer}>
            <Image source={Icons.point} style={styles.icon} />
            <SVText header01>
              {(
                userInfo.userTotalReward -
                inputData.amount * route.params.price
              ).toLocaleString()}
            </SVText>
          </View>
        </View>
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
  divider: {
    width: '100%',
    height: AppStyles.scaleWidth(1),
    backgroundColor: AppStyles.color.gray02,
  },
  remainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: AppStyles.scaleWidth(12),
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: AppStyles.scaleWidth(14),
    width: AppStyles.scaleWidth(14),
    marginRight: AppStyles.scaleWidth(5),
  },
});

export default React.memo(CreateOrderScreen);
