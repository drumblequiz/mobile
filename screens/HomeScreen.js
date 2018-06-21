import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {doesRoomExist, roomJoinedChanged, roomExistsChanged, showErrorChanged} from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  shouldComponentUpdate()
  {
    if(this.props.socket.disconnected)
    {
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Disconnect' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if (this.checkPropRoomExists())
    {
      this.props.roomExistsChanged(false);
      if (this.checkPropRoomAnnonymous())
      {
        this.props.roomJoinedChanged(false);
        this.props.showErrorChanged(false);
        const resetAction = StackActions.reset({
          index: 0, actions: [
            NavigationActions.navigate({ routeName: 'Join' })
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
      else
      {
        if (this.checkPropIsLoggedIn())
        {
          this.props.roomJoinedChanged(false);
          this.props.showErrorChanged(false);
          const resetAction = StackActions.reset({
            index: 0, actions: [
              NavigationActions.navigate({ routeName: 'Join' })
            ],
          });
          this.props.navigation.dispatch(resetAction);
        }
        else
        {
          this.props.showErrorChanged(false);
          const resetAction = StackActions.reset({
            index: 0, actions: [
              NavigationActions.navigate({ routeName: 'Login' })
            ],
          });
          this.props.navigation.dispatch(resetAction);
        }
      }
      return false
    }
    else
    {
      return true;
    }
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

  checkPropRoomExists() {
    return this.props.socket.roomExists;
  }

  checkPropRoomAnnonymous() {
    return this.props.socket.annonymous;
  }

  checkPropIsLoggedIn() {
    return this.props.socket.loggedIn;
  }

  handleRoomJoinClick() {
    this.props.doesRoomExist(this.state.text)
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
          <Text style={[{width:300, height: 20}]}>{lang.roomId}</Text>
          <Text style={[{width:300, height: 20}]}>{this.getError()}</Text>
          <TextInput
            style={[styleGeneral.roomId, {width:300, height: 40}, theme.theme.element, theme.theme.textElement]}
            underlineColorAndroid='transparent'
            maxLength={10}
            marginBottom={10}
            onChangeText={(text) => this.setState({text})}
          />
          <TouchableNativeFeedback
            onPress={() => this.handleRoomJoinClick()}>
            <View style={[styleGeneral.joinButton, {width:300, height: 40}, theme.theme.element]}>
              <Text style={[{fontWeight: 'bold', color:"white", textAlign: 'center'}, theme.theme.textElement]}>{lang.joinButton}</Text>
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

export default connect(mapStateToProps, {doesRoomExist, roomJoinedChanged, roomExistsChanged, showErrorChanged})(HomeScreen);
