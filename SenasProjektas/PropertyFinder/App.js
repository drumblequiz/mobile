/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {};
// // export default class App extends Component<Props> {
// class SearchPage extends Component<{}> {
//   static navigationOptions = {
//   title: 'Property Finder',
// };
//   render() {
//     // return React.createElement(Text, {style: styles.description}, "Search for houses to buy!");
//     return <Text style={styles.description}>Search for houses to buy!</Text>;
//   }
// }

const App = StackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
});
export default App;

// const styles = StyleSheet.create({
//   description: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: '#656565',
//     marginTop: 65,
//   },
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
