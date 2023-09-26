import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';
import {CheckIcon} from '../../../assets/icons';

import SVText from '../../../components/common/SVText';
import SVDivider from '../../../components/common/SVDivider';
import OrderHistoryCard from '../../../components/card/OrderHistoryCard';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.ORDER_SUCCESS_SCREEN>;
};

function OrderSuccessScreen({route}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  useEffect(() => {
    navigation.setOptions({title: '구매 완료'});
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <CheckIcon style={styles.image} />
        <SVText body04>{'구매가 완료되었습니다'}</SVText>
      </View>
      <SVDivider />
      <View style={styles.paddingContainer}>
        <OrderHistoryCard
          giftcardId={route.params.giftcardId}
          image={route.params.image}
          productName={route.params.productName}
          price={route.params.price}
          brandName={route.params.brandName}
          amount={route.params.amount}
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
});

export default React.memo(OrderSuccessScreen);
