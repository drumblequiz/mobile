import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {register, showErrorChanged} from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  static navigationOptions = {
      title: 'Login',
      header: null,
  };

  handleRegisterClick() {
    this.props.register(this.state.text);
  }

  checkPropRegisterStatus() {
    return this.props.socket.registerStatus;
  }

  selectedLanguage() {
    return this.props.language.language;
  }

  selectedTheme() {
    return this.props.theme;
  }

  shouldComponentUpdate(){
    if(this.props.socket.disconnected)
    {
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if(this.checkPropRegisterStatus() == 'ok'){
      this.props.showErrorChanged(false);
      this.props.navigation.navigate('Login');
      return false;
    }
    return true;
  }

  getError()
  {
    if (this.props.socket.showError)
    {
        return this.props.socket.errorMsg;
    }
    else
    {
      return "";
    }
  }

  render() {
    const lang = this.selectedLanguage();
    const theme = this.selectedTheme();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{flex:10, alignItems :'center', justifyContent:'center'}}>
          <Image
            width={300}
            source={require('../images/DrumbleQuizLogo.png')}
          />
          <Text style={[{width:300, height: 20}]}>{this.getError()}</Text>
          <Text style={[{width:300, height: 20}]}>{lang.registerLabel}</Text>
          <TextInput
            style={[styleGeneral.roomId, {width:300, height: 40}, theme.theme.element, theme.theme.textElement]}
            defaultValue=''
            autoCapitalize={'characters'}
            underlineColorAndroid='transparent'
            maxLength={100}
            marginBottom={10}
            onChangeText={(text) => this.setState({text})}
          />
          <TouchableNativeFeedback
            onPress={() => this.handleRegisterClick()}>
            <View style={[styleGeneral.joinButton, {width:300, height: 40}, theme.theme.element]}>
              <Text style={[{fontWeight: 'bold', color:"white", textAlign: 'center'}, theme.theme.textElement]}>{lang.registerButton}</Text>
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
  return { language: state.language, socket: state.socket, theme: state.theme };
};

export default connect(mapStateToProps, {register, showErrorChanged})(RegisterScreen);
