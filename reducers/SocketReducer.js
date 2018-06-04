
const initialState = {
  language: enLang,
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
