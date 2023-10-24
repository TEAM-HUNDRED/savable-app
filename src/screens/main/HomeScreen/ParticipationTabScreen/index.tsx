import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

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
});

export default React.memo(ParticipationTabScreen);
