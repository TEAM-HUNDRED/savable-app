import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import Api from '../../../../lib/api/Api';

import LogoHeader from '../../../../components/header/LogoHeader';
import {ParticipationViewPropsType} from '../../../../types/view';
import ParticipationChallengeContainer from '../../../../container/ParticipationChallengeContainer';
import {AppStyles} from '../../../../config';

function ParticipationTabScreen(): React.ReactElement {
  const [participationList, setParticipationList] = useState<
    ParticipationViewPropsType[]
  >([]);

  const getParticipationList = async () => {
    try {
      const response = await Api.shared.getParticipationChallengeList();

      setParticipationList(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getParticipationList();
  }, []);

  if (participationList.length === 0) return <></>;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <LogoHeader />
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
});

export default React.memo(ParticipationTabScreen);
