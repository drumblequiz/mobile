import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {roomIdChanged, roomExistsChanged} from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class ScoreScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
      title: 'Home',
      header: null,
  };

  selectedLanguage() {
    return this.props.language.language;
  }

  selectedTheme() {
    return this.props.theme;
  }

  handleGoBackClick() {
      this.props.roomIdChanged("");
      this.props.roomExistsChanged(false);
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
  }

  render() {
    const lang = this.selectedLanguage();
    const theme = this.selectedTheme();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{ alignItems :'center', justifyContent:'center'}}>
          <Text style={[{fontSize: 40, fontWeight: 'bold', textAlign: 'center', }]}>{lang.scoreLabel}</Text>
          <Text style={[{fontSize: 40, fontWeight: 'bold', textAlign: 'center', width:300, height: 80}]}>10</Text>
          <TouchableNativeFeedback
            onPress={() => this.handleGoBackClick()}>
            <View style={[styleGeneral.joinButton, {width:300, height: 40}, theme.theme.element]}>
              <Text style={[{fontWeight: 'bold', color:"white", textAlign: 'center'}, theme.theme.textElement]}>{lang.goBackButton}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket, theme: state.theme };
};

export default connect(mapStateToProps, {roomIdChanged, roomExistsChanged, })(ScoreScreen);
