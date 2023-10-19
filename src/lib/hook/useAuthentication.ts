import {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/Api';

export const useAuthentication = (): {
  isAuthentication: boolean;
  loading: boolean;
} => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);

  const getStorageSessionData = async () => {
    try {
      const value = await AsyncStorage.getItem('session_key');
      console.log(value);

      if (value !== null) {
        await Api.shared.setAuthToken(value);
        await getUserInfo();

        setIsAuthentication(true);
      }
      return value;
    } catch (e: any) {
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

      console.log(response);
    } catch (error) {
      console.log('[Error: Failed to get user Info', error);
      await Api.shared.setSessionKeyOnStorage('');
    }
  };

  useEffect(() => {
    getStorageSessionData();
  }, []);

  return {isAuthentication, loading};
};
