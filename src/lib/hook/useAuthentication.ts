import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Api from '../api/Api';
import {handleUserInfo} from '../../modules/redux/slice/userInfoSlice';

export const useAuthentication = (): {
  isAuthentication: boolean;
  loading: boolean;
} => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const getStorageSessionData = async () => {
    try {
      const value = JSON.parse(
        String(await AsyncStorage.getItem('session_key')),
      );
      console.log(value, 'getItem', value !== null && value !== '');

      if (value !== null && value !== '') {
        await Api.shared.setAuthToken(value);
        await getUserInfo();

        setIsAuthentication(true);
      } else {
        await Api.shared.setAuthToken('');
      }

      return value;
    } catch (e: any) {
      console.log(e);
      Api.shared.setAuthToken(String(''));

      if (e.response.status === 401) return;
      else {
        console.log('[Get Session Error]', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await Api.shared.getUserInfo();

      dispatch(
        handleUserInfo({
          value: {
            userName: response.username,
            userPhoneNumber: response.phoneNumber,
            userProfileImageUrl: response.profileImage,
            userTotalReward: response.totalReward,
          },
        }),
      );
    } catch (error) {
      console.log(
        '[Error: Failed to get user Info in useAuthentication',
        error,
      );
      await Api.shared.setSessionKeyOnStorage('');
    }
  };

  useEffect(() => {
    getStorageSessionData();
  }, []);

  return {isAuthentication, loading};
};
