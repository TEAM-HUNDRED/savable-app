import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import {LeftArrowIcon} from '../../../assets/icons';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';

import SVText from '../../../components/common/SVText';
import VerificationGuideContainer from '../../../container/VerificationGuideContainer';
import {ChallengeInfoViewType} from '../../../types/view';
import Api from '../../../lib/api/Api';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.VERIFICATION_SCREEN>;
};

function VerificationScreen({route}: PropsType) {
  const cameraRef = useRef<Camera>(null);

  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const [challengeInfo, setChallengeInfo] = useState<ChallengeInfoViewType>();
  const [isActive, setIsActive] = useState<boolean>(true);

  const navigateToFinishScreen = () => {
    navigation.replace(ROUTER.FINISH_VERIFICATION_SCREEN, {
      challengeId: route.params.challengeId,
      challengeTitle: route.params.challengeTitle,
    });
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePhoto();
      const fetchResult = await fetch(`file://${result.path}`);
      const data = await fetchResult.blob();

      setIsActive(false);
      navigateToFinishScreen();
    }
  };

  const getChallengeDetail = useCallback(async (challengeId: number) => {
    const response = await Api.shared.getChallengeDetail(challengeId);

    setChallengeInfo({
      ...response.challenge,
      guide: response.verificationGuide,
    });
  }, []);

  const createVerification = async (image: FormData) => {
    const response = await Api.shared.createVerification(
      route.params.challengeId,
      image,
    );

    return response;
  };

  useEffect(() => {
    getChallengeDetail(route.params.challengeId);
  }, [route, getChallengeDetail]);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);

  if (device == null) return <View />;
  // <NoCameraErrorView />;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={navigation.goBack}
          hitSlop={10}>
          <LeftArrowIcon style={styles.icon} />
        </TouchableOpacity>
        <SVText body02 style={styles.headerText}>
          {route.params?.challengeTitle}
        </SVText>
        <View style={styles.icon} />
      </View>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo
      />
      <TouchableOpacity
        style={styles.takeButton}
        onPress={() => {
          takePhoto();
        }}>
        <View style={styles.circle} />
      </TouchableOpacity>
      <VerificationGuideContainer
        verificationDescription={
          challengeInfo ? challengeInfo.verificationDescription : ''
        }
        challengeGuideInfo={challengeInfo ? challengeInfo.guide : []}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    top: AppStyles.scaleWidth(0),
    height: AppStyles.scaleWidth(70),
    paddingHorizontal: AppStyles.scaleWidth(30),
    zIndex: 1,
  },
  icon: {
    width: AppStyles.scaleWidth(10),
    height: AppStyles.scaleWidth(20),
    color: AppStyles.color.white,
  },
  headerText: {
    color: AppStyles.color.white,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: AppStyles.color.black,
    paddingVertical: AppStyles.scaleWidth(80),
  },
  takeButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: AppStyles.scaleWidth(90),
    width: AppStyles.scaleWidth(80),
    height: AppStyles.scaleWidth(80),
    borderRadius: AppStyles.scaleWidth(40),
    backgroundColor: AppStyles.color.white,
  },
  circle: {
    borderWidth: AppStyles.scaleWidth(2),
    width: AppStyles.scaleWidth(70),
    height: AppStyles.scaleWidth(70),
    borderRadius: AppStyles.scaleWidth(35),
  },
});

export default React.memo(VerificationScreen);
