import { combineReducers } from 'redux';
import NavReducer from './NavReducer';
import LanguageReducer from './LanguageReducer';

const AppReducer = combineReducers({
  language: LanguageReducer,
  nav: NavReducer,
});

export default AppReducer;
