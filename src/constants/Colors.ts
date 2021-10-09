const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const primary = "#52FF33";
const colors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    primary,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    primary,
  },
};
const isDark = true;
export default {
  ...colors,
  ...(isDark ? colors.dark : colors.light),
};
