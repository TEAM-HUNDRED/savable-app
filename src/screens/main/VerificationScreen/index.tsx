import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import * as Sentry from '@sentry/react-native';

import {CameraIcon, LeftArrowIcon} from '../../../assets/icons';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';

import SVText from '../../../components/common/SVText';
import VerificationGuideContainer from '../../../container/VerificationGuideContainer';
import {ChallengeInfoViewType} from '../../../types/view';
import Api from '../../../lib/api/Api';
import SVButton from '../../../components/common/SVButton';
import {usePopUpProvider} from '../../../lib/context/PopUpContext';
import {useAmplitude} from '../../../lib/hook/useAmplitude';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.VERIFICATION_SCREEN>;
};

function VerificationScreen({route}: PropsType) {
  const cameraRef = useRef<Camera>(null);

  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const {trackEvent} = useAmplitude();

  const device = useCameraDevice('back');
  const {showPopUp} = usePopUpProvider();
  const {hasPermission, requestPermission} = useCameraPermission();

  const [challengeInfo, setChallengeInfo] = useState<ChallengeInfoViewType>();
  const [isActive, setIsActive] = useState<boolean>(true);

  const navigateToFinishScreen = () => {
    navigation.replace(ROUTER.FINISH_VERIFICATION_SCREEN, {
      challengeId: route.params.participationId,
      challengeTitle: route.params.challengeTitle,
    });
  };

  const onBackPress = useCallback(() => {
    return !isActive;
  }, [isActive]);

  const navigateToSetting = () => {
    trackEvent('CLICK_TO_SETTINGS');
    Linking.openSettings();
  };

  const showValidationPopUp = (imageURL: string, formData: FormData) => {
    showPopUp({
      title: '챌린지 인증',
      subButtonText: `인증 규정은 '인증 방법'에서 확인해주세요`,
      buttonText: '예',
      onPressButton: () => {
        createVerification(route.params.participationId, formData).then(() => {
          trackEvent('SUBMIT_VERIFICATION_PHOTO');
          navigateToFinishScreen();
        });
      },
      onPressLeftButton: () => {
        trackEvent('NOT_SUBMIT_VERIFICATION_PHOTO');
        setIsActive(true);
      },
      leftButtonText: '아니오',
      cardChildren: (
        <View style={styles.validationContainer}>
          <SVText center body06>
            {
              '아래의 사진으로 제출하시겠습니까?\n한 번 제출 시에 수정이 어렵습니다'
            }
          </SVText>
          <Image source={{uri: imageURL}} style={styles.verificationImage} />
        </View>
      ),
    });
  };

  const takePhoto = async () => {
    const formData = new FormData();

    if (cameraRef.current) {
      try {
        const result: PhotoFile = await cameraRef.current.takePhoto();
        setIsActive(false);

        await formData.append('image', {
          uri: `file://${result.path}`,
          type: 'multipart/form-data',
          name: 'verification_image',
        });
        trackEvent('CLICK_TAKE_PHOTO');
        showValidationPopUp(`file://${result.path}`, formData);
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
        Sentry.captureMessage(
          '[ERROR]: Something went wrong in take photo Method',
        );
        setIsActive(true);
      }
    }
    return formData;
  };

  const getChallengeDetail = useCallback(
    async (challengeId: number) => {
      try {
        const response = await Api.shared.getChallengeDetail(challengeId);

        setChallengeInfo({
          ...response.challenge,
          guide: response.verificationGuide,
          isParticipatable: response.isParticipatable,
        });
        trackEvent('VERIFICATION_SCREEN_VIEW');
      } catch (error) {
        console.log('[Error: Failed to get challenge detail]', error);
      }
    },
    [trackEvent],
  );

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [onBackPress]);

  useEffect(() => {
    getChallengeDetail(route.params.challengeId);
  }, [route, getChallengeDetail]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

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
      {device && (
        <Camera
          ref={cameraRef}
          orientation={'portrait'}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          photo
        />
      )}
      <TouchableOpacity
        style={styles.takeButton}
        onPress={isActive ? takePhoto : () => {}}>
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
  validationContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  verificationImage: {
    width: AppStyles.scaleWidth(160),
    height: AppStyles.scaleWidth(160),
    marginVertical: AppStyles.scaleWidth(12),
  },
});

export default React.memo(VerificationScreen);
