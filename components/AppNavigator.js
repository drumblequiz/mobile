import React from 'react';
import { addNavigationHelpers, createStackNavigator } from 'react-navigation';
import { Platform, StatusBar, Animated, Easing } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';

import Home from '../screens/HomeScreen.js';
import Options from '../screens/OptionsScreen.js';
import Join from '../screens/JoinScreen.js';
import WaitingGame from '../screens/WaitingGameScreen.js';
import Login from '../screens/LoginScreen.js';
import Register from '../screens/RegisterScreen.js';
import Score from '../screens/ScoreScreen.js';
import WaitingAnswer from '../screens/WaitingAnswerScreen.js';
import Answer from '../screens/AnswerScreen.js';
import Truth from '../screens/TruthScreen.js';
import LanguageSettings from '../screens/LanguageSettingsScreen.js';
import AboutSettings from '../screens/AboutSettingsScreen.js';
import ThemeSettings from '../screens/ThemeSettingsScreen.js';

sideTransition = (index, position, initWidth, right) => {
  const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [right*initWidth, 0, 0],
    });

    const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

    return {opacity, transform: [{ translateX }]};
};

fadeIn = (index, position) => {
      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      });

      return { opacity };
};

flipY = (index, position) => {
    const rotateY = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: ['180deg', '0deg'],
    });

    return { transform: [{ rotateY }], backfaceVisibility: 'hidden' };
};

zoom = (index, position) => {
  const scale = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [10, 1],
  });

  return { transform: [{ scale }] };
};

TransitionConfiguration = () => {
  return {
    screenInterpolator: ({ layout, position, scene }) => {

      const {index, route} = scene;
      const { initWidth } = layout;
      const params = route.params || {};
      const transition = params.transition || 'default';

      return {
          fade: fadeIn(index, position),
          left: sideTransition(index, position, initWidth, -1),
          right: sideTransition(index, position, initWidth, 1),
          flip: flipY(index, position),
          zoom: zoom(index, position),
          default: fadeIn(index, position),
      }[transition];
    }
  }
};

export const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Options: { screen: Options },
  Join: {screen: Join},
  WaitingGame: {screen: WaitingGame},
  Login: {screen: Login},
  Register: {screen: Register},
  Score: {screen: Score},
  WaitingAnswer: {screen: WaitingAnswer},
  Answer: {screen: Answer},
  Truth: {screen: Truth},
  LanguageSettings: {screen: LanguageSettings},
  AboutSettings: {screen: AboutSettings},
  ThemeSettings: {screen: ThemeSettings},
},
{
  transitionConfig: TransitionConfiguration,
  initialRouteName: 'Home',
  cardStyle: {
    backgroundColor : '#212121',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator />
);

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
