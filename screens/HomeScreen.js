import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {doesRoomExist} from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  shouldComponentUpdate()
  {
    if (this.checkPropRoomExists())
    {
      if (this.checkPropRoomAnnonymous())
      {
        this.props.socket.roomJoinedStatus = false;
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
          this.props.socket.roomJoinedStatus = false;
          const resetAction = StackActions.reset({
            index: 0, actions: [
              NavigationActions.navigate({ routeName: 'Join' })
            ],
          });
          this.props.navigation.dispatch(resetAction);
        }
        else
        {
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

  render() {
    const lang = this.selectedLanguage();
    console.log(lang);
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{flex:10, alignItems :'center', justifyContent:'center'}}>
          <Image
            width={300}
            source={require('../images/DrumbleQuizLogo.png')}
          />
          <Text style={[{width:300, height: 20}]}>{lang.roomId}</Text>
          <TextInput
            style={[styleGeneral.roomId, {width:300, height: 40}]}
            defaultValue=''
            autoCapitalize={'characters'}
            underlineColorAndroid='transparent'
            maxLength={10}
            placeholderTextColor='black'
            selectionColor='black'
            marginBottom={10}
            onChangeText={(text) => this.setState({text})}
          />
          <TouchableNativeFeedback
            onPress={() => this.handleRoomJoinClick()}>
            <View style={[styleGeneral.joinButton, {width:300, height: 40}]}>
              <Text style={{fontWeight: 'bold', color:"white", textAlign: 'center'}}>{lang.joinButton}</Text>
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

export default connect(mapStateToProps, {doesRoomExist, })(HomeScreen);
