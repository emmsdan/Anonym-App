import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";

import NotFoundScreen from "../NotFoundScreen";
import ModalScreen from "../ModalScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, RootTabParamList } from "../../navigation/types";
import WelcomeScreen from "./WelcomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import CreatePinScreen from "./CreatePinScreen";

const Stack = createNativeStackNavigator<RootTabParamList>();

export default function Init() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePin"
        component={CreatePinScreen}
        options={{ headerShown: false }}
      />

      {/*<Stack.Group screenOptions={{ presentation: 'modal' }}>*/}
      {/*  <Stack.Screen name="Modal" component={ModalScreen} />*/}
      {/*</Stack.Group>*/}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
