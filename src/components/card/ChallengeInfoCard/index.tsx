import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icons from '../../../assets/icons';

import {AppStyles} from '../../../config';
import ChallengeInfoBar from '../../bar/ChallengeInfoBar';

import SVText from '../../common/SVText';

type PropsType = {
  title: string;
  explanation: string;
  reward: number;
  hasDeadline: boolean;
  startDate: string;
  endDate: string;
};

function ChallengeInfoCard({
  title,
  reward,
  hasDeadline,
  startDate,
  endDate,
}: PropsType): React.ReactElement {
  return (
    <View style={styles.container}>
      <SVText body06 style={styles.titleText}>
        {title}
      </SVText>
      <View style={styles.infoContainer}>
        <ChallengeInfoBar
          title={'1회 인증 시'}
          value={`${reward}포인트 지급`}
          valueIcon={Icons.point}
          description={'챌린지 실패 시 미지급'}
        />
        <ChallengeInfoBar
          title={'진행 기간'}
          value={`${hasDeadline ? `${startDate} ~ ${endDate}` : '사용자 지정'}`}
          description={'챌린지 성공 시 종료'}
        />
        <ChallengeInfoBar
          title={'모집 기간'}
          value={`${hasDeadline ? `${startDate} ~ ${endDate}` : '상시 모집'}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: AppStyles.scaleWidth(20),
  },
  infoContainer: {
    marginTop: AppStyles.scaleWidth(20),
  },
  titleText: {
    marginVertical: AppStyles.scaleWidth(4),
  },
});

export default React.memo(ChallengeInfoCard);
