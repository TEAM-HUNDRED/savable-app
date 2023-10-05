import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Api from '../../../lib/api/Api';
import {MainScreenStackPropsList, ROUTER} from '../../../config';
import {VerificationDetailPropsType} from '../../../types/view';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.FINISH_VERIFICATION_SCREEN>;
};

function FinishVerificationScreen({route}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const [verificationData, setVerificationDate] =
    useState<VerificationDetailPropsType>();

  const getVerificationDetail = async () => {
    try {
      const response = await Api.shared.getVerificationDetail(
        String(route.params.challengeId),
      );

      setVerificationDate(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params.challengeTitle,
      headerLeft: () => <></>,
    });

    getVerificationDetail();
  }, []);

  return <ScrollView contentContainerStyle={styles.container}></ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(FinishVerificationScreen);
