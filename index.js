/**
 * @format
 */

import 'react-native-gesture-handler';
// Reanimated is removed; provide no-op globals so NativeWind doesn't explode.
global._WORKLET = false;
global.__reanimatedWorkletInit = global.__reanimatedWorkletInit || (() => { });
global.runOnUI = global.runOnUI || ((cb) => cb());

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
