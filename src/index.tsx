import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ToastProvider from './lib/context/ToastContext';
import RouterScreen from './screens';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <ToastProvider>
        <RouterScreen />
      </ToastProvider>
    </NavigationContainer>
  );
}

export default App;
