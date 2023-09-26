import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import Icons from '../../../assets/icons';
import {AppStyles} from '../../../config';

import ChallengeInfoBar from '../../bar/ChallengeInfoBar';
import SVText from '../../common/SVText';

type PropsType = {
  savings: number;
  scheduledReward: number;
  verificationGoal: number;
  startDate: string;
  endDate: string;
};

function ParticipationChallengeInfoCard({
  savings,
  scheduledReward,
  verificationGoal,
  startDate,
  endDate,
}: PropsType): React.ReactElement {
  return (
    <View style={styles.container}>
      <ChallengeInfoBar
        title={'진행 기간'}
        value={`${startDate} - ${endDate}`}
      />
      <ChallengeInfoBar
        title={'목표 인증 횟수'}
        value={`${verificationGoal}회`}
      />
      <View style={styles.statusContainer}>
        <View style={styles.barContainer}>
          <SVText body08>{'지급 예정 포인트'}</SVText>
          <View>
            <View style={styles.valueContainer}>
              <Image source={Icons.point} style={styles.image} />
              <SVText right body06 style={styles.barValueText}>
                {`${scheduledReward} 포인트`}
              </SVText>
            </View>
            <SVText right caption01 style={styles.descriptionText}>
              {'챌린지 성공 시 종료'}
            </SVText>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.barContainer}>
          <SVText body08>{'총 절약 금액'}</SVText>
          <View>
            <View style={styles.valueContainer}>
              <SVText right body06 style={styles.barValueText}>
                {`${savings.toLocaleString()}원`}
              </SVText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: AppStyles.scaleWidth(20),
  },
  statusContainer: {
    display: 'flex',
    height: AppStyles.scaleWidth(96),
    borderWidth: AppStyles.scaleWidth(1),
    borderRadius: AppStyles.scaleWidth(8),
    borderColor: AppStyles.color.lightGray02,
  },
  barContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: AppStyles.scaleWidth(12),
  },
  divider: {
    height: AppStyles.scaleWidth(1),
    backgroundColor: AppStyles.color.lightGray02,
  },
  barValueText: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    marginRight: AppStyles.scaleWidth(3),
    marginBottom: AppStyles.scaleWidth(2),
  },
  descriptionText: {
    color: AppStyles.color.gray03,
  },
});

export default React.memo(ParticipationChallengeInfoCard);
