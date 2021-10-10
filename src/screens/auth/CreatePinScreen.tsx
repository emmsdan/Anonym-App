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
  Input, Spacer,
  SpreadFlexWrap,
} from "../../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {loginValidationSchema, verifyValidationSchema} from "./validationSchema";
import { loginService } from "../../service/auth";

export default function CreatePinScreen() {
  const navigation = useNavigation();
  const [error, setError] = React.useState("");
  const [type, setType] = React.useState("otp");

  return (
    <View style={styles.container}>
      <View
        style={{
          width: widthPercentageToDP("85%"),
          justifyContent: "flex-end",
        }}
      >
        {type === 'otp' ? <>
              <Text style={styles.title}>Account {"\n"}Activation</Text>
              <Text style={styles.subtitle}>
                Enter the token sent to 081xxxxxxxx.
              </Text>
            </> :
            <>
              <Text style={styles.title}>Secure {"\n"}Account</Text>
              <Text style={styles.subtitle}>
                Create your unique transaction PIN, by entering a 5 digits code
              </Text>
            </>}
      </View>

      <View style={{ padding: 10 }} />
      <Formik
        initialValues={{ pin: "", code: "" }}
        onSubmit={ (values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={verifyValidationSchema}
      >
        {(formikProps) => (
          <View style={styles.content}>
            {type === 'otp' ? <Input
                placeholder={'12345'}
                onChangeText={formikProps.handleChange("code")}
                onBlur={formikProps.handleBlur("code")}
                autoFocus
                isOtp
            /> : <Input
                placeholder={'12345'}
                onChangeText={formikProps.handleChange("pin")}
                onBlur={formikProps.handleBlur("pin")}
                autoFocus
                isOtp
            />
            }

            <Error>{error}</Error>
            <View style={{ width: widthPercentageToDP("85%") }}>
              {type === 'otp' ? <><Text
                  style={styles.register}
                  onPress={() => navigation.navigate("Register")}
              >
                Resend Code?
              </Text>
                <Spacer />
                </>: <></>}
              <Button
                text={type === 'otp' ? "Next" : "Confirm and Secure"}
                color={Colors.warning2}
                loading={formikProps.isSubmitting}
                disabled={formikProps.errors.code || (type !== 'otp' && formikProps.errors.pin)}
                onPress={type === 'otp' ? ()=>setType('pin') : formikProps.handleSubmit}
              />
            </View>
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
    color: Colors.text,
    textAlign: "right",
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: widthPercentageToDP("5%"),
    color: Colors.text,
    textAlign: "right",
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
