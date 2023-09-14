import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RouterScreen from './screens';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RouterScreen />
    </NavigationContainer>
  );
}

export default App;
