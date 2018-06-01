// Ignores warning because react-navigation has some depricated dependancies
// https://github.com/react-navigation/react-navigation/issues/3956
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('PropertyFinder', () => App);
