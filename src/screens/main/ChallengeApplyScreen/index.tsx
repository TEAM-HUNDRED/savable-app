import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import {
  AppStyles,
  HomeScreenStackPropsList,
  MainScreenStackPropsList,
  ROUTER,
} from '../../../config';
import {ChallengeInfoViewType} from '../../../types/view';

import SVText from '../../../components/common/SVText';
import SVDivider from '../../../components/common/SVDivider';
import SVButton from '../../../components/common/SVButton';
import ChallengeApplyCard from '../../../components/card/ChallengeApplyCard';
import {useToastProvider} from '../../../lib/context/ToastContext';
import {usePopUpProvider} from '../../../lib/context/PopUpContext';
import {StackNavigationProp} from '@react-navigation/stack';
import Api from '../../../lib/api/Api';
import {useAmplitude} from '../../../lib/hook/useAmplitude';

type PropsType = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.CHALLENGE_APPLY_SCREEN>;
};

function ChallengeApplyScreen({route}: PropsType): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();
  const homeNavigation =
    useNavigation<StackNavigationProp<HomeScreenStackPropsList>>();

  const {trackEvent} = useAmplitude();

  const {showToast} = useToastProvider();
  const {showPopUp} = usePopUpProvider();

  const challengeInfo: ChallengeInfoViewType | undefined =
    route.params.challengeInfo;

  const durationList = ['1주', '2주', '3주', '4주', '5주'];

  const [duration, setDuration] = useState<string>(durationList[0]);
  const [target, setTarget] = useState<string>('1');

  const handleNavigationHeader = useCallback(() => {
    navigation.setOptions({title: route.params.challengeInfo?.title});
  }, [navigation, route]);

  const handleDuration = (currentDuration: string) => {
    setDuration(currentDuration);
    targetOfDuration(currentDuration);
  };

  const targetOfDuration = (currentDuration: string) => {
    const week = durationList.findIndex(item => item === currentDuration) + 1;

    if (Number(target) < week * 1) {
      setTarget(String(week * 1));
    } else if (Number(target) > week * 7) {
      setTarget(String(week * 7));
    }
  };

  const handleSaveTarget = (currentTarget: string) => {
    const week = durationList.findIndex(item => item === duration) + 1;

    if (Number(currentTarget) < week * 1) {
      showToast({currentText: '일주일에 최소 1회 절약해야 합니다!'});
    } else if (Number(currentTarget) > week * 7) {
      showToast({currentText: '일주일에 최대 7회까지 절약가능 합니다!'});
    } else {
      setTarget(currentTarget);
    }
  };

  const handleKeyboardInput = (currentTarget: string) => {
    const week = durationList.findIndex(item => item === duration) + 1;

    setTarget(currentTarget);

    if (Number(currentTarget) < week * 1) {
      showToast({currentText: '일주일에 최소 1회 절약해야 합니다!'});
    } else if (Number(currentTarget) > week * 7) {
      showToast({currentText: '일주일에 최대 7회까지 절약가능 합니다!'});
    }
  };

  const onBlurKeyboard = (currentTarget: string) => {
    const week = durationList.findIndex(item => item === duration) + 1;

    if (Number(currentTarget) < week * 1) {
      setTarget(String(week * 1));
      showToast({currentText: '일주일에 최소 1회 절약해야 합니다!'});
    } else if (Number(currentTarget) > week * 7) {
      setTarget(String(week * 7));
      showToast({currentText: '일주일에 최대 7회까지 절약가능 합니다!'});
    } else {
      setTarget(currentTarget);
    }
  };

  const navigateToChallengeScreen = () => {
    homeNavigation.navigate(ROUTER.PARTICIPATION_SCREEN);
  };

  const applyChallenge = async () => {
    try {
      const data = await Api.shared.ApplyChallenge({
        challengeId: challengeInfo ? challengeInfo.id : 0,
        duration: (durationList.findIndex(item => item === duration) + 1) * 7,
        verificationGoal: Number(target),
      });
      navigateToChallengeScreen();

      trackEvent('CLICK_APPLY_CHALLENGE_IN_APPLY_SCREEN', {
        challengeId: challengeInfo ? challengeInfo.id : 0,
        duration: (durationList.findIndex(item => item === duration) + 1) * 7,
        verificationGoal: Number(target),
      });

      return data;
    } catch (error) {
      console.log('[Error: Failed to apply challenge', error);
      Sentry.captureException(error);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in applyChallenge Method',
      );
    }
  };

  const onPressApplyButton = () => {
    showPopUp({
      title: '챌린지 참여 완료!',
      subButtonText: 'Savable과 함께 절약해요',
      buttonText: '확인',
      onPressButton: applyChallenge,
      cardChildren: (
        <View>
          <SVText body04 center>
            {'챌린지 인증하면'}
          </SVText>
          <View style={styles.cardTextContainer}>
            <SVText body04 center style={styles.highlightText}>
              {`${route.params.challengeInfo?.estimatedSavings.toLocaleString()}원 `}
            </SVText>
            <SVText body04 center>
              {'절약!'}
            </SVText>
          </View>
          <View style={styles.cardTextContainer}>
            <SVText body04 center style={styles.highlightText}>
              {`${String(route.params.challengeInfo?.reward)}포인트 `}
            </SVText>
            <SVText body04 center>
              {'지급!'}
            </SVText>
          </View>
        </View>
      ),
    });
  };

  useEffect(() => {
    handleNavigationHeader();
    trackEvent('CHALLENGE_APPLY_VIEW');
  }, [handleNavigationHeader, trackEvent]);

  if (!challengeInfo) return <></>;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Image
          source={{uri: challengeInfo.image}}
          style={styles.challengeImage}
        />
        <View style={styles.defaultHorizontal}>
          <SVText body06 style={styles.titleText}>
            {challengeInfo.title}
          </SVText>
        </View>
        <SVDivider />
        <View style={styles.defaultHorizontal}>
          <ChallengeApplyCard
            durationList={durationList}
            duration={duration}
            target={target}
            estimatedSavings={
              route.params.challengeInfo
                ? route.params.challengeInfo.estimatedSavings
                : 0
            }
            handleDuration={handleDuration}
            handleSaveTarget={handleSaveTarget}
            handleKeyboardInput={handleKeyboardInput}
            onBlurKeyboard={onBlurKeyboard}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SVButton
            borderRadius={AppStyles.scaleWidth(8)}
            onPress={onPressApplyButton}>
            {'참여하기'}
          </SVButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  contentContainer: {
    paddingBottom: AppStyles.statusBarHeight,
  },
  challengeImage: {
    width: '100%',
    height: AppStyles.scaleWidth(226),
  },
  defaultHorizontal: {
    marginHorizontal: AppStyles.scaleWidth(24),
  },
  titleText: {
    marginVertical: AppStyles.scaleWidth(25),
  },
  highlightText: {
    color: AppStyles.color.mint05,
    fontWeight: 'bold',
  },
  cardTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: AppStyles.scaleWidth(50),
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
});

export default React.memo(ChallengeApplyScreen);
