import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Button } from "../../components/Themed";
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={{
            width: widthPercentageToDP("20%"),
            height: heightPercentageToDP("10%"),
          }}
        />
        <Text style={styles.title}>
          Send funds Anonymously to any{" "}
          <Text style={{ color: Colors.primary }}>Nigerian Bank</Text>
        </Text>

        <View>
          <Button text={"Login"} />
          <View style={{ padding: 5 }} />
          <Button text={"Register"} invert />

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.background,
    padding: widthPercentageToDP("8%"),
  },
  content: {
    height: heightPercentageToDP("50%"),
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: heightPercentageToDP("10%"),
  },
  title: {
    fontSize: widthPercentageToDP("7%"),
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: Colors.primary,
    height: widthPercentageToDP("15%"),
    width: widthPercentageToDP("15%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: widthPercentageToDP("7.3%"),
  },
  buttonText: {
    fontSize: widthPercentageToDP("4%"),
    fontWeight: "bold",
  },
});
