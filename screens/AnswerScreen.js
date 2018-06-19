import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';

import styleGeneral from '../styles/general.js';

class AnswerScreen extends React.Component {
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

  render() {
    const lang = this.selectedLanguage();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{ flex:3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',}}>
          <Image width={80} source={require('../images/clock.png')}/>
          <Text style={[{fontSize: 70, fontWeight: 'bold', textAlign: 'center'}]}>30</Text>
        </View>
        <View style={{flex:5, alignItems :'center', justifyContent:'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',}}>
          <TouchableOpacity onPress={() => this.handleLogInClick()}>
            <View marginTop={5} marginBottom={5} marginRight={5} marginLeft={5} style={[styleGeneral.joinButton, {width:140, height: 140}]}>
              <Image width={120} source={require('../images/lion.png')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleLogInClick()}>
            <View marginTop={5} marginBottom={5} marginRight={5} marginLeft={5} style={[styleGeneral.joinButton, {width:140, height: 140}]}>
              <Image width={120} source={require('../images/crocodile.png')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleLogInClick()}>
            <View marginTop={5} marginBottom={5} marginRight={5} marginLeft={5} style={[styleGeneral.joinButton, {width:140, height: 140}]}>
              <Image width={120} source={require('../images/flamingo.png')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleLogInClick()}>
            <View marginTop={5} marginBottom={5} marginRight={5} marginLeft={5} style={[styleGeneral.joinButton, {width:140, height: 140}]}>
              <Image width={120} source={require('../images/elephant.png')}/>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket };
};

export default connect(mapStateToProps)(AnswerScreen);
