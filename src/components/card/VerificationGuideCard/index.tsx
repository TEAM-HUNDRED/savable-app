import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../config';
import {ChallengeGuideViewType} from '../../../types/view';

import SVText from '../../common/SVText';

type PropsType = {
  flatListData: ChallengeGuideViewType[];
};

function VerificationGuideCard({flatListData}: PropsType) {
  const FlatListItem = ({
    isPass,
    explanation,
    image,
  }: ChallengeGuideViewType) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: image}} style={styles.image} />
      {isPass ? (
        <SVText caption02 color={'#3893D6'} style={styles.imageText}>
          {'인증 승인'}
        </SVText>
      ) : (
        <SVText caption02 color={'#E43E3E'} style={styles.imageText}>
          {'인증 거부'}
        </SVText>
      )}
      <SVText caption02>{explanation}</SVText>
    </View>
  );

  return (
    <View style={styles.container}>
      <SVText body04 style={styles.titleText}>
        {'인증 방법'}
      </SVText>
      <SVText body06 style={styles.descriptionText}>
        {
          '챌린지 신청이후 다음과 같은 인증 조건을 달성해야만 인증 수락이 이루어집니다. 해당 부분 참고 하여 챌린지 인증을 해주시면 됩니다.'
        }
      </SVText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={flatListData}
        renderItem={({item}) => <FlatListItem {...item} />}
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
    paddingBottom: AppStyles.scaleWidth(10),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  descriptionText: {
    marginTop: AppStyles.scaleWidth(4),
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: AppStyles.scaleWidth(10),
  },
  image: {
    width: AppStyles.scaleWidth(160),
    height: AppStyles.scaleWidth(160),
    borderRadius: AppStyles.scaleWidth(8),
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
