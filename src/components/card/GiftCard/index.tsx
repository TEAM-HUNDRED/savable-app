import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icons from '../../../assets/icons';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import {GiftCardPropsType} from '../../../types/view/shop';

import SVText from '../../common/SVText';
import {StackNavigationProp} from '@react-navigation/stack';

type PropsType = GiftCardPropsType;

function GiftCard({
  giftcardId,
  image,
  productName,
  price,
  brandName,
}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const navigateToOrder = () => {
    navigation.navigate(ROUTER.CREATE_ORDER_PAGE, {
      giftcardId: giftcardId,
      image: image,
      productName: productName,
      price: price,
      brandName: brandName,
    });
  };

  const onPressCard = () => {
    navigateToOrder();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressCard}
      style={styles.container}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.contentContainer}>
        <SVText body03 style={styles.brandText}>
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
