export const languageChanged = (language) => {
  return {
    type: 'LANGUAGE_CHANGED',
    payload: {language}
  };
};
