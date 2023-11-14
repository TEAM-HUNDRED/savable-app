import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import {track} from '@amplitude/analytics-react-native';

import Api from '../../../../lib/api/Api';
import type {RootState} from '../../../../modules/redux/Store';
import {AppStyles} from '../../../../config';
import {ParticipationViewPropsType} from '../../../../types/view';

import ParticipationChallengeContainer from '../../../../container/ParticipationChallengeContainer';
import LogoHeader from '../../../../components/header/LogoHeader';
import SVText from '../../../../components/common/SVText';

function ParticipationTabScreen(): React.ReactElement {
  const isFocused = useIsFocused();

  const [participationList, setParticipationList] = useState<
    ParticipationViewPropsType[]
  >([]);

  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  const getParticipationList = async () => {
    try {
      const response = await Api.shared.getParticipationChallengeList();

      track('PARTICIPATION_TAB_SCREEN_VIEW', {
        userName: userInfo.userName,
        phoneNumber: userInfo.userPhoneNumber,
      });

      setParticipationList(response);
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in getParticipationList Method',
      );
    }
  };

  useEffect(() => {
    getParticipationList();
  }, [isFocused]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <LogoHeader />
      <View style={styles.profileContainer}>
        <Image
          source={{uri: userInfo.userProfileImageUrl}}
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <SVText body04>
            <SVText body04 style={styles.profileText}>
              {'세이버 '}
            </SVText>
            <SVText body02 style={styles.highlightText}>
              {userInfo.userName}
            </SVText>
            <SVText body04 style={styles.profileText}>
              {' 님,\n오늘 절약 잊지 않으셨죠?'}
            </SVText>
          </SVText>
        </View>
      </View>
      <View style={styles.explanationContainer}>
        <View style={styles.textContainer}>
          <SVText color={AppStyles.color.black}>{'📌 '}</SVText>
          <SVText color={AppStyles.color.deepGray}>
            {
              '이벤트 공지에 따라 제공된 이벤트 리워드 1,000 포인트는 11/15(수) 자정에 소멸될 예정입니다.\n\n빠르게 사용해주세요:D'
            }
          </SVText>
        </View>
      </View>
      <ParticipationChallengeContainer participationList={participationList} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyles.color.white,
  },
  contentContainer: {
    flex: 1,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppStyles.scaleWidth(24),
    marginBottom: AppStyles.scaleWidth(30),
  },
  profileImage: {
    width: AppStyles.scaleWidth(60),
    height: AppStyles.scaleWidth(60),
    marginRight: AppStyles.scaleWidth(10),
    borderRadius: AppStyles.scaleWidth(30),
    borderWidth: AppStyles.scaleWidth(1),
    borderColor: AppStyles.color.gray02,
  },
  profileTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  highlightText: {
    color: AppStyles.color.mint05,
    fontWeight: 'bold',
    lineHeight: AppStyles.scaleFont(24),
  },
  profileText: {
    color: AppStyles.color.gray,
    fontWeight: 'bold',
    lineHeight: AppStyles.scaleFont(24),
  },
  explanationContainer: {
    flexDirection: 'column',
    borderRadius: AppStyles.scaleWidth(8),
    padding: AppStyles.scaleWidth(8),
    marginHorizontal: AppStyles.scaleWidth(24),
    marginBottom: AppStyles.scaleWidth(24),
    backgroundColor: AppStyles.color.lightGray02,
  },
  textContainer: {
    flexDirection: 'row',
  },
});

export default React.memo(ParticipationTabScreen);
