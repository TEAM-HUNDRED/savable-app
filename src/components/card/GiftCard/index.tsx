import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {track} from '@amplitude/analytics-react-native';

import Icons from '../../../assets/icons';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import {useToastProvider} from '../../../lib/context/ToastContext';
import {GiftCardPropsType} from '../../../types/view/shop';

import SVText from '../../common/SVText';
import {useSelector} from 'react-redux';
import {RootState} from '../../../modules/redux/Store';

type PropsType = GiftCardPropsType & {
  totalReward?: number;
  disabled?: boolean;
};

function GiftCard({
  id,
  image,
  productName,
  price,
  brandName,
  totalReward,
  disabled = false,
}: PropsType) {
  const {showToast} = useToastProvider();
  const userInfo = useSelector((state: RootState) => state.userInfo.value);
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const navigateToOrder = () => {
    track('CLICK_GIFT_CARD_CAN_PURCHASE', {
      userName: userInfo.userName,
      phoneNumber: userInfo.userPhoneNumber,
    });
    navigation.navigate(ROUTER.CREATE_ORDER_PAGE, {
      id: id,
      image: image,
      productName: productName,
      price: price,
      brandName: brandName,
    });
  };

  const canPurchase = totalReward ? totalReward >= price : false;

  const disableButton = () => {
    track('CLICK_GIFT_CARD_CANT_PURCHASE', {
      userName: userInfo.userName,
      phoneNumber: userInfo.userPhoneNumber,
    });
    showToast({currentText: '리워드가 부족합니다'});
  };
  const onPressCard = disabled
    ? () => {}
    : canPurchase
    ? navigateToOrder
    : disableButton;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressCard}
      style={styles.container}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.contentContainer}>
        <SVText body04 style={styles.brandText}>
          {brandName}
        </SVText>
        <SVText body03 style={styles.titleText}>
          {productName}
        </SVText>
        <View style={styles.priceContainer}>
          <Image source={Icons.point} style={styles.icon} />
          <SVText
            body03
            style={
              styles.priceText
            }>{`${price.toLocaleString()}포인트`}</SVText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: AppStyles.scaleWidth(26),
  },
  image: {
    width: AppStyles.scaleWidth(76),
    height: AppStyles.scaleWidth(76),
    borderRadius: AppStyles.scaleWidth(8),
    borderWidth: AppStyles.scaleWidth(1),
    marginRight: AppStyles.scaleWidth(16),
    borderColor: AppStyles.color.lightGray02,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandText: {
    fontWeight: 'bold',
    color: AppStyles.color.gray03,
  },
  titleText: {
    fontWeight: 'bold',
    marginVertical: AppStyles.scaleWidth(4),
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: AppStyles.scaleWidth(18),
    height: AppStyles.scaleWidth(18),
    marginRight: AppStyles.scaleWidth(5),
  },
  priceText: {
    marginTop: AppStyles.scaleWidth(2),
    textAlignVertical: 'bottom',
  },
});

export default React.memo(GiftCard);
