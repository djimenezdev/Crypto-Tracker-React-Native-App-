import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import HomeScreen from "./screen/HomeScreen";
import store from "./app/store";
import { Provider } from "react-redux";
import AddCryptoScreen from "./screen/AddCryptoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Consists of the provider for redux and the Navigator for the stacked screens
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddCrypto" component={AddCryptoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

/* const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
 */
