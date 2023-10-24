import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import {CameraIcon, LeftArrowIcon} from '../../../assets/icons';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';

import SVText from '../../../components/common/SVText';
import VerificationGuideContainer from '../../../container/VerificationGuideContainer';
import {ChallengeInfoViewType} from '../../../types/view';
import Api from '../../../lib/api/Api';
import SVButton from '../../../components/common/SVButton';

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
      challengeId: route.params.participationId,
      challengeTitle: route.params.challengeTitle,
    });
  };

  const navigateToSetting = () => {
    Linking.openSettings();
  };

  const takePhoto = async () => {
    const formData = new FormData();

    if (cameraRef.current) {
      try {
        const result: PhotoFile = await cameraRef.current.takePhoto();

        formData.append('image', {
          uri: `file://${result.path}`,
          type: 'multipart/form-data',
          name: 'verification_image',
        });
      } catch (error) {
        console.log(error);
      }
      setIsActive(false);
    }
    return formData;
  };

  const getChallengeDetail = useCallback(async (challengeId: number) => {
    try {
      const response = await Api.shared.getChallengeDetail(challengeId);

      setChallengeInfo({
        ...response.challenge,
        guide: response.verificationGuide,
        isParticipatable: response.isParticipatable,
      });
    } catch (error) {
      console.log('[Error: Failed to get challenge detail]', error);
    }
  }, []);

  const createVerification = async (
    participationId: number,
    payload: FormData,
  ) => {
    try {
      const response = await Api.shared.createVerification(
        participationId,
        payload,
      );

      return response;
    } catch (error) {
      console.log('[Error: Failed to create verification]', error);
    }
  };

  const onPressTakeButton = async () => {
    const response = await takePhoto();
    await createVerification(route.params.participationId, response).then(
      () => {
        navigateToFinishScreen();
      },
    );
  };

  useEffect(() => {
    getChallengeDetail(route.params.challengeId);
  }, [route, getChallengeDetail]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  if (device == null) return <View />;
  if (!hasPermission)
    return (
      <View style={styles.cameraErrorContainer}>
        <CameraIcon
          style={styles.cameraIcon}
          color={AppStyles.color.mint01}
          width={AppStyles.scaleWidth(96)}
          height={AppStyles.scaleWidth(96)}
        />
        <SVText center header01 style={styles.textStyle}>
          {'카메라 권한을 승인해주세요'}
        </SVText>
        <SVText center body03 style={styles.textStyle}>
          {'권한 승인을 하지 않을 경우\n 챌린지 인증이 불가합니다.'}
        </SVText>
        <View style={styles.permissionButtonContainer}>
          <SVButton
            borderRadius={AppStyles.scaleWidth(8)}
            onPress={navigateToSetting}>
            {'설정으로 이동'}
          </SVButton>
        </View>
      </View>
    );

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
        onPress={isActive ? onPressTakeButton : () => {}}>
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
  cameraErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginBottom: AppStyles.scaleWidth(12),
  },
  permissionButtonContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(40),
    marginTop: AppStyles.scaleWidth(12),
    paddingHorizontal: AppStyles.scaleWidth(40),
  },
  cameraIcon: {
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: AppStyles.scaleWidth(12),
  },
});

export default React.memo(VerificationScreen);
