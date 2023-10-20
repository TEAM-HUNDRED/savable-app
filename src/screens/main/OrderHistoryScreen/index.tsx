import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AppStyles, MainScreenStackPropsList} from '../../../config';
import Icons from '../../../assets/icons';

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

  console.log(orderList);

  const getOrderHistoryList = async () => {
    try {
      const response = await Api.shared.getOrderHistoryList();

      setOrderList(response);
    } catch (error) {
      console.log('[Error: Failed to get order history list', error);
    }
  };

  const linkToKakaoChat = () => {
    Linking.openURL('http://pf.kakao.com/_xcVxmCG/chat');
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
        onPress={linkToKakaoChat}>
        <SVText body06>{'문의하기'}</SVText>
      </TouchableOpacity>
      {orderList.map((item, idx) => {
        const year = new Date(item.date).getFullYear();
        const month = new Date(item.date).getMonth();
        const day = new Date(item.date).getDate();

        const date = `${year}.${month}.${day}`;

        return (
          <View
            style={styles.orderCardContainer}
            key={`${item.productName}-${idx}`}>
            <Image style={styles.image} source={{uri: item.image}} />
            <View style={styles.orderContentContainer}>
              <View style={styles.cardHeaderBar}>
                <SVText body07>{date}</SVText>
                <SVText
                  body07
                  style={
                    item.sendState === '발송 완료'
                      ? styles.highlightStatusText
                      : styles.statusText
                  }>
                  {item.sendState}
                </SVText>
              </View>
              <SVText body05 style={styles.brandText}>
                {item.brandName}
              </SVText>
              <SVText body05 style={styles.orderTitleText}>
                {item.productName}
              </SVText>
              <View style={styles.priceContainer}>
                <Image source={Icons.point} style={styles.icon} />
                <SVText body05 style={styles.priceText}>
                  {`${item.productPrice}포인트`}
                </SVText>
                <View style={styles.verticalDivider} />
                <SVText body05 style={styles.priceText}>
                  {`${item.quantity}개`}
                </SVText>
              </View>
            </View>
          </View>
        );
      })}
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
  orderCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: AppStyles.scaleWidth(36),
    marginHorizontal: AppStyles.scaleWidth(12),
  },
  image: {
    width: AppStyles.scaleWidth(80),
    height: AppStyles.scaleWidth(80),
    borderRadius: AppStyles.scaleWidth(8),
    borderWidth: AppStyles.scaleWidth(1),
    marginRight: AppStyles.scaleWidth(16),
    borderColor: AppStyles.color.lightGray02,
  },
  cardHeaderBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusText: {
    fontWeight: 'bold',
    color: AppStyles.color.gray04,
  },
  highlightStatusText: {
    fontWeight: 'bold',
    color: AppStyles.color.mint05,
  },
  orderContentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  brandText: {
    fontWeight: 'bold',
    color: AppStyles.color.gray03,
  },
  orderTitleText: {
    fontWeight: 'bold',
    marginVertical: AppStyles.scaleWidth(2),
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
  verticalDivider: {
    height: AppStyles.scaleWidth(12),
    width: AppStyles.scaleWidth(1),
    marginTop: AppStyles.scaleWidth(1),
    marginHorizontal: AppStyles.scaleWidth(10),
    backgroundColor: AppStyles.color.gray04,
  },
});

export default React.memo(OrderHistoryScreen);
