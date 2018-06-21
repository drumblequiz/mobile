import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { joinRoom, roomJoinedChanged, gameStartedChanged, backToHomeChanged, roomIdChanged, roomExistsChanged,showErrorChanged} from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class JoinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
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

  checkPropRoomJoinedStatus() {
    return this.props.socket.roomJoinedStatus;
  }

  handleNameEnterClick() {
    this.props.joinRoom(this.props.socket.roomId,this.props.socket.userId ,this.state.text)
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
    if(this.props.socket.roomJoinedStatus){
      this.props.gameStartedChanged(false);
      this.props.roomJoinedChanged(false);
      this.props.showErrorChanged(false);
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'WaitingGame' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if (this.props.socket.backToHome)
    {
        this.props.backToHomeChanged(false);
        this.props.roomIdChanged("");
        this.props.roomExistsChanged(false);
        this.props.showErrorChanged(false);
        const resetAction = StackActions.reset({
          index: 0, actions: [
            NavigationActions.navigate({ routeName: 'Home' })
          ],
        });
        this.props.navigation.dispatch(resetAction);
    }
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
          <Text style={[{width:300, height: 20}]}>{lang.displayName}</Text>
          <TextInput
            style={[styleGeneral.roomId, {width:300, height: 40}, theme.theme.element, theme.theme.textElement]}
            defaultValue=''
            autoCapitalize={'characters'}
            underlineColorAndroid='transparent'
            maxLength={10}
            marginBottom={10}
            onChangeText={(text) => this.setState({text})}
          />
          <TouchableNativeFeedback
            onPress={() => this.handleNameEnterClick()}>
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

export default connect(mapStateToProps, {joinRoom,roomJoinedChanged, gameStartedChanged, backToHomeChanged, roomIdChanged, roomExistsChanged, showErrorChanged, })(JoinScreen);
