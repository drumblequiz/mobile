export const themeChanged = (theme) => {
  return {
    type: 'THEME_CHANGED',
    payload: {theme}
  };
};
