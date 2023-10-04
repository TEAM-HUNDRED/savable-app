import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {MainScreenStackPropsList, ROUTER} from '../../../config';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.FINISH_VERIFICATION_SCREEN>;
};

function FinishVerificationScreen({route}: PropsType) {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  useEffect(() => {
    navigation.setOptions({
      title: route.params.challengeTitle,
      headerLeft: () => <></>,
    });
  }, []);

  return <ScrollView contentContainerStyle={styles.container}></ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(FinishVerificationScreen);
