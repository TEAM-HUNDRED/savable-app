import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ShopCategoryCard from '../../../../components/card/ShopCategoryCard';
import {AppStyles} from '../../../../config';

import Api from '../../../../lib/api/Api';
import {GiftCardPropsType} from '../../../../types/view/shop';

function StoreTabScreen() {
  const [price, setPrice] = useState<number>(0);
  const [giftCardList, setGiftCardList] = useState<GiftCardPropsType[]>(
    [] as GiftCardPropsType[],
  );

  const getGiftCardList = async (price: number) => {
    const response = await Api.shared.getGiftCardList(price);

    setGiftCardList(response);
  };

  useEffect(() => {
    getGiftCardList(price);
  }, [price]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}></View>
      <View style={styles.paddingContainer}>
        <ShopCategoryCard setPrice={setPrice} price={price} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(152),
    backgroundColor: '#f6f6f6',
  },
  paddingContainer: {
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
});

export default React.memo(StoreTabScreen);
