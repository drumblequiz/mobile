import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { select, nextQuestionChanged } from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class AnswerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.socket.timer = Math.floor((new Date(this.props.socket.answers[0].endtime).getTime() - new Date(this.props.socket.serverTime).getTime())/1000);
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

  selectedTheme() {
    return this.props.theme;
  }

  handleChoiceClick(numb)
  {
    clearInterval(this.myInterval);
    //this.props.socket.answers.sort((a, b) => a.AnswerId < b.AnswerId);
    this.props.select(this.props.socket.answers[numb]);
    const resetAction = StackActions.reset({
      index: 0, actions: [
        NavigationActions.navigate({ routeName: 'WaitingAnswer', params: { transition: 'zoom' } })
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  getTimer()
  {
    return this.props.socket.timer;
  }

  render() {
    const lang = this.selectedLanguage();
    const theme = this.selectedTheme();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{ flex:3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',}}>
          <Image width={80} source={require('../images/clock.png')}/>
          <Text style={[{fontSize: 70, fontWeight: 'bold', textAlign: 'center'}]}>{this.getTimer()}</Text>
        </View>
        <View style={{flex:5, alignItems :'center', justifyContent:'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',}}>
          <TouchableOpacity style={[{width:140, height: 140}]} onPress={() => this.handleChoiceClick(0)}>
            <View marginTop={'3%'} marginBottom={'3%'} marginRight={'3%'} marginLeft={'3%'} style={[{width:'94%', height:'94%'}, theme.theme.playButton]}>
              <Image width={120} source={require('../images/elephant.png')}/>
              <Text>{this.props.socket.answers[0].Answer}</Text>
            </View>
          </TouchableOpacity>
          { this.props.socket.answers.length > 1 ?
          <TouchableOpacity style={[{width:140, height: 140}]} onPress={() => this.handleChoiceClick(1)}>
            <View marginTop={'3%'} marginBottom={'3%'} marginRight={'3%'} marginLeft={'3%'} style={[{width:'94%', height:'94%'}, theme.theme.playButton]}>
              <Image width={120} source={require('../images/lion.png')}/>
              <Text>{this.props.socket.answers[1].Answer}</Text>
            </View>
          </TouchableOpacity>
          :<TouchableOpacity/>}
          {this.props.socket.answers.length > 2 ?
          <TouchableOpacity style={[{width:140, height: 140}]} onPress={() => this.handleChoiceClick(2)}>
            <View marginTop={'3%'} marginBottom={'3%'} marginRight={'3%'} marginLeft={'3%'} style={[{width:'94%', height:'94%'}, theme.theme.playButton]}>
              <Image width={120} source={require('../images/crocodile.png')}/>
              <Text>{this.props.socket.answers[2].Answer}</Text>
            </View>
          </TouchableOpacity>
          :<TouchableOpacity/>}
          {this.props.socket.answers.length > 3 ?
          <TouchableOpacity style={[{width:140, height: 140}]} onPress={() => this.handleChoiceClick(3)}>
            <View marginTop={'3%'} marginBottom={'3%'} marginRight={'3%'} marginLeft={'3%'} style={[{width:'94%', height:'94%'}, theme.theme.playButton]}>
              <Image width={120} source={require('../images/flamingo.png')}/>
              <Text>{this.props.socket.answers[3].Answer}</Text>
            </View>
          </TouchableOpacity>
          :<TouchableOpacity/>}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket, theme: state.theme };
};

export default connect(mapStateToProps, {select, nextQuestionChanged, })(AnswerScreen);
