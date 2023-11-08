import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Api from '../api/Api';
import {handleUserInfo} from '../../modules/redux/slice/userInfoSlice';
import {UserInfoAPIResponse} from '../../types/api';

export const useAuthentication = (): {
  isAuthentication: boolean;
  loading: boolean;
} => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const getStorageSessionData = async () => {
    const value = JSON.parse(String(await AsyncStorage.getItem('session_key')));

    return value;
  };

  const dispatchUserData = useCallback(
    (data: UserInfoAPIResponse) => {
      dispatch(
        handleUserInfo({
          value: {
            userName: data.username,
            userPhoneNumber: data.phoneNumber,
            userProfileImageUrl: data.profileImage,
            userTotalReward: data.totalReward,
          },
        }),
      );
    },
    [dispatch],
  );

  const validateAuth = useCallback(async () => {
    try {
      const storedSession = await getStorageSessionData();
      console.log(
        '실행',
        storedSession,
        storedSession === null && storedSession === '',
      );

      await Api.shared.setCookie(storedSession);
      const userInfo = await Api.shared.getUserInfo();
      const hasUserinfo = userInfo && userInfo.username;

      // 저장된 세션 값이 없는데, USER INFO를 불러올 수 있는 경우, 로그아웃 처리를 해줌.
      if (storedSession === null && storedSession === '') {
        console.log('실행');
        await Api.shared.logout();
        setIsAuthentication(false);
        return;
      }

      // 사용자 데이터가 없을 경우, 회원가입이 이루어지지 않았으므로 AUTH가 False값으로 변경되면서 RETURN
      if (!hasUserinfo) {
        setIsAuthentication(false);
        return;
      }

      dispatchUserData(userInfo);
      setIsAuthentication(true);
    } catch (error) {
      console.log('[FAILURE] FAIL AUTHENTICATION', error);
      setIsAuthentication(false);
    } finally {
      setLoading(false);
    }
  }, [dispatchUserData]);

  useEffect(() => {
    validateAuth();
  }, [validateAuth]);

  return {isAuthentication, loading};
};
