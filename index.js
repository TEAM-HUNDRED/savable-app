/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import {SENTRY_URI, AMPLITUDE_ID} from '@env';
import * as Sentry from '@sentry/react-native';
import {init} from '@amplitude/analytics-react-native';

Sentry.init({
  dsn: SENTRY_URI,
});

init(AMPLITUDE_ID, undefined, {
  flushQueueSize: 50,
  flushIntervalMillis: 20000,
});

AppRegistry.registerComponent(appName, () => App);
