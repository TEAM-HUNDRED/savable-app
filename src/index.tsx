import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import PopUpProvider from './lib/context/PopUpContext';
import ToastProvider from './lib/context/ToastContext';
import {store} from './modules/redux/Store';

import RouterScreen from './screens';

function App(): JSX.Element {
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
