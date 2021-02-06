import { auth } from "../app/firebase";
import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    // Styles header for login screen
    navigation.setOptions({
      title: "CryptoTracker - Login",
      headerStyle: {
        backgroundColor: "#18a0fb",
        height: 100,
      },
      headerTitleStyle: {
        color: "#fff",
      },
    });
  }, [navigation]);

  // handles user sign in with firebase auth
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    // UI consisting an email and password input field. Also one button that logs user in and another allowing
    // user to go to register page if not logged in
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Text style={styles.containerHeader} h3>
        Sign In here to see latest on Cryptocurrencies!
      </Text>
      <View style={styles.inputContainer}>
        <Input
          type="email"
          autoFocus
          placeholder="Enter Email..."
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          type="password"
          secureTextEntry
          placeholder="Enter Password..."
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button style={styles.loginButton} onPress={signIn} title="Sign In" />
      <Button
        type="outline"
        style={styles.loginButton}
        onPress={() => navigation.navigate("Register")}
        title="Register"
      />
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: 400,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
  },
  containerHeader: {
    marginTop: 20,
    textAlign: "center",
  },
  loginButton: {
    width: 400,
    marginLeft: 10,
    marginBottom: 10,
  },
});
