import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ParticipationChallengeCard from '../../components/card/ParticipationChallengeCard';

import SVText from '../../components/common/SVText';
import {AppStyles} from '../../config';
import {ParticipationViewPropsType} from '../../types/view';

type PropsType = {
  participationList: Array<ParticipationViewPropsType>;
};

function ParticipationChallengeContainer({
  participationList,
}: PropsType): React.ReactElement {
  const [toggleIndex, setToggleIndex] = useState<number>(0);
  const beforeVerifiedList = participationList.filter(
    item => item.isVerifiedToday === false,
  );
  const afterVerifiedList = participationList.filter(
    item => item.isVerifiedToday === true,
  );

  const toggleList = useMemo(() => {
    return [
      `인증 전(${beforeVerifiedList.length})`,
      `인증 완료(${afterVerifiedList.length})`,
    ];
  }, [beforeVerifiedList, afterVerifiedList]);

  const currentParticipationList = useMemo(() => {
    return toggleIndex ? afterVerifiedList : beforeVerifiedList;
  }, [toggleIndex, afterVerifiedList, beforeVerifiedList]);

  const handleToggleIndex = useCallback((currentIndex: number) => {
    setToggleIndex(currentIndex);
  }, []);

  return (
    <View style={styles.container}>
      <SVText header01>참여 중인 챌린지</SVText>
      <View style={styles.toggleContainer}>
        {toggleList.map((item, idx) => {
          const isHighlight = idx === toggleIndex;
          return (
            <TouchableOpacity
              key={`${item}-${idx}`}
              activeOpacity={0.8}
              onPress={() => {
                handleToggleIndex(idx);
              }}
              style={
                isHighlight ? styles.highlightToggleBar : styles.toggleBar
              }>
              <SVText
                center
                body07
                style={isHighlight ? styles.highlightBarText : styles.barText}>
                {item}
              </SVText>
            </TouchableOpacity>
          );
        })}
      </View>

      {currentParticipationList.map((item, idx) => {
        return (
          <ParticipationChallengeCard {...item} key={`${item.title}-${idx}`} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: AppStyles.scaleWidth(40),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  toggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: AppStyles.color.lightGray02,
    marginVertical: AppStyles.scaleWidth(16),
    height: AppStyles.scaleWidth(24),
    borderRadius: AppStyles.scaleWidth(30),
    borderWidth: AppStyles.scaleWidth(1),
  },
  toggleBar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  highlightToggleBar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: AppStyles.scaleWidth(30),
    backgroundColor: AppStyles.color.mint04,
  },
  barText: {
    color: AppStyles.color.deepGray,
    fontWeight: 'bold',
  },
  highlightBarText: {
    color: AppStyles.color.white,
    fontWeight: 'bold',
  },
});

export default React.memo(ParticipationChallengeContainer);
