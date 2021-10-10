import * as React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  Button,
  Error,
  Flex,
  Input,
  SpreadFlexWrap,
} from "../../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { loginValidationSchema } from "./validationSchema";
import { loginService } from "../../service/auth";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [error, setError] = React.useState("");

  return (
    <View style={styles.container}>
      <View
        style={{
          width: widthPercentageToDP("90%"),
          justifyContent: "flex-end",
        }}
      >
        <Text style={styles.title}>Create your</Text>
        <Text style={styles.subtitle}>Account</Text>
      </View>

      <View style={{ padding: 10 }} />
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={loginService((values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        })}
        validationSchema={loginValidationSchema}
      >
        {(formikProps) => (
          <View style={styles.content}>
            <Input
              placeholder="Name"
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={formikProps.handleChange("name")}
              onBlur={formikProps.handleBlur("name")}
              autoFocus
            />

            <Input
              placeholder="Email Address"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
              autoFocus
            />

            <Input
              placeholder="Phone Number"
              leftIcon={{ type: "font-awesome", name: "phone" }}
              onChangeText={formikProps.handleChange("username")}
              onBlur={formikProps.handleBlur("username")}
              keyboardType="number-pad"
              autoFocus
            />

            <Input
              placeholder="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              secureTextEntry
              onChangeText={formikProps.handleChange("password")}
              onBlur={formikProps.handleBlur("password")}
            />
            <Error>{error}</Error>

            <Flex style={{ width: widthPercentageToDP("85%") }}>
              <Text
                style={styles.register}
                onPress={() => navigation.navigate("Login")}
              >
                Log in?
              </Text>
              <Button
                text={"Create Account"}
                color={Colors.warning2}
                disabled={!formikProps.isValid}
                loading={formikProps.isSubmitting}
                onPress={formikProps.handleSubmit}
                innerStyle={{ width: widthPercentageToDP("50%") }}
              />
            </Flex>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    padding: widthPercentageToDP("8%"),
  },
  content: {
    paddingVertical: widthPercentageToDP("8%"),
    height: heightPercentageToDP("40%"),
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: heightPercentageToDP("10%"),
    paddingTop: heightPercentageToDP("8%"),
  },
  title: {
    fontSize: widthPercentageToDP("10%"),
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "right",
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: widthPercentageToDP("8%"),
    color: Colors.text,
    textAlign: "right",
    paddingBottom: 5,
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
  register: {
    fontWeight: "bold",
    fontSize: widthPercentageToDP("5%"),
    color: Colors.warning2,
    paddingTop: widthPercentageToDP("4%"),
    textTransform: "uppercase",
  },
  input: {
    // borderColor: 'red',
    borderWidth: 0,
    // backgroundColor: Colors.text,
    borderRadius: widthPercentageToDP("5%"),
    width: widthPercentageToDP("90%"),
    color: Colors.text,
    // height: widthPercentageToDP("12%"),
    // padding: widthPercentageToDP('6%'),
  },
});
