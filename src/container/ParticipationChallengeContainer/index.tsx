import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {AppStyles, HomeScreenStackPropsList, ROUTER} from '../../config';
import {ParticipationViewPropsType} from '../../types/view';

import SVText from '../../components/common/SVText';
import ParticipationChallengeCard from '../../components/card/ParticipationChallengeCard';

type PropsType = {
  participationList: Array<ParticipationViewPropsType>;
};

function ParticipationChallengeContainer({
  participationList,
}: PropsType): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<HomeScreenStackPropsList>>();

  const [toggleIndex, setToggleIndex] = useState<number>(0);
  const beforeVerifiedList = participationList.filter(
    item => item.isVerifiedToday === false,
  );
  const afterVerifiedList = participationList.filter(
    item => item.isVerifiedToday === true,
  );

  const toggleList = useMemo(() => {
    return [
      `인증 전 (${beforeVerifiedList.length})`,
      `인증 완료 (${afterVerifiedList.length})`,
    ];
  }, [beforeVerifiedList, afterVerifiedList]);

  const currentParticipationList = useMemo(() => {
    return toggleIndex ? afterVerifiedList : beforeVerifiedList;
  }, [toggleIndex, afterVerifiedList, beforeVerifiedList]);

  const hasParticipationChallenge = !(participationList.length === 0);

  const navigateToChallengeScreen = useCallback(() => {
    navigation.navigate(ROUTER.CHALLENGE_SCREEN);
  }, [navigation]);

  const handleToggleIndex = useCallback((currentIndex: number) => {
    setToggleIndex(currentIndex);
  }, []);

  const goToParticipation = useCallback(() => {
    handleToggleIndex(0);
  }, [handleToggleIndex]);

  return (
    <View style={styles.container}>
      <SVText body01>참여 중인 챌린지</SVText>
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
                body06
                style={isHighlight ? styles.highlightBarText : styles.barText}>
                {item}
              </SVText>
            </TouchableOpacity>
          );
        })}
      </View>

      {currentParticipationList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <SVText body05 center style={styles.emptyText}>
            {hasParticipationChallenge && toggleIndex
              ? '참여 완료한 챌린지가 없어요!\n챌린지 참여하러 가실래요?'
              : '참여할 챌린지가 없어요\n챌린지를 신청하고 돌아와주세요!'}
          </SVText>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              hasParticipationChallenge && toggleIndex
                ? goToParticipation
                : navigateToChallengeScreen
            }
            style={styles.emptyButton}>
            <SVText center body07 style={styles.emptyButtonText}>
              {hasParticipationChallenge && toggleIndex
                ? '챌린지 참여하러 가기'
                : '챌린지 신청하러 가기'}
            </SVText>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {currentParticipationList.map((item, idx) => {
            return (
              <ParticipationChallengeCard
                {...item}
                key={`${item.title}-${idx}`}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  toggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: AppStyles.color.lightGray02,
    marginVertical: AppStyles.scaleWidth(16),
    borderRadius: AppStyles.scaleWidth(30),
    borderWidth: AppStyles.scaleWidth(1),
  },
  toggleBar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: AppStyles.scaleWidth(6),
  },
  highlightToggleBar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: AppStyles.scaleWidth(30),
    backgroundColor: AppStyles.color.mint04,
    paddingVertical: AppStyles.scaleWidth(6),
  },
  barText: {
    color: AppStyles.color.deepGray,
    fontWeight: 'bold',
  },
  highlightBarText: {
    color: AppStyles.color.white,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    lineHeight: AppStyles.scaleWidth(20),
  },
  emptyButton: {
    width: AppStyles.scaleWidth(200),
    height: AppStyles.scaleWidth(36),
    marginTop: AppStyles.scaleWidth(10),
    paddingVertical: AppStyles.scaleWidth(10),
    borderWidth: AppStyles.scaleWidth(1),
    borderRadius: AppStyles.scaleWidth(8),
    borderColor: AppStyles.color.lightGray02,
  },
  emptyButtonText: {
    color: AppStyles.color.deepGray,
  },
});

export default React.memo(ParticipationChallengeContainer);
