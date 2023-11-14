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

// import('./reactotron.config').then(() => {
//   console.log('Reactotron Configured');
// });

// require('axios-debug-log')({
//   request: function (debug, config) {
//     debug('Request with ' + config.headers['content-type']);
//   },
//   response: function (debug, response) {
//     debug(
//       'Response with ' + response.headers['content-type'],
//       'from ' + response.config.url,
//     );
//   },
//   error: function (debug, error) {
//     // Read https://www.npmjs.com/package/axios#handling-errors for more info
//     debug('Boom', error);
//   },
// });

AppRegistry.registerComponent(appName, () => App);
