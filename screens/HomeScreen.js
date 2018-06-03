import React, { Component } from 'react';
import { AppRegistry, Dimensions, Button} from 'react-native';
import Image from 'react-native-scalable-image';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
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
      <SafeAreaView style={{ backgroundColor: '#6a51ae', flex:1}}>
        <Image
          backgroundColor="#CFD8DC"
          width={Dimensions.get('window').width}
          source={require('../images/DrumbleQuizLogo.png')}
        />
        <Button
          title={lang.buttonName}
          onPress={() => this.props.navigation.navigate('Options')}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language };
};

export default connect(mapStateToProps)(HomeScreen);
