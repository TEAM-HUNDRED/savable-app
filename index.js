/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://3c53f610c2644b8567f4744f1a5c323c@o4505526964256768.ingest.sentry.io/4506106816757760',
});

AppRegistry.registerComponent(appName, () => App);
