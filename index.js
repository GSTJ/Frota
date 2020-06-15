import '~config';
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import App from './App';
import { name as appName } from './app.json';

const config = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

if (__DEV__) {
  AppRegistry.registerComponent(appName, () => App);
} else {
  AppRegistry.registerComponent(appName, () => codePush(config)(App));
}
