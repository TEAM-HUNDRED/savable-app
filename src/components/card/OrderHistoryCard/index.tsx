import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {GiftCardPropsType} from '../../../types/view/shop';
import SVText from '../../common/SVText';
import GiftCard from '../GiftCard';
import Icons from '../../../assets/icons';
import {AppStyles} from '../../../config';

type PropsType = GiftCardPropsType & {
  amount: number;
};

function OrderHistoryCard({
  giftcardId,
  image,
  productName,
  price,
  brandName,
  amount,
}: PropsType) {
  const phoneNumber = '010-0000-0000';
  return (
    <View style={styles.container}>
      <SVText header01>{'구매 내역'}</SVText>
      <View style={styles.divider} />
      <View style={styles.cardContainer}>
        <GiftCard
          giftcardId={giftcardId}
          image={image}
          productName={productName}
          price={price}
          brandName={brandName}
        />
        <View style={styles.barContainer}>
          <SVText body04>{'사용 포인트'}</SVText>
          <View style={styles.valueContainer}>
            <Image source={Icons.point} style={styles.icon} />
            <SVText body04>{`${(price * amount).toLocaleString()}원`}</SVText>
          </View>
        </View>
        <View style={styles.barContainer}>
          <SVText body04>{'핸드폰 번호'}</SVText>
          <SVText body04>{phoneNumber}</SVText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: AppStyles.scaleWidth(40),
  },
  divider: {
    width: '100%',
    height: AppStyles.scaleWidth(1),
    marginTop: AppStyles.scaleWidth(16),
    backgroundColor: AppStyles.color.lightGray02,
  },
  cardContainer: {
    paddingVertical: AppStyles.scaleWidth(16),
    paddingHorizontal: AppStyles.scaleWidth(16),
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppStyles.scaleWidth(30),
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: AppStyles.scaleWidth(14),
    width: AppStyles.scaleWidth(14),
    marginRight: AppStyles.scaleWidth(5),
  },
});

export default React.memo(OrderHistoryCard);
