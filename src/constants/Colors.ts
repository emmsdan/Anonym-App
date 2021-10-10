const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const primary = "#2ECC71";
const warning = "#F7FF33";
const warning2 = "#FFC300";
const colors = {
  light: {
    text: "#17202A",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    primary,
    warning,
    warning2,
  },
  dark: {
    text: "#fff",
    background: "#17202A",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    primary,
    warning,
    warning2,
  },
  white: "#fff",
  black: "#17202A",
  error: "#FF5733",
};
const isDark = true;
export default {
  ...colors,
  ...(isDark ? colors.dark : colors.light),
};
