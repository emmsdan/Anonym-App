/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from "react";
// @ts-ignore
import styled from "styled-components/native";
import {
  ActivityIndicator,
  StyleSheet,
  Text as DefaultText,
  TouchableOpacity,
  View as DefaultView,
    Platform
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Input as DefaultInput } from "react-native-elements";

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
  outline?: boolean;
  [key: string]: any;
}) {
  const endGradient = props.invert ? { x: 0.1, y: 0.9 } : { x: 0.9, y: 0.1 };
  const startGradient = props.invert ? { x: 0.9, y: 0.1 } : { x: 0.1, y: 0.9 };
  let colors = props.color
    ? typeof props.color === "string"
      ? [props.color, props.color]
      : props.color
    : [Colors.primary, "#F7FF33", "#FFC300"];
  // colors = props.outline ? ['#fff'] : colors
  const outerStyle = {
    borderColor: props.outline || props.rounded ? colors[0] : "",
    borderWidth: 1,
    borderRadius: widthPercentageToDP("7.3%"),
  };
  const textColor = props.outline ? colors[0] : "#17202A";
  const opacity = props.disabled || props.loading ? 0.4 : 1;
  return (
    <TouchableOpacity
      onPress={props.disabled || props.loading ? () => {} : props.onPress}
      style={{
        ...(props.outline
          ? outerStyle
          : {
              ...(props.rounded ? { ...outerStyle, padding: 5 } : {}),
            }),
        opacity,
        ...props?.style,
      }}
    >
      <LinearGradient
        end={endGradient}
        start={startGradient}
        colors={props.outline ? [Colors.background, Colors.background] : colors}
        style={{
          ...(!props.rounded ? styles.button : styles.circle),
          opacity,
          ...props?.innerStyle,
        }}
      >
        {props.loading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <Text
            style={{
              ...styles.buttonText,
              color: textColor,
            }}
          >
            {props.text}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function Input(props: any) {
  const OtpMarginTop = Platform.OS=== 'ios' ?  -widthPercentageToDP('3%') :  -widthPercentageToDP('7%')
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <DefaultInput
        containerStyle={{ width: widthPercentageToDP("90%") }}
        style={{ paddingLeft: 10 }}
        color={Colors.text}
        {...(props.isOtp
          ? {
              inputContainerStyle: {
                paddingLeft: Platform.OS === 'ios' ? widthPercentageToDP("3%") : 0,
                borderBottomWidth: 0,
              },
              inputStyle: {
                fontSize: widthPercentageToDP("12%"),
                letterSpacing: widthPercentageToDP("8.5%"),
              },
              keyboardType: "numeric",
              maxLength: 5,
              // caretHidden: true,
            }
          : {})}
        {...props}
        {...(props.leftIcon
          ? { leftIcon: { color: Colors.text, ...props.leftIcon } }
          : {})}
      />
      {props.isOtp ? <Flex
        style={{
        marginLeft: widthPercentageToDP("8%"),
        width: widthPercentageToDP("71%"),
        marginTop: OtpMarginTop
      }}>
        <SmallLineThrough />
        <SmallLineThrough />
        <SmallLineThrough />
        <SmallLineThrough />
        <SmallLineThrough />
        </Flex> : <></>}
    </View>
  );
}

export const SpreadFlexTouchableOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

export const SpreadFlexWrap = styled.View`
  flex-direction: row;
  align-content: center;
  flex-wrap: wrap;
  margin-horizontal: 7px;
`;
export const SpreadFlexWrapScroll = styled.ScrollView`
  flex-direction: row;
  align-content: center;
  flex-wrap: wrap;
  margin-horizontal: 7px;
`;
export const Flex = styled.View`
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;
export const Error = styled.Text`
  color: ${Colors.error};
  font-size: ${widthPercentageToDP("4%")}px;
`;

export const Spacer = styled.View`
  height: ${heightPercentageToDP('2%')}px;
  padding: ${heightPercentageToDP('2%')}px;
`;
export const SmallLineThrough = styled.View`
  border-bottom-width: 2px;
  border-color: ${Colors.white};
  width: ${widthPercentageToDP("10%")}px;
  background-color: transparent;
`;
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
