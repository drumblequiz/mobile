import React from 'react';
import { addNavigationHelpers, createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
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
},
{
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
