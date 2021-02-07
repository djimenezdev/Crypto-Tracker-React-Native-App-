import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { auth } from "../app/firebase";
import { Avatar, Input, Text, Button } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedCurrencies,
  addCurrency,
} from "../Slice/trackedCryptoSlice";

const AddCryptoScreen = ({ navigation }) => {
  const [type, setType] = useState("");
  const currencies = useSelector(getSelectedCurrencies);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    // Applies styling to header for add cryptocurrency screen
    navigation.setOptions({
      title: "CryptoTracker - Add Curency",
      headerStyle: {
        backgroundColor: "#18a0fb",
        height: 100,
      },
      headerTitleStyle: {
        color: "#fff",
      },
      headerTitleAlign: "left",
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar rounded source={{ url: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  // Performs logic below onPress of button based on if currency is tracked already or not
  const addDispatch = () => async (dispatch) => {
    const upper = type.toUpperCase();
    const lower = type.toLowerCase();

    const match = currencies.filter(
      (currency) => currency.data.symbol === upper
    );
    if (match[0]?.data?.symbol) {
      alert("Currency has already been added. Try another one");
    } else {
      const res = await fetch(
        `https://data.messari.io/api/v1/assets/${lower}/metrics`
      );
      const resJSON = await res.json();
      dispatch(addCurrency({ added: resJSON }));
      navigation.goBack();
    }
  };

  return (
    // Simple UI for user to input symbol of currency and press of button to track it
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Text h4>Add Crypto</Text>
      <Input
        type="text"
        autoFocus
        placeholder="Enter Currency Symbol"
        value={type}
        onChangeText={(text) => setType(text)}
      />
      <Button
        title="Add Currency"
        onPress={() => dispatch(addDispatch())}
        disabled={!type}
      />
    </KeyboardAvoidingView>
  );
};

export default AddCryptoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    justifyContent: "center",
    width: 400,
  },
});
