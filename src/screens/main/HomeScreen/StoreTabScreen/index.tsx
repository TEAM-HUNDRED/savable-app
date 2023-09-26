import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Api from '../../../../lib/api/Api';
import {GiftCardPropsType} from '../../../../types/view/shop';

function StoreTabScreen() {
  const [price, setPrice] = useState(0);
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
      <View></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(StoreTabScreen);
