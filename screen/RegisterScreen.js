import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../app/firebase";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useLayoutEffect(() => {
    // Sets header styling for register page
    navigation.setOptions({
      title: "CryptoTracker - Register",
      headerStyle: {
        backgroundColor: "#18a0fb",
        height: 100,
      },
      headerTitleStyle: {
        color: "#fff",
      },
    });
  }, [navigation]);

  // handles registering of user through firebase auth
  const register = () => {
    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      authUser.user.updateProfile({
        photoURL: photoUrl,
      });
      navigation.replace("Home");
    });
  };
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Text h3>Register Here!</Text>
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
        <Input
          type="text"
          placeholder="Enter URL of picture(JPG or PNG)"
          value={photoUrl}
          onChangeText={(text) => setPhotoUrl(text)}
        />
        <Button title="Register Account!" onPress={register} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    alignItems: "center",
  },
  inputContainer: {
    width: 350,
  },
});
