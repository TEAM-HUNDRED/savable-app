import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import KakaoLogins, {getProfile} from '@react-native-seoul/kakao-login';
import * as Sentry from '@sentry/react-native';
import {track} from '@amplitude/analytics-react-native';

import Api from '../../../lib/api/Api';
import {SquareCheckIcon} from '../../../assets/icons';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';

import SVText from '../../../components/common/SVText';
import {UpdateMemberURLPayload} from '../../../types/api';

type IProps = {
  route: RouteProp<MainScreenStackPropsList, ROUTER.UPDATE_PROFILE_SCREEN>;
};

function UpdateProfileScreen({route}: IProps): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const [profileData, setProfileData] = useState<KakaoLogins.KakaoProfile>();

  const [nickName, setNickName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationNumber, setVerificationNumber] = useState<string>('');
  const [validationNumber, setValidationNumber] = useState<string>('1');
  const [duplicatedPhoneNumber, setDuplicatedPhoneNumber] =
    useState<boolean>(false);

  const [isValidatedNickName, setIsValidatedNickName] = useState<boolean>(true);
  const [isValidatedNumber, setIsValidatedNumber] = useState<boolean>(true);
  const [isValidatedPhoneNumber, setIsValidatedPhoneNumber] =
    useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(true);
  const [sentMessage, setSentMessage] = useState<boolean>(false);

  const [isTermChecked, setIsTermChecked] = useState<boolean>(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState<boolean>(false);

  const nameCheck = /^([가-힣]|[0-9]|[a-z]){2,10}$/;
  const phoneCheck = /^[0][1][0][0-9]{4}\d{4}$/;

  const consentUri =
    'https://superb-nannyberry-327.notion.site/d14f4bc9b75842b7a23573e7350b8931?pvs=4';
  const privacyUri =
    'https://superb-nannyberry-327.notion.site/d46266ccdf7741109e3a1441321c4b2b?pvs=4';

  const validateNickName = () => {
    const nameValidation = nameCheck.test(nickName);

    setIsValidatedNickName(nameValidation);
    return nameValidation;
  };

  const validatePhoneNumber = () => {
    const phoneValidation = phoneCheck.test(phoneNumber);

    setIsValidatedPhoneNumber(phoneValidation);
    return phoneValidation;
  };

  const validateNumber = () => {
    setIsValidatedNumber(validationNumber === verificationNumber);

    return validationNumber === verificationNumber;
  };

  const validateTotalCheck = () => {
    setChecked(isPrivacyChecked && isTermChecked);

    return isPrivacyChecked && isTermChecked;
  };

  const handlePhoneNumber = (text: string) => {
    if (validationNumber) {
      setValidationNumber('');
      setSentMessage(false);
    }

    setPhoneNumber(text);
  };

  const sendSMS = async () => {
    try {
      if (validatePhoneNumber()) {
        const response = await Api.shared.sendSMS(phoneNumber);

        setSentMessage(true);
        setValidationNumber(String(response));
      } else return new Error('전화번호가 잘못되었어요');
    } catch (error) {
      console.log('[Error: Failed to send sms]', error);
      Sentry.captureException(error);
      Sentry.captureMessage('[ERROR]: Something went wrong in sendSMS Method');

      if (error === 'WRONG_NUMBER') setDuplicatedPhoneNumber(true);
    }
  };

  const navigateToHomeScreen = () => {
    navigation.reset({routes: [{name: ROUTER.HOME_SCREEN}]});
  };

  const onPressFinishButton = async () => {
    const canFinish =
      validateNickName() &&
      validateNumber() &&
      validatePhoneNumber() &&
      validateTotalCheck();

    if (canFinish) {
      try {
        await updateProfile({
          username: nickName,
          phoneNumber: phoneNumber,
          imageUrl: profileData ? profileData.profileImageUrl : '',
        });

        await Api.shared.setSessionKeyOnStorage(route.params.sessionKey);
        navigateToHomeScreen();
      } catch (error) {
        console.log('[Error: Set Storage error]', error);
        Sentry.captureException(error);
        Sentry.captureMessage(
          '[ERROR]: Something went wrong in onPressFinishButton Method',
        );
      }
    }
  };

  const navigateToOutLink = (uri: string) => {
    Linking.openURL(uri);
  };

  const updateProfile = async (payload: UpdateMemberURLPayload) => {
    try {
      await Api.shared.updateMemberURLProfile(payload);
    } catch (error) {
      console.log('updateProfile', error);
      Sentry.captureException(error);
      Sentry.captureMessage(
        '[ERROR]: Something went wrong in updateProfile Method',
      );
    }
  };

  const getKakaoProfile: () => Promise<KakaoLogins.KakaoProfile> = async () => {
    return await getProfile()
      .then(result => {
        setProfileData(result);
        setNickName(result.nickname);

        track('UPDATE_PROFILE_VIEW', {
          userName: result.nickname,
          age: result.ageRange,
          gender: result.gender,
        });

        return result;
      })
      .catch(error => {
        throw error;
      });
  };

  useEffect(() => {
    getKakaoProfile();
  }, []);

  if (!profileData) return <></>;

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: profileData.profileImageUrl}}
              style={styles.image}
            />
          </View>
          <View style={styles.inputCardContainer}>
            <SVText body03>{'닉네임'}</SVText>
            <TextInput
              placeholder={'닉네임을 입력해주세요'}
              style={styles.input}
              onChangeText={setNickName}
              onBlur={validateNickName}
              value={nickName}
            />
            {isValidatedNickName ? (
              <SVText body06 style={styles.description}>
                {'닉네임을 2~10자로 입력해주세요'}
              </SVText>
            ) : (
              <SVText body06 style={styles.errorText}>
                {'닉네임을 한글, 영어 소문자, 숫자로 2~10자 입력해주세요'}
              </SVText>
            )}
          </View>
          <View style={styles.inputCardContainer}>
            <SVText body03>{'휴대폰 번호'}</SVText>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'휴대폰 번호를 입력해주세요'}
                style={[styles.input, styles.phoneInput]}
                inputMode={'tel'}
                onChangeText={handlePhoneNumber}
                onBlur={validatePhoneNumber}
                value={phoneNumber}
              />
              {sentMessage ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.buttonContainer,
                    {backgroundColor: AppStyles.color.lightGray02},
                  ]}
                  onPress={sendSMS}>
                  <SVText
                    body03
                    style={[
                      styles.buttonText,
                      {color: AppStyles.color.deepGray},
                    ]}>
                    {'재발송'}
                  </SVText>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.buttonContainer}
                  onPress={sendSMS}>
                  <SVText body03 style={styles.buttonText}>
                    {'발송'}
                  </SVText>
                </TouchableOpacity>
              )}
            </View>
            {duplicatedPhoneNumber ? (
              <SVText body06 style={styles.errorText}>
                {'이미 가입이 되어 있는 휴대폰 번호입니다.'}
              </SVText>
            ) : (
              <SVText
                body06
                style={
                  isValidatedPhoneNumber ? styles.description : styles.errorText
                }>
                {"'-' 없이 휴대폰 번호 11자를 입력해주세요"}
              </SVText>
            )}
          </View>
          <View style={styles.inputCardContainer}>
            <SVText body03>{'인증번호'}</SVText>
            <TextInput
              placeholder={'인증 번호를 입력해주세요'}
              style={styles.input}
              onChangeText={setVerificationNumber}
              value={verificationNumber}
              inputMode={'numeric'}
            />
            {!isValidatedNumber && (
              <SVText body06 style={styles.errorText}>
                {'인증번호가 올바르지 않습니다.'}
              </SVText>
            )}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.barContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
              onPress={() => {
                navigateToOutLink(consentUri);
              }}>
              <SVText
                body05
                style={
                  isTermChecked ? styles.highlightCheckText : styles.checkText
                }>
                {'[필수] 개인 정보 활용 동의서 '}
              </SVText>
            </TouchableOpacity>
            <SquareCheckIcon
              style={isTermChecked ? styles.highlightIcon : styles.icon}
              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
              onPress={() => setIsTermChecked(prev => !prev)}
            />
          </View>
          <View style={styles.barContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
              onPress={() => {
                navigateToOutLink(privacyUri);
              }}>
              <SVText
                body05
                style={
                  isPrivacyChecked
                    ? styles.highlightCheckText
                    : styles.checkText
                }>
                {'[필수] 개인정보 처리 방침 '}
              </SVText>
            </TouchableOpacity>
            <SquareCheckIcon
              style={isPrivacyChecked ? styles.highlightIcon : styles.icon}
              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
              onPress={() => setIsPrivacyChecked(prev => !prev)}
            />
          </View>
          {!checked && (
            <SVText body05 style={styles.errorText}>
              {'해당 사항에 모두 동의하셔야 합니다. '}
            </SVText>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.finishButtonContainer}
            onPress={onPressFinishButton}>
            <SVText body03 style={styles.buttonText}>
              {'완료'}
            </SVText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AppStyles.color.white,
    paddingHorizontal: AppStyles.scaleWidth(24),
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: AppStyles.color.white,
  },
  imageContainer: {
    display: 'flex',
    width: AppStyles.scaleWidth(84),
    height: AppStyles.scaleWidth(84),
    marginVertical: AppStyles.scaleWidth(24),
  },
  image: {
    width: AppStyles.scaleWidth(84),
    height: AppStyles.scaleWidth(84),
    borderRadius: AppStyles.scaleWidth(42),
  },
  inputCardContainer: {
    width: '100%',
    marginBottom: AppStyles.scaleWidth(24),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: AppStyles.scaleWidth(48),
    marginVertical: AppStyles.scaleWidth(6),
  },
  phoneInput: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: AppStyles.scaleWidth(48),
    paddingHorizontal: AppStyles.scaleWidth(16),
    paddingVertical: AppStyles.scaleWidth(12),
    borderRadius: AppStyles.scaleWidth(10),
    borderWidth: AppStyles.scaleWidth(1),
    borderColor: AppStyles.color.lightGray02,
    marginVertical: AppStyles.scaleWidth(6),
    color: AppStyles.color.black,
  },
  description: {
    color: AppStyles.color.gray,
  },
  errorText: {
    color: '#F53333',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: AppStyles.scaleWidth(94),
    height: AppStyles.scaleWidth(48),
    marginLeft: AppStyles.scaleWidth(12),
    paddingHorizontal: AppStyles.scaleWidth(12),
    borderRadius: AppStyles.scaleWidth(20),
    backgroundColor: AppStyles.color.mint04,
  },
  buttonText: {
    fontWeight: 'bold',
    color: AppStyles.color.white,
  },
  bottomContainer: {
    width: '100%',
  },
  finishButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: AppStyles.scaleWidth(48),
    marginTop: AppStyles.scaleWidth(12),
    marginBottom: AppStyles.scaleWidth(24),
    borderRadius: AppStyles.scaleWidth(8),
    backgroundColor: AppStyles.color.mint04,
  },
  barContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: AppStyles.scaleWidth(12),
  },
  icon: {
    color: AppStyles.color.gray03,
    width: AppStyles.scaleWidth(18),
    height: AppStyles.scaleWidth(18),
  },
  highlightIcon: {
    color: AppStyles.color.mint04,
    width: AppStyles.scaleWidth(18),
    height: AppStyles.scaleWidth(18),
  },
  checkText: {
    color: AppStyles.color.gray03,
    borderBottomWidth: AppStyles.scaleWidth(1),
    borderColor: AppStyles.color.gray03,
  },
  highlightCheckText: {},
});

export default React.memo(UpdateProfileScreen);
