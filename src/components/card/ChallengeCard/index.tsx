import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AppStyles} from '../../../config';
import SVText from '../../common/SVText';

type PropsType = {
  imageURI: string;
  title: string;
  category: string;
};

function ChallengeCard({
  imageURI,
  title,
  category,
}: PropsType): React.ReactElement {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageURI}} style={styles.image} />
      <SVText body06>{title}</SVText>

      <View>
        <View style={styles.categoryContainer}>
          <SVText body06 style={styles.category}>
            {category}
          </SVText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: AppStyles.scaleWidth(160),
  },
  image: {
    width: '100%',
    height: AppStyles.scaleWidth(104),
    borderRadius: AppStyles.scaleWidth(10),
    marginBottom: AppStyles.scaleWidth(4),
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: AppStyles.color.lightGray02,
    borderRadius: AppStyles.scaleWidth(4),
    marginTop: AppStyles.scaleWidth(4),
  },
  category: {
    backgroundColor: AppStyles.color.lightGray02,
    borderRadius: AppStyles.scaleWidth(4),
    paddingHorizontal: AppStyles.scaleWidth(6),
    marginRight: AppStyles.scaleWidth(6),
    alignSelf: 'center',
  },
});

export default React.memo(ChallengeCard);
