import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import LanguageReducer from './LanguageReducer';
import SocketReducer from './SocketReducer';
import ThemeReducer from './ThemeReducer';

const AppReducer = combineReducers({
  language: LanguageReducer,
  nav: NavReducer,
  socket: SocketReducer,
  theme: ThemeReducer,
});

export default AppReducer;
