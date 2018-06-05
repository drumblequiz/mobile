import React from 'react';
import { addNavigationHelpers, createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';

import Home from '../screens/HomeScreen.js';
import Options from '../screens/OptionsScreen.js';
import Join from '../screens/JoinScreen.js';
import WaitingGame from '../screens/WaitingGameScreen.js';

export const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Options: { screen: Options },
  Join: {screen: Join},
  WaitingGame: {screen: WaitingGame},
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
