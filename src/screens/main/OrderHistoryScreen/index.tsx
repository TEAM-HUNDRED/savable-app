import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AppStyles, MainScreenStackPropsList} from '../../../config';

import Api from '../../../lib/api/Api';
import {OrderHistoryPropsType} from '../../../types/view';

import SVText from '../../../components/common/SVText';

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
      <View style={styles.noticeContainer}>
        <SVText caption01 style={styles.titleText}>
          {'유의 사항'}
        </SVText>
        <View style={styles.noticeContentContainer}>
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
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonContainer}
        onPress={() => {}}>
        <SVText body06>{'문의하기'}</SVText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  contentContainer: {
    paddingVertical: AppStyles.scaleWidth(24),
    paddingHorizontal: AppStyles.scaleWidth(24),
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
  noticeContentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    borderColor: AppStyles.color.gray02,
    borderRadius: AppStyles.scaleWidth(8),
    borderWidth: AppStyles.scaleWidth(1),
    paddingVertical: AppStyles.scaleWidth(8),
    marginBottom: AppStyles.scaleWidth(38),
  },
});

export default React.memo(OrderHistoryScreen);
