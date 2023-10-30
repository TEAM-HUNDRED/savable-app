import {useSelector} from 'react-redux';
import {track} from '@amplitude/analytics-react-native';

import {RootState} from '../../modules/redux/RootReducer';

export const useAmplitude = (): {
  trackEvent: (title: string, restProperties?: any) => void;
} => {
  const userInfo = useSelector((state: RootState) => state.userInfo.value);

  const trackEvent = (title: string, restProperties?: any) => {
    track(title, {
      userName: userInfo.userName,
      phoneNumber: userInfo.userPhoneNumber,
      ...restProperties,
    });
  };

  return {trackEvent};
};
