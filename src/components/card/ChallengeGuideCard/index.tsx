import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../config';

import SVText from '../../common/SVText';

type PropsType = {
  title: string;
  contentList: string[];
  isBullet: boolean;
};

function ChallengeGuideCard({
  title,
  contentList,
  isBullet,
}: PropsType): React.ReactElement {
  return (
    <View style={styles.container}>
      <SVText body04 style={styles.titleText}>
        {title}
      </SVText>
      <View>
        {isBullet
          ? contentList.map((item, idx) => {
              return (
                <View
                  key={`${item} - ${idx}`}
                  style={styles.descriptionContainer}>
                  <SVText body06 style={styles.descriptionText}>
                    {'\u2022'}
                  </SVText>
                  <SVText body06 style={styles.descriptionText}>
                    {item}
                  </SVText>
                </View>
              );
            })
          : contentList.map((item, idx) => {
              return (
                <View
                  key={`${item} - ${idx}`}
                  style={styles.descriptionContainer}>
                  <SVText body06 style={styles.descriptionText}>
                    {`${idx + 1}.`}
                  </SVText>
                  <SVText body06 style={styles.descriptionText}>
                    {item}
                  </SVText>
                </View>
              );
            })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: AppStyles.scaleWidth(6),
    paddingVertical: AppStyles.scaleWidth(20),
  },
  titleText: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    paddingBottom: AppStyles.scaleWidth(10),
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  descriptionText: {
    paddingLeft: AppStyles.scaleWidth(4),
    marginTop: AppStyles.scaleWidth(4),
  },
});

export default React.memo(ChallengeGuideCard);
