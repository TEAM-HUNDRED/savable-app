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

import {AppStyles, MainScreenStackPropsList} from '../../../config';
import SVText from '../../../components/common/SVText';

function UpdateProfileScreen(): React.ReactElement {
  const navigation =
    useNavigation<StackNavigationProp<MainScreenStackPropsList>>();

  const [profileData, setProfileData] = useState<KakaoLogins.KakaoProfile>();
  const [nickName, setNickName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationNumber, setVerificationNumber] = useState<string>('');

  const [validatedNickName, setValidatedNickName] = useState<boolean>(true);
  const [validatedNumber, setValidatedNumber] = useState<boolean>(true);
  const [sentMessage, setSentMessage] = useState<boolean>(false);

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
            value={nickName}
          />
          {validatedNickName ? (
            <SVText body06 style={styles.description}>
              {'닉네임을 2~10자로 입력해주세요'}
            </SVText>
          ) : (
            <SVText body06 style={styles.errorText}>
              {'닉네임은 한글, 영문, 숫자만 입력 가능합니다.'}
            </SVText>
          )}
        </View>
        <View style={styles.inputCardContainer}>
          <SVText body03>{'휴대폰 번호'}</SVText>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'휴대폰 번호를 입력해주세요'}
              style={[styles.input, {flex: 1}]}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
            {sentMessage ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.buttonContainer,
                  {backgroundColor: AppStyles.color.lightGray02},
                ]}>
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
                style={styles.buttonContainer}>
                <SVText body03 style={styles.buttonText}>
                  {'발송'}
                </SVText>
              </TouchableOpacity>
            )}
          </View>
          <SVText body06 style={styles.description}>
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
          />
          {!validatedNumber && (
            <SVText body06 style={styles.errorText}>
              {'인증번호가 올바르지 않습니다.'}
            </SVText>
          )}
        </View>
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
    marginVertical: AppStyles.scaleWidth(40),
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
});

export default React.memo(UpdateProfileScreen);
