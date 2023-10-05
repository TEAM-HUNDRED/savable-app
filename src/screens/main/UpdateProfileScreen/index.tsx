import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import KakaoLogins, {getProfile} from '@react-native-seoul/kakao-login';

import Api from '../../../lib/api/Api';
import {SquareCheckIcon} from '../../../assets/icons';
import {AppStyles, MainScreenStackPropsList, ROUTER} from '../../../config';

import SVText from '../../../components/common/SVText';

function UpdateProfileScreen(): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const [profileData, setProfileData] = useState<KakaoLogins.KakaoProfile>();

  const [nickName, setNickName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationNumber, setVerificationNumber] = useState<string>('');
  const [validationNumber, setValidationNumber] = useState<string>('');

  const [isValidatedNickName, setIsValidatedNickName] = useState<boolean>(true);
  const [isValidatedNumber, setIsValidatedNumber] = useState<boolean>(true);
  const [isValidatedPhoneNumber, setIsValidatedPhoneNumber] =
    useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(true);
  const [sentMessage, setSentMessage] = useState<boolean>(false);

  const [isTermChecked, setIsTermChecked] = useState<boolean>(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState<boolean>(false);

  const nameCheck = /^([가-힣]|[0-9]|[a-z]){2,10}$/;
  const phoneCheck = /^[0][1][0][0-9]{3,4}\d{4}$/;

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

  const sendSMS = async () => {
    const response = await Api.shared.sendSMS(phoneNumber);

    setSentMessage(true);
    setValidationNumber(String(response.number));
  };

  const navigateToHomeScreen = () => {
    navigation.reset({routes: [{name: ROUTER.HOME_SCREEN}]});
  };

  const onPressFinishButton = () => {
    const canFinish =
      validateNickName() &&
      validateNumber() &&
      validatePhoneNumber() &&
      validateTotalCheck();

    if (canFinish) {
      navigateToHomeScreen();
    }
  };

  const getKakaoProfile: () => Promise<KakaoLogins.KakaoProfile> = async () => {
    return await getProfile()
      .then(result => {
        setProfileData(result);
        setNickName(result.nickname);

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
    <View style={styles.container}>
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
              {'닉네임을 한글, 영문, 숫자로 2~10자 입력해주세요'}
            </SVText>
          )}
        </View>
        <View style={styles.inputCardContainer}>
          <SVText body03>{'휴대폰 번호'}</SVText>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'휴대폰 번호를 입력해주세요'}
              style={[styles.input, {flex: 1}]}
              inputMode={'tel'}
              onChangeText={setPhoneNumber}
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
          <SVText
            body06
            style={
              isValidatedPhoneNumber ? styles.description : styles.errorText
            }>
            {"'-' 없이 휴대폰 번호를 입력해주세요"}
          </SVText>
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
          <TouchableOpacity activeOpacity={0.8}>
            <SVText
              body05
              style={
                isTermChecked ? styles.highlightCheckText : styles.checkText
              }>
              {'[필수] 이용약관 '}
            </SVText>
          </TouchableOpacity>
          <SquareCheckIcon
            style={isTermChecked ? styles.highlightIcon : styles.icon}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
            onPress={() => setIsTermChecked(prev => !prev)}
          />
        </View>
        <View style={styles.barContainer}>
          <TouchableOpacity activeOpacity={0.8}>
            <SVText
              body05
              style={
                isPrivacyChecked ? styles.highlightCheckText : styles.checkText
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  input: {
    width: '100%',
    height: AppStyles.scaleWidth(48),
    paddingHorizontal: AppStyles.scaleWidth(16),
    paddingVertical: AppStyles.scaleWidth(12),
    borderRadius: AppStyles.scaleWidth(10),
    borderWidth: AppStyles.scaleWidth(1),
    borderColor: AppStyles.color.lightGray02,
    marginVertical: AppStyles.scaleWidth(6),
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
