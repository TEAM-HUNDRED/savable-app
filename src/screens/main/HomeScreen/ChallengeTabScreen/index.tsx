import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import * as Sentry from '@sentry/react-native';
import {useSelector} from 'react-redux';
import {track} from '@amplitude/analytics-react-native';

import MainBanner from '../../../../components/banner/MainBanner';
import LogoHeader from '../../../../components/header/LogoHeader';
import {AppStyles} from '../../../../config';
import ChallengeContainer from '../../../../container/ChallengeContainer';
import Api from '../../../../lib/api/Api';
import {ChallengeViewType} from '../../../../types/view/challenge';
import {RootState} from '../../../../modules/redux/RootReducer';
import SVText from '../../../../components/common/SVText';

function ChallengeTabScreen(): React.ReactElement {
  const [challengeList, setChallengeList] = useState<ChallengeViewType[]>([]);
  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  const getChallengeList = async () => {
    try {
      const response = await Api.shared.getChallengeList();
      setChallengeList(response);
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in getChallengeList Method',
      );
    }
  };

  useEffect(() => {
    getChallengeList();
    track('CHALLENGE_TAB_SCREEN_VIEW', {
      userName: userInfo.userName,
      phoneNumber: userInfo.userPhoneNumber,
    });
  }, [userInfo]);

  if (challengeList.length === 0) return <></>;

  return (
    <ScrollView style={styles.container}>
      <LogoHeader />
      <MainBanner />
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
      <ChallengeContainer challengeList={challengeList} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  explanationContainer: {
    flexDirection: 'column',
    borderRadius: AppStyles.scaleWidth(8),
    padding: AppStyles.scaleWidth(8),
    marginTop: AppStyles.scaleWidth(24),
    marginHorizontal: AppStyles.scaleWidth(24),
    backgroundColor: AppStyles.color.lightGray02,
  },
  textContainer: {
    flexDirection: 'row',
  },
});

export default React.memo(ChallengeTabScreen);
