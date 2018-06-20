import React, { Component } from 'react';
import { Platform, AppRegistry, TouchableOpacity, View, StatusBar, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

if (Platform.OS === 'android') {SafeAreaView.setStatusBarHeight(0);}

class OptionsScreen extends React.Component {

  static navigationOptions  = ({ navigation }) => ({
    title: 'Settings',
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
        <View>
          <FlatList marginTop={7} style={[{borderStyle: 'solid', borderTopWidth: 0.4, borderBottomWidth: 0.4, borderColor: '#BBBBBB',}]}
            data={[ {key: 'AboutSettings', text: lang.about},
                    {key: 'LanguageSettings', text: lang.language, selection: lang.languageName},
                    {key: 'ThemeSettings', text: lang.interfaceTheme, selection: 'Dark UI'}]}

            renderItem={({item}) =>
              <TouchableOpacity  onPress={() => this.handleSettingClick(item.key)}>
                <View style={[{flexDirection:'row',}]}>
                  <View style={[{flex: 10, padding: 30, justifyContent:'center', backgroundColor: '#FFFFFF', height: 60}]}>
                    <Text style={{fontSize: 17}}>{item.text}</Text>
                  </View>
                  <View style={[{flex: 4, padding: 30, alignItems:'flex-end', justifyContent:'center', backgroundColor: '#FFFFFF', height: 60}]}>
                    <Text style={{fontSize: 12, color: '#555555'}}>{item.selection}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }

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

export default connect(mapStateToProps)(OptionsScreen);
