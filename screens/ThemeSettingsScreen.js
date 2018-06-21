import React, { Component } from 'react';
import { Platform, AppRegistry, TouchableOpacity, View, StatusBar, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { themeChanged } from '../actions/ThemeChangeAction.js';
import darkUI from '../styles/darkUI.js';
import lightUI from '../styles/lightUI.js';

if (Platform.OS === 'android') {SafeAreaView.setStatusBarHeight(0);}

class ThemeSettingsScreen extends React.Component {

  state = {
    selected: this.props.theme.themeName
  }

  static navigationOptions  = ({ navigation }) => ({
    title: 'Theme',
    headerStyle: {
      backgroundColor: '#4FAFFF',
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

  onSelectTheme(key, theme) {
    this.setState(state => {
        return { selected: key };
      });
    this.props.themeChanged(theme);
  }

  selectedLanguage() {
    return this.props.language.language;
  }

  selectedTheme() {
    return this.props.theme;
  }

  renderRow = (item) => {
    const isSelectedUser = this.state.selected === item.key;
    const theme = this.selectedTheme();
    return (
    <TouchableOpacity style={[{flexDirection:'row',}]} onPress={() => this.onSelectTheme(item.key, item.theme)}>
      <View style={[{flex: 10, padding: 30, justifyContent:'center',backgroundColor: '#FFFFFF',height: 60},  theme.theme.element]}>
        {isSelectedUser ?
          <Text style={[{fontSize: 17, color:"#49A9FF"},  theme.theme.textHighlight]}>{item.text}</Text>
          : <Text style={[{fontSize: 17}, theme.theme.textElement]}>{item.text}</Text>
        }

      </View>
    </TouchableOpacity>
    );
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
    const lang = this.selectedLanguage();
    const theme = this.selectedTheme();
    return (
      <SafeAreaView style={[{ backgroundColor: '#EFEFEF', flex:1, flexDirection: 'column'}, theme.theme.backgroundView]}>
        <View>
          <FlatList marginTop={7} style={[{borderStyle: 'solid', borderTopWidth: 0.4, borderBottomWidth: 0.4, borderColor: '#BBBBBB',}]}
            data={[ {key: 'Light UI', text: 'Light UI', theme: lightUI},
                    {key: 'Dark UI', text: 'Dark UI', theme: darkUI},
                    ]}

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
  return { language: state.language, socket: state.socket, theme: state.theme};
};

export default connect(mapStateToProps, {
  themeChanged,
})(ThemeSettingsScreen);
