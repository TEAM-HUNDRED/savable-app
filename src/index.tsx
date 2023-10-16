import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import PopUpProvider from './lib/context/PopUpContext';
import ToastProvider from './lib/context/ToastContext';
import {store} from './modules/redux/Store';

import RouterScreen from './screens';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });

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

export default App;
