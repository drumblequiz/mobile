import React, { Component } from 'react';
import { Platform, AppRegistry, Button, View, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { languageChanged } from '../actions/LanguageChangeAction.js';
import ltLang from '../language/lithuanian.json';
import enLang from '../language/english.json';

if (Platform.OS === 'android') {SafeAreaView.setStatusBarHeight(0);}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#f4511e',
      elevation: 0,
    },
  };

  onSelectLanguage(language) {
    this.props.languageChanged(language);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="lithuanian"
          onPress={() => this.onSelectLanguage(ltLang)}
        />
        <Button
          title="english"
          onPress={() => this.onSelectLanguage(enLang)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ });

export default connect(mapStateToProps, {
  languageChanged,
})(DetailsScreen);
