import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {nextQuestionChanged} from '../actions/network.js';


import styleGeneral from '../styles/general.js';

class WaitingAnswerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.myInterval = setInterval(() => {
      if (this.props.socket.timer <= 0) {
        clearInterval(this.myInterval);
        this.props.nextQuestionChanged(false);
        const resetAction = StackActions.reset({
          index: 0, actions: [
            NavigationActions.navigate({ routeName: 'Truth', params: { transition: 'zoom' } })
          ],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        this.props.socket.timer = this.props.socket.timer-1;
        this.forceUpdate();
      }
    }, 1000)

  }

  static navigationOptions = {
      title: 'Home',
      header: null,
  };

  selectedLanguage() {
    return this.props.language.language;
  }

  render() {
    if(this.props.socket.disconnected)
    {
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    const lang = this.selectedLanguage();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{flex:8, alignItems :'center', justifyContent:'center'}}>
          <Text style={[{fontSize: 40, fontWeight: 'bold', textAlign: 'center', width:300, height: 120}]}>{lang.waitingForAnswer}</Text>
          <Image
            width={80}
            source={require('../images/loading.gif')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket };
};

export default connect(mapStateToProps, {nextQuestionChanged, })(WaitingAnswerScreen);
