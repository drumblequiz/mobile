import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {doesRoomExist} from '../actions/network.js';

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

  doesRoomExistt() {
    return this.props.socket.roomExists;
  }

  shouldComponentUpdate(){
    if(this.doesRoomExistt()){
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
      return false;
    }
    return true;
  }

  render() {
    const lang = this.selectedLanguage();
    const exists = this.doesRoomExistt();
    console.log(exists);
    if(exists){
      someText='gavom'
    } else {
      someText='negavom'
    }
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{flex:8, alignItems :'center', justifyContent:'center'}}>
          <Text style={[{width:300, height: 20}]}>{lang.displayName}</Text>
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
            onPress={() => this.props.doesRoomExist('ABCD')}>
            <View style={[styleGeneral.joinButton, {width:300, height: 40}]}>
              <Text style={{fontWeight: 'bold', color:"white", textAlign: 'center'}}>{someText}</Text>
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

export default connect(mapStateToProps, {doesRoomExist, })(JoinScreen);
