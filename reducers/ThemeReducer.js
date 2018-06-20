import darkUI from '../styles/darkUI.js';
import lightUI from '../styles/lightUI.js';

const initialState = {
  theme: lightUI,
  themeName: 'Light UI'
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THEME_CHANGED':
      if(action.payload.theme === darkUI){
        name = 'Dark UI'
      }
      if(action.payload.theme === lightUI){
        name = 'Light UI'
      }
      return { ...state, theme: action.payload.theme, themeName: name };
    default:
      return state;
  }
};

export default ThemeReducer;
