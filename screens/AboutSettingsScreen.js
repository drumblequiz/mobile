import React, { Component } from 'react';
import { Platform, AppRegistry, TouchableOpacity, View, StatusBar, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

if (Platform.OS === 'android') {SafeAreaView.setStatusBarHeight(0);}

class AboutSettingsScreen extends React.Component {

  static navigationOptions  = ({ navigation }) => ({
    title: 'About',
    headerStyle: {
      backgroundColor: '#EFEFEF',
      elevation: 0,
      borderStyle: 'solid',
      borderBottomWidth: 0.4,
      borderColor: '#BBBBBB',
    },
    headerTitleStyle: {
      fontWeight: 'normal',
      color: '#222222',
    },
  });

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.4,
          backgroundColor: "#CED0CE",
          marginLeft: 30
        }}
      />
    );
  };

  handleSettingClick(key) {
    this.props.navigation.navigate(key);
  }

  selectedLanguage() {
    return this.props.language.language;
  }

  render() {
    const lang = this.selectedLanguage();
    return (
      <SafeAreaView style={{ backgroundColor: '#EFEFEF',flex:1, flexDirection: 'column'}}>
        <View marginTop={7} style={[{borderStyle: 'solid', borderTopWidth: 0.4, borderBottomWidth: 0.4, borderColor: '#BBBBBB',backgroundColor: '#FFFFFF'}]}>
          <Text style={{fontSize: 18, padding: 30,}}>{lang.aboutText}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language};
};

export default connect(mapStateToProps)(AboutSettingsScreen);
