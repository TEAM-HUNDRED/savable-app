import React, {useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {
  AppStyles,
  HomeScreenStackPropsList,
  MainScreenStackPropsList,
  ROUTER,
} from '../../../config';
import {CheckIcon} from '../../../assets/icons';
import {RootState} from '../../../modules/redux/RootReducer';

import SVText from '../../../components/common/SVText';
import SVDivider from '../../../components/common/SVDivider';
import OrderHistoryCard from '../../../components/card/OrderHistoryCard';
import SVButton from '../../../components/common/SVButton';
import {useAmplitude} from '../../../lib/hook/useAmplitude';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.ORDER_SUCCESS_SCREEN>;
};

function OrderSuccessScreen({route}: PropsType) {
  const userInfo = useSelector((state: RootState) => state.userInfo.value);
  const {trackEvent} = useAmplitude();
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const homeNavigation =
    useNavigation<StackNavigationProp<HomeScreenStackPropsList>>();

  useEffect(() => {
    navigation.setOptions({title: '구매 완료'});
    trackEvent('ORDER_SUCCESS_SCREEN_VIEW');
  }, [navigation, trackEvent]);

  const navigateToStore = useCallback(() => {
    homeNavigation.navigate(ROUTER.STORE_SCREEN);
    trackEvent('CLICK_NAVIGATE_TO_STORE_SCREEN', {
      currentPage: ROUTER.ORDER_SUCCESS_SCREEN,
    });
  }, [homeNavigation, trackEvent]);

  const navigateToHistory = useCallback(() => {
    navigation.replace(ROUTER.ORDER_HISTORY_SCREEN);
    trackEvent('CLICK_NAVIGATE_TO_ORDER_HISTORY_SCREEN', {
      currentPage: ROUTER.ORDER_SUCCESS_SCREEN,
    });
  }, [navigation, trackEvent]);

  const phoneNumberText = `${userInfo.userPhoneNumber.slice(
    0,
    3,
  )}-${userInfo.userPhoneNumber.slice(3, 7)}-${userInfo.userPhoneNumber.slice(
    7,
  )}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <CheckIcon style={styles.image} />
        <SVText body04>{'구매가 완료되었습니다'}</SVText>
      </View>
      <SVDivider />
      <View style={styles.paddingContainer}>
        <OrderHistoryCard
          id={route.params.giftcardId}
          image={route.params.image}
          productName={route.params.productName}
          price={route.params.price}
          brandName={route.params.brandName}
          amount={route.params.amount}
          phoneNumber={phoneNumberText}
          remainReward={userInfo.userTotalReward}
        />
        <View style={styles.noticeContainer}>
          <SVText caption01 style={styles.titleText}>
            {'유의 사항'}
          </SVText>
          <View style={styles.contentContainer}>
            <SVText caption01>{'기프티콘 신청 후 전송까지 '}</SVText>
            <SVText caption01 style={styles.highlightText}>
              {'최대 2주'}
            </SVText>
            <SVText caption01>{'가 소요됩니다.'}</SVText>
            <SVText caption01>
              {"자세한 사항은 '마이페이지'에서 '구매 내역'을 확인해주세요."}
            </SVText>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <SVButton
              borderRadius={AppStyles.scaleWidth(8)}
              onPress={navigateToStore}>
              {'확인'}
            </SVButton>
          </View>
          <View style={styles.buttonDivider} />
          <View style={styles.buttonStyle}>
            <SVButton
              borderRadius={AppStyles.scaleWidth(8)}
              color={AppStyles.color.mint01}
              textColor={AppStyles.color.mint05}
              onPress={navigateToHistory}>
              {'구매 내역'}
            </SVButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  paddingContainer: {
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: AppStyles.scaleWidth(40),
  },
  image: {
    width: AppStyles.scaleWidth(130),
    height: AppStyles.scaleWidth(130),
    marginBottom: AppStyles.scaleWidth(20),
  },
  noticeContainer: {
    width: '100%',
    paddingHorizontal: AppStyles.scaleWidth(16),
    paddingVertical: AppStyles.scaleWidth(14),
    borderRadius: AppStyles.scaleWidth(8),
    marginBottom: AppStyles.scaleWidth(16),
    backgroundColor: '#f6f6f6',
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: AppStyles.scaleWidth(6),
  },
  highlightText: {
    fontWeight: 'bold',
    color: AppStyles.color.mint05,
  },
  contentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: AppStyles.scaleWidth(50),
    marginBottom: AppStyles.scaleWidth(30),
  },
  buttonStyle: {
    flex: 1,
  },
  buttonDivider: {
    width: AppStyles.scaleWidth(20),
  },
});

export default React.memo(OrderSuccessScreen);
