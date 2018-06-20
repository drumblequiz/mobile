import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {logIn, roomJoinedChanged, registerStatusChanged} from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  static navigationOptions = {
      title: 'Login',
      header: null,
  };

  selectedLanguage() {
    return this.props.language.language;
  }

  checkProploggedIn() {
    return this.props.socket.loggedIn;
  }

  handleNoHashClick() {
    this.props.registerStatusChanged("inactive");
    this.props.navigation.navigate('Register');
  }

  handleLogInClick() {
    this.props.logIn(this.state.text)
  }

  shouldComponentUpdate(){
    if(this.checkProploggedIn()){
      this.props.roomJoinedChanged(false);
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Join' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
      return false;
    }
    return true;
  }

  render() {
    const lang = this.selectedLanguage();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{flex:10, alignItems :'center', justifyContent:'center'}}>
          <Image
            width={300}
            source={require('../images/DrumbleQuizLogo.png')}
          />
          <Text style={[{width:300, height: 20}]}>{lang.loginHash}</Text>
          <TextInput
            style={[styleGeneral.roomId, {width:300, height: 40}]}
            defaultValue=''
            autoCapitalize={'characters'}
            underlineColorAndroid='transparent'
            maxLength={100}
            placeholderTextColor='black'
            selectionColor='black'
            marginBottom={10}
            onChangeText={(text) => this.setState({text})}
          />
          <TouchableNativeFeedback
            onPress={() => this.handleLogInClick()}>
            <View marginBottom={10} style={[styleGeneral.joinButton, {width:300, height: 40}]}>
              <Text style={{fontWeight: 'bold', color:"white", textAlign: 'center'}}>{lang.loginButton}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => this.handleNoHashClick()}>
            <View style={[styleGeneral.joinButton, {width:300, height: 40}]}>
              <Text style={{fontWeight: 'bold', color:"white", textAlign: 'center'}}>{lang.noHashCodeButton}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end'}}>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.navigate('Options')}>
            <View style={[{height: 60, width:60}]}>
              <Image
                width={50}
                source={require('../images/options.png')}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
  return { language: state.language, socket: state.socket };
};

export default connect(mapStateToProps, {logIn,roomJoinedChanged, registerStatusChanged })(LoginScreen);
