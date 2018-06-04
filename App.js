import React from 'react';
import { YellowBox, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { init as websocketInit, emit } from './actions/websockets';

import AppReducer from './reducers/AppReducer';
import AppWithNavigationState from './components/AppNavigator';

YellowBox.ignoreWarnings(['Setting a timer']);

export default class ReduxExampleApp extends React.Component {
  constructor (props) {
    super(props);
    middleware = [ thunk.withExtraArgument({ emit }) ];
    this.store = createStore(AppReducer, applyMiddleware(...middleware));
    websocketInit(this.store);
  }


  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
