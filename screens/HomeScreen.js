import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import Image from 'react-native-scalable-image';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import style_general from '../styles/general.js';

class HomeScreen extends React.Component {
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
          <TextInput
            style={[style_general.roomId, {width:300, height: 40}]}
            placeholder={lang.roomId}
            underlineColorAndroid='transparent'
            maxLength={10}
            placeholderTextColor='black'
            selectionColor='black'
            marginBottom={10}
            onChangeText={(text) => this.setState({text})}
          />
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.navigate('Options')}>
            <View style={[style_general.joinButton, {width:300, height: 40}]}>
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
  return { language: state.language };
};

export default connect(mapStateToProps)(HomeScreen);
