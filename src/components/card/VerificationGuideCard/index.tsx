import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../config';
import {ChallengeGuideViewType} from '../../../types/view';

import SVText from '../../common/SVText';

type PropsType = {
  flatListData: ChallengeGuideViewType[];
  titleShown?: boolean;
  verificationDescription: string;
};

function VerificationGuideCard({
  flatListData,
  verificationDescription,
  titleShown = true,
}: PropsType) {
  const renderItem = (item: ChallengeGuideViewType) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        {item.isPass ? (
          <SVText body07 color={'#3893D6'} style={styles.imageText}>
            {'인증 승인'}
          </SVText>
        ) : (
          <SVText body07 color={'#E43E3E'} style={styles.imageText}>
            {'인증 반려'}
          </SVText>
        )}
        <SVText body07>{item.explanation}</SVText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {titleShown && (
        <SVText body04 style={styles.titleText}>
          {'인증 방법'}
        </SVText>
      )}
      <SVText body06 style={styles.descriptionText}>
        {verificationDescription}
      </SVText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={flatListData}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, idx) => `${item.isPass}-${idx}`}
        style={styles.flatList}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingVertical: AppStyles.scaleWidth(20),
  },
  titleText: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    paddingBottom: AppStyles.scaleWidth(14),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  descriptionText: {
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  flatList: {
    paddingHorizontal: AppStyles.scaleWidth(24),
    marginTop: AppStyles.scaleWidth(10),
  },
  footer: {
    width: AppStyles.scaleWidth(50),
  },
  itemContainer: {
    display: 'flex',

    alignItems: 'center',
    marginRight: AppStyles.scaleWidth(10),
    maxWidth: AppStyles.scaleWidth(160),
  },
  image: {
    width: AppStyles.scaleWidth(160),
    height: AppStyles.scaleWidth(160),
    borderRadius: AppStyles.scaleWidth(8),
    marginBottom: AppStyles.scaleWidth(4),
  },
  imageText: {
    fontWeight: 'bold',
    paddingVertical: AppStyles.scaleWidth(5),
  },
  imageDescription: {
    maxWidth: AppStyles.scaleWidth(150),
  },
});

export default React.memo(VerificationGuideCard);
