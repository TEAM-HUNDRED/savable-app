import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import Api from '../../../../lib/api/Api';

import LogoHeader from '../../../../components/header/LogoHeader';
import {ParticipationViewPropsType} from '../../../../types/view';

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
    <ScrollView style={styles.container}>
      <LogoHeader />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ParticipationTabScreen);
