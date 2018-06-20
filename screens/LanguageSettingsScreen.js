import React, { Component } from 'react';
import { Platform, AppRegistry, TouchableOpacity, View, StatusBar, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { languageChanged } from '../actions/LanguageChangeAction.js';
import ltLang from '../language/lithuanian.json';
import enLang from '../language/english.json';

if (Platform.OS === 'android') {SafeAreaView.setStatusBarHeight(0);}

class LanguageSettingsScreen extends React.Component {

  state = {
    selected: this.props.language.language.languageName
  }

  static navigationOptions  = ({ navigation }) => ({
    title: 'Language',
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

  onSelectLanguage(key, language) {
    this.setState(state => {
        return { selected: key };
      });
    this.props.languageChanged(language);
  }

  selectedLanguage() {
    return this.props.language.language;
  }

  renderRow = (item) => {
    const isSelectedUser = this.state.selected === item.key;
    console.log(isSelectedUser)
    console.log(this.state.selected)
    console.log(item.key)
    return (
    <TouchableOpacity style={[{flexDirection:'row',}]} onPress={() => this.onSelectLanguage(item.key, item.language)}>
      <View style={[{flex: 10, padding: 30, justifyContent:'center',backgroundColor: '#FFFFFF',height: 60}]}>
        {isSelectedUser ?
          <Text style={{fontSize: 17, color:"#49A9FF"}}>{item.text}</Text>
          : <Text style={{fontSize: 17}}>{item.text}</Text>
        }

      </View>
    </TouchableOpacity>
    );
  }

  render() {
    const lang = this.selectedLanguage();
    return (
      <SafeAreaView style={{ backgroundColor: '#EFEFEF',flex:1, flexDirection: 'column'}}>
        <View>
          <FlatList marginTop={7} style={[{borderStyle: 'solid', borderTopWidth: 0.4, borderBottomWidth: 0.4, borderColor: '#BBBBBB',}]}
            data={[ {key: 'English', text: lang.english, language: enLang},
                    {key: 'Lietuvių', text: lang.lithuanian, language: ltLang}]}

            renderItem={({ item }) => (
              this.renderRow(item)
            )}

            extraData={this.state}

            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language};
};

export default connect(mapStateToProps, {
  languageChanged,
})(LanguageSettingsScreen);
