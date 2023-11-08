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

      // 저장된 세션 값이 없을 경우에는 AUTH가 False값으로 변경되면서 RETURN
      if (storedSession === null && storedSession === '') {
        setIsAuthentication(false);
        return;
      }

      await Api.shared.setCookie(storedSession);
      const userInfo = await Api.shared.getUserInfo();
      const hasUserinfo = userInfo && userInfo.username;

      // 사용자 데이터가 없을 경우, 회원가입이 이루어지지 않았으므로 AUTH가 False값으로 변경되면서 RETURN
      if (!hasUserinfo) {
        setIsAuthentication(false);
        return;
      }

      dispatchUserData(userInfo);
      setIsAuthentication(true);
    } catch (error) {
      console.log('[ERROR] ERROR IN VALIDATE AUTH', error);
    } finally {
      setLoading(false);
    }
  }, [dispatchUserData]);

  useEffect(() => {
    validateAuth();
  }, [validateAuth]);

  return {isAuthentication, loading};
};
