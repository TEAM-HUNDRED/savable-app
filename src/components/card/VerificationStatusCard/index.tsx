import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {AppStyles} from '../../../config';

import {ChallengeVerificationInfoPropsType} from '../../../types/view';
import SVText from '../../common/SVText';

type PropsType = ChallengeVerificationInfoPropsType & {};

type VerificationItemPropsType = {
  id: number;
  image: string;
  state: string;
  dateTime: string;
};

function VerificationStatusCard({
  successCount,
  failCount,
  remainingCount,
  verificationList,
}: PropsType) {
  const verificationInfo = [
    {index: '인증 성공', value: `${successCount}회`},
    {index: '인증 실패', value: `${failCount}회`},
    {index: '남은 인증', value: `${remainingCount}회`},
  ];

  const renderItem = (item: VerificationItemPropsType, idx: number) => {
    const month = new Date(item.dateTime).getMonth();
    const day = new Date(item.dateTime).getDate();

    const date = `${month}/${day}`;
    const stateComponent = (state: string) => {
      switch (state) {
        case 'SUCCESS':
          return (
            <SVText
              body08
              style={[styles.stateText, {color: AppStyles.color.point03}]}>
              {'성공'}
            </SVText>
          );
        case 'FAIL':
          return (
            <SVText
              body08
              style={[styles.stateText, {color: AppStyles.color.point02}]}>
              {'실패'}
            </SVText>
          );
        case 'WAITING':
          return (
            <SVText
              body08
              style={[styles.stateText, {color: AppStyles.color.deepGray}]}>
              {'대기'}
            </SVText>
          );

        default:
          break;
      }
    };

    return (
      <View style={styles.verificationCard}>
        <View style={styles.indexBar}>
          <SVText caption01 center style={styles.indexText}>
            {idx + 1}
          </SVText>
        </View>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.verificationValueText}>
          <SVText body08>{date}</SVText>
          {stateComponent(item.state)}
        </View>
      </View>
    );
  };

  const flatListData = !verificationList
    ? []
    : verificationList.sort((item, nextItem) => {
        if (item.dateTime > nextItem.dateTime) return 1;
        else if (item.dateTime < nextItem.dateTime) return -1;
        else return 0;
      });

  return (
    <View style={styles.container}>
      <View style={styles.paddingContainer}>
        <SVText body04 style={styles.titleText}>
          {'인증 현황'}
        </SVText>
        <View style={styles.infoContainer}>
          {verificationInfo.map((item, idx) => {
            return (
              <View key={`${item}-${idx}`}>
                <SVText center body06>
                  {item.index}
                </SVText>
                <SVText body01 center style={styles.infoValueText}>
                  {item.value}
                </SVText>
              </View>
            );
          })}
        </View>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={flatListData}
        renderItem={({item, index}) => renderItem(item, index)}
        ListHeaderComponent={<View style={styles.flatListPadding} />}
        ListFooterComponent={<View style={styles.flatListPadding} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: AppStyles.scaleWidth(22),
  },
  titleText: {
    fontWeight: 'bold',
  },
  paddingContainer: {
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: AppStyles.scaleWidth(16),
    marginHorizontal: AppStyles.scaleWidth(24),
  },
  infoValueText: {
    marginTop: AppStyles.scaleWidth(4),
    fontWeight: 'bold',
  },
  verificationCard: {
    width: AppStyles.scaleWidth(58),
    marginRight: AppStyles.scaleWidth(14),
  },
  indexBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: AppStyles.scaleWidth(15),
    borderRadius: AppStyles.scaleWidth(6),
    backgroundColor: AppStyles.color.gray,
  },
  indexText: {
    color: AppStyles.color.white,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginBottom: AppStyles.scaleWidth(1),
    lineHeight: AppStyles.scaleWidth(11),
  },
  image: {
    height: AppStyles.scaleWidth(58),
    width: AppStyles.scaleWidth(58),
    borderRadius: AppStyles.scaleWidth(10),
    marginVertical: AppStyles.scaleWidth(2),
  },
  verificationValueText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  stateText: {
    marginTop: AppStyles.scaleWidth(2),
    fontWeight: 'bold',
  },
  flatListPadding: {
    width: AppStyles.scaleWidth(24),
    height: AppStyles.scaleWidth(24),
  },
});

export default React.memo(VerificationStatusCard);
