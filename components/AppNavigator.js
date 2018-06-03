import React from 'react';
import { addNavigationHelpers, createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';

import Home from '../screens/HomeScreen.js';
import Options from '../screens/OptionsScreen.js';

export const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Options: { screen: Options },
},
{
  initialRouteName: 'Home',
  cardStyle: {
    backgroundColor : "#455A64",
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
