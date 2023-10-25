import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';

import PopUpProvider from './lib/context/PopUpContext';
import ToastProvider from './lib/context/ToastContext';
import {store} from './modules/redux/Store';

import RouterScreen from './screens';

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });

  const handleCrashlytics = async () => {
    try {
      await crashlytics().setCrashlyticsCollectionEnabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    crashlytics().log('App mounted.');
    handleCrashlytics();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PopUpProvider>
          <ToastProvider>
            <RouterScreen />
          </ToastProvider>
        </PopUpProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default Sentry.wrap(App);
