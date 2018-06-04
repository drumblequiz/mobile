import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import LanguageReducer from './LanguageReducer';
import SocketReducer from './SocketReducer';

const AppReducer = combineReducers({
  language: LanguageReducer,
  nav: NavReducer,
  socket: SocketReducer,
});

export default AppReducer;
