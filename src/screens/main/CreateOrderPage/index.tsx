import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import GiftCard from '../../../components/card/GiftCard';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.CREATE_ORDER_PAGE>;
};

function CreateOrderPage({route}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  useEffect(() => {
    navigation.setOptions({title: '기프티콘 구매'});
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.paddingContainer}>
        <GiftCard
          giftcardId={route.params.giftcardId}
          image={route.params.image}
          productName={route.params.productName}
          price={route.params.price}
          brandName={route.params.brandName}
        />
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
});

export default React.memo(CreateOrderPage);
