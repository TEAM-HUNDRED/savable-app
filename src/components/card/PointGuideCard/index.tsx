import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppStyles} from '../../../config';
import VerticalGraphBar from '../../bar/VerticalGraphBar';
import SVText from '../../common/SVText';

function PointGuideCard() {
  const percentList = [0, 25, 50, 75, 100];
  return (
    <View style={styles.container}>
      <SVText body04 style={styles.titleText}>
        {'포인트 지급 안내'}
      </SVText>
      <View style={styles.contentContainer}>
        <SVText body06 style={styles.contentText}>
          {'100% 성공'}
        </SVText>
        <SVText body06 style={styles.contentText}>
          {'포인트 전액 지급'}
        </SVText>
      </View>
      <View style={styles.contentContainer}>
        <SVText body06 style={styles.contentText}>
          {'100% 미만 성공'}
        </SVText>
        <SVText body06 style={styles.contentText}>
          {'포인트 일부 지급 (목표 달성률 만큼)'}
        </SVText>
      </View>
      <View style={styles.graphContainer}>
        {percentList.map((item, idx) => {
          return <VerticalGraphBar percent={item} key={`${item}-${idx}`} />;
        })}
      </View>
      <View style={styles.graphInfoContainer}>
        <View style={styles.graphInfoContainer}>
          <View
            style={[
              styles.graphColorBox,
              {backgroundColor: AppStyles.color.lightGray02},
            ]}
          />
          <SVText caption02 style={styles.graphInfoText}>
            {'지급 예정 포인트'}
          </SVText>
        </View>
        <View style={styles.graphInfoContainer}>
          <View
            style={[
              styles.graphColorBox,
              {backgroundColor: AppStyles.color.point01},
            ]}
          />
          <SVText caption02 style={styles.graphInfoText}>
            {'목표 달성률에 따른 지급 포인트'}
          </SVText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: AppStyles.scaleWidth(25),
  },
  titleText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: AppStyles.scaleWidth(4),
  },
  contentText: {
    marginTop: AppStyles.scaleWidth(8),
    minWidth: AppStyles.scaleWidth(110),
  },
  graphContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: AppStyles.scaleWidth(36),
    marginTop: AppStyles.scaleWidth(25),
    marginBottom: AppStyles.scaleWidth(8),
  },
  graphInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphColorBox: {
    width: AppStyles.scaleWidth(13),
    height: AppStyles.scaleWidth(13),
    borderRadius: AppStyles.scaleWidth(4),
    marginRight: AppStyles.scaleWidth(4),
  },
  graphInfoText: {
    marginRight: AppStyles.scaleWidth(10),
    marginBottom: AppStyles.scaleWidth(2),
  },
});

export default React.memo(PointGuideCard);
