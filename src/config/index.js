/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
import 'react-native-gesture-handler';
import 'moment/locale/pt-br';
// import React from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';
import { setCustomText } from 'react-native-global-props';
import { enableScreens } from 'react-native-screens';
import ReactNative, { YellowBox } from 'react-native';
import Config from 'react-native-config';
import { enableES5 } from 'immer';
import Geocoder from 'react-native-geocoder-reborn';

if (__DEV__) {
  ReactNative.unstable_enableLogBox();

  YellowBox.ignoreWarnings([
    // Styled-components error
    'Failed prop type: Invalid props.style key `borderStyle` supplied to `Image`.',
    // Metro bundler error
    `Require cycle: node_modules\\react-native\\Libraries\\Network\\fetch.js`,
    // React-native-picker-select
    'Picker has been extracted from react-native',
  ]);
}

Geocoder.fallbackToGoogle(Config.GOOGLE_API_KEY);

// Optimizes navigation
enableScreens();

GoogleSignin.configure();

enableES5();

setCustomText({
  style: {
    fontFamily: 'CeraPro-Regular',
  },
});

// Why did you re-render configuration
// Useful for performance optimizations

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   const ReactRedux = require('react-redux');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     trackExtraHooks: [[ReactRedux, 'useSelector']],
//   });
// }

// Network configuration
// Used to show the App requests on the Chrome Network Debugger
global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest;
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData;

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false;
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader;
}
