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
    console.log(this.props.socket.answerChosen)
    console.log(this.props.socket.correctAnswArr)
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
          NavigationActions.navigate({ routeName: 'Disconnect' })
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
      <SafeAreaView style={{flex:1, flexDirection: 'column', justifyContent:'center', backgroundColor: '#4FAFFF'}}>
        { this.isCorrect() ?
        <View style={{ flex:1, alignItems :'center', justifyContent:'center', backgroundColor: '#77f442'}}>
          <Text style={[{fontSize: 45, fontWeight: 'bold', textAlign: 'center', width:300, height: 150}]}>{lang.correct}</Text>
        </View> :
        <View style={{ flex:1, alignItems :'center', justifyContent:'center', backgroundColor: '#ff0000'}}>
          <Text style={[{fontSize: 45, fontWeight: 'bold', textAlign: 'center', width:300, height: 150}]}>{lang.incorrect}</Text>
        </View>}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket };
};

export default connect(mapStateToProps, {showScoreStatusChanged, correctAnswerReceivedChanged, getCorrectAnswer, getPlayerRanking, })(TruthScreen);
