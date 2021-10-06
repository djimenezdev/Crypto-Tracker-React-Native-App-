import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import { auth, firebaseS, storageRef } from "../app/firebase";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../Slice/authProfileSlice";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploadProgress, setUploadProgress] = useState({
    icon: "user-plus",
    message: "Register Account!",
  });
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // Sets header styling for register page
    navigation.setOptions({
      title: "Register",
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
    // creates user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (authUser) => {
        // upload for user image
        // converts image into blob which can then be uploaded to firebase
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", profileImage, true);
          xhr.send(null);
        });

        // connects to firebase storage and blob is uploaded!
        const ref = storageRef?.child(`user-profile-pictures/${email}`);
        const uploadPhoto = ref?.put(blob);

        // monitor upload progress and display it
        uploadPhoto.on(
          "state_changed",
          (snapshot) => {
            switch (snapshot.state) {
              case firebaseS.TaskState.PAUSED: // or 'paused'
                setUploadProgress({
                  icon: "user-cog",
                  message: "Upload is Paused",
                });
                break;
              case firebaseS.TaskState.RUNNING: // or 'running'
                setUploadProgress({ icon: "user-clock", message: "Uploading" });
                break;
            }
          },
          (error) => {
            setUploadProgress({
              icon: "user-times",
              message: "Unsuccessful, try again",
            });
          },
          async () => {
            setUploadProgress({
              icon: "user-check",
              message: "Success! Now going to home!",
            });
            const userInfo = {
              email: authUser?.user?.providerData[0]?.email,
            };
            // get url to photo if successful upload
            const url = await uploadPhoto.snapshot.ref.getDownloadURL();
            //stores image url in auth state
            dispatch(
              getUserInfo({
                userMeta: userInfo,
                image: url,
              })
            );
            // navigates to home after authentication
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }
        );
      });
  };

  // handle image upload
  const profileImageUpload = async () => {
    // first  get permission
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result?.cancelled) {
        setProfileImage(result?.uri);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
        <Button
          title="Click to upload Profile Image"
          onPress={profileImageUpload}
          style={styles.uploadButton}
        />
        <Button
          icon={
            <Icon
              name={uploadProgress?.icon}
              color="white"
              type="font-awesome-5"
              size={18}
              style={{ marginRight: 15 }}
            />
          }
          title={uploadProgress?.message}
          onPress={register}
          disabled={!email || !password || !profileImage}
        />
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
    marginRight: 15,
    width: 320,
  },
  uploadButton: {
    marginBottom: 10,
  },
});
