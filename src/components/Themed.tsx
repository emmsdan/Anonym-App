/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from "react";
import {
  StyleSheet,
  Text as DefaultText,
  TouchableOpacity,
  View as DefaultView,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props: {
  invert?: boolean;
  text: string;
  onPress?: () => void;
  rounded?: boolean;
  color?: string | string[];
}) {
  const endGradient = props.invert ? { x: 0.1, y: 0.9 } : { x: 0.9, y: 0.1 };
  const startGradient = props.invert ? { x: 0.9, y: 0.1 } : { x: 0.1, y: 0.9 };
  const colors = props.color ?  typeof props.color === 'string' ? [props.color, props.color] : props.color : [Colors.primary, "#F7FF33", "#FFC300"];
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        end={endGradient}
        start={startGradient}
        colors={colors}
        style={!props.rounded ? styles.button : styles.circle}
      >
        <Text style={styles.buttonText}>{props.text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: heightPercentageToDP("6%"),
    width: widthPercentageToDP("85%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: widthPercentageToDP("7%"),
  },
  buttonText: {
    fontSize: widthPercentageToDP("4%"),
    fontWeight: "bold",
  },
  circle: {
    height: widthPercentageToDP("15%"),
    width: widthPercentageToDP("15%"),
    borderRadius: widthPercentageToDP("7.3%"),
    justifyContent: "center",
    alignItems: "center",
  },
});
