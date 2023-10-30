import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
  explanation,
}: PropsType): React.ReactElement {
  console.log(explanation);
  return (
    <View style={styles.container}>
      <SVText body06 style={styles.titleText}>
        {title}
      </SVText>
      <SVText color={AppStyles.color.deepGray}>{explanation}</SVText>
      <View style={styles.infoContainer}>
        <ChallengeInfoBar
          title={'1회 인증 시'}
          value={`${reward}포인트 지급`}
          valueIcon={Icons.point}
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
  explanationContainer: {
    flexDirection: 'column',
    borderRadius: AppStyles.scaleWidth(8),
    padding: AppStyles.scaleWidth(8),
    paddingHorizontal: AppStyles.scaleWidth(12),
    marginTop: AppStyles.scaleWidth(12),
    width: '100%',
    backgroundColor: AppStyles.color.lightGray02,
  },
  textContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    borderRadius: AppStyles.scaleWidth(8),
    borderWidth: AppStyles.scaleWidth(1),
    borderColor: AppStyles.color.gray03,
    paddingBottom: AppStyles.scaleWidth(4),
    marginTop: AppStyles.scaleWidth(12),
  },
});

export default React.memo(ChallengeInfoCard);
