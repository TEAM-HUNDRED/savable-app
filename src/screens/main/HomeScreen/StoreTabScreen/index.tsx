import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import * as Sentry from '@sentry/react-native';

import {AppStyles} from '../../../../config';
import Api from '../../../../lib/api/Api';
import {GiftCardPropsType} from '../../../../types/view/shop';
import type {RootState} from '../../../../modules/redux/Store';

import GiftCard from '../../../../components/card/GiftCard';
import ShopCategoryCard from '../../../../components/card/ShopCategoryCard';
import Icons from '../../../../assets/icons';
import SVText from '../../../../components/common/SVText';

function StoreTabScreen() {
  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  const [price, setPrice] = useState<number>(0);
  const [giftCardList, setGiftCardList] = useState<GiftCardPropsType[]>(
    [] as GiftCardPropsType[],
  );

  const getGiftCardList = async (currentPrice: number) => {
    try {
      const response = await Api.shared.getGiftCardList(currentPrice);

      setGiftCardList(response);
    } catch (error) {
      console.log('[Error: Failed to get gift card list', error);
      Sentry.captureException(error);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in getGiftCardList Method',
      );
    }
  };

  useEffect(() => {
    getGiftCardList(price);
  }, [price]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <SVText body03 style={styles.text}>
          {`${userInfo.userName}님, 절약을 통해`}
        </SVText>
        <View style={styles.highlightContainer}>
          <Image source={Icons.point} style={styles.icon} />
          <SVText header01 style={styles.highlightText}>
            {`${userInfo.userTotalReward.toLocaleString()}포인트`}
          </SVText>
          <SVText body03 style={styles.text}>
            {' 모았어요!'}
          </SVText>
        </View>
      </View>
      <View style={styles.paddingContainer}>
        <ShopCategoryCard setPrice={setPrice} price={price} />
      </View>
      {giftCardList.length === 0 ? (
        <View style={styles.noneData}>
          <SVText body02 style={styles.noneDataText}>
            {'상품이 존재하지 않습니다.'}
          </SVText>
        </View>
      ) : (
        <ScrollView style={styles.paddingContainer}>
          {giftCardList.map((item, idx) => {
            return (
              <GiftCard
                {...item}
                key={`${item.productName}-${idx}`}
                totalReward={userInfo.userTotalReward}
              />
            );
          })}
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    height: AppStyles.scaleWidth(152),
    paddingHorizontal: AppStyles.scaleWidth(32),
    paddingTop: AppStyles.scaleWidth(14),
    backgroundColor: '#f6f6f6',
  },
  highlightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: AppStyles.scaleWidth(12),
  },
  text: {
    fontWeight: 'bold',
  },
  highlightText: {
    color: AppStyles.color.mint05,
    fontWeight: 'bold',
  },
  icon: {
    width: AppStyles.scaleWidth(18),
    height: AppStyles.scaleWidth(18),
    marginRight: AppStyles.scaleWidth(6),
  },
  noneData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noneDataText: {
    color: AppStyles.color.gray03,
    fontWeight: 'bold',
  },
  paddingContainer: {
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
});

export default React.memo(StoreTabScreen);
