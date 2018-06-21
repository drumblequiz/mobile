import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {showScoreStatusChanged, correctAnswerReceivedChanged, getCorrectAnswer, getPlayerRanking} from '../actions/network.js';



import styleGeneral from '../styles/general.js';

class TruthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.getCorrectAnswer(this.props.socket.answers[0].QuestionInstanceId);
    this.props.getPlayerRanking();
  }

  static navigationOptions = {
      title: 'Home',
      header: null,
  };

  isCorrect()
  {
      if (this.props.socket.answerChosen in this.props.socket.correctAnswArr)
      {
          return true;
      }
      else
      {
          return false;
      }
  }

  selectedLanguage() {
    return this.props.language.language;
  }

  handleGoBackClick() {

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
    if(this.props.socket.nextQuestion){
      this.props.correctAnswerReceivedChanged(false);
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Answer' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if(this.props.socket.showScoreStatus == "ok"){
      this.props.showScoreStatusChanged("inactive");
      this.props.correctAnswerReceivedChanged(false);
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Score' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    const lang = this.selectedLanguage();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{ alignItems :'center', justifyContent:'center'}}>
          <Text style={[{fontSize: 45, fontWeight: 'bold', textAlign: 'center', width:300, height: 150}]}>Maybe you were correct</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket };
};

export default connect(mapStateToProps, {showScoreStatusChanged, correctAnswerReceivedChanged, getCorrectAnswer, getPlayerRanking, })(TruthScreen);
