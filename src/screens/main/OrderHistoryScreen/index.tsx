import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AppStyles, MainScreenStackPropsList} from '../../../config';

import Api from '../../../lib/api/Api';
import {OrderHistoryPropsType} from '../../../types/view';

import SVDivider from '../../../components/common/SVDivider';

type PropsType = {};

function OrderHistoryScreen({}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const [orderList, setOrderList] = useState<OrderHistoryPropsType[]>(
    [] as OrderHistoryPropsType[],
  );

  const getOrderHistoryList = async () => {
    try {
      const response = await Api.shared.getOrderHistoryList();

      setOrderList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderHistoryList();
  }, []);

  useEffect(() => {
    navigation.setOptions({title: '구매 내역'});
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.paddingContainer}></View>
      <SVDivider />
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

export default React.memo(OrderHistoryScreen);
