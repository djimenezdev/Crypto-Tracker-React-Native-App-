import { auth, storageRef } from "../app/firebase";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Image, Input, Text } from "react-native-elements";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../Slice/authProfileSlice";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // Styles header for login screen
    navigation.setOptions({
      title: "Login",
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
      .then(async (authUser) => {
        const userInfo = {
          email: authUser?.user?.providerData[0]?.email,
        };
        //stores image url in auth state
        const ref = storageRef?.child(`user-profile-pictures/${email}`);
        const url = await ref.getDownloadURL();
        dispatch(
          getUserInfo({
            userMeta: userInfo,
            image: url,
          })
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    // UI consisting an email and password input field. Also one button that logs user in and another allowing
    // user to go to register page if not logged in
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <View>
          <Image
            source={require("../assets/cryptoTracker-logo.png")}
            style={styles.logo}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
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
        <Button style={styles.loginButton} onPress={signIn} title="Sign In" />
        <Button
          type="outline"
          style={styles.loginButton}
          onPress={() => navigation.navigate("Register")}
          title="Register"
        />
      </View>
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginLeft: 15,
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    height: 130,
    width: 130,
    borderRadius: 12,
    marginBottom: 10,
  },
  loginButton: {
    width: 320,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
  },
});
