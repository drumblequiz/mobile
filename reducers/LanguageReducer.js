import ltLang from '../language/lithuanian.json';
import enLang from '../language/english.json';

const initialState = {
  language: ltLang,
};

const LanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LANGUAGE_CHANGED':
      return { ...state, language: action.payload.language };
    default:
      return state;
  }
};

export default LanguageReducer;
