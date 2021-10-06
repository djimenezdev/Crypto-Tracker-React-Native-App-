/* This Component consists of UI for each tracked currency */

import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../app/firebase";
import { getOtherInfo } from "../Slice/authProfileSlice";
import { removeCurrency } from "../Slice/trackedCryptoSlice";

const TrackedList = ({
  currency: { symbol, name, price, percentage },
  currencies,
}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(getOtherInfo);

  const deleteTracked = () => {
    db?.collection("userCurrencies")
      .doc(`${userLogin?.userMeta?.email}`)
      .collection("selectedCurrencies")
      .doc(`${symbol}`)
      .delete();

    const currenciesClone = [...currencies];
    const currencyFilter = currenciesClone?.filter(
      ({ name: nameM }) => nameM !== name
    );

    dispatch(removeCurrency({ removed: [...currencyFilter] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.topStyle}>{name}</Text>
        <Text style={styles.bottomStyle}>{symbol}</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.topStyle}>${price}</Text>
        <Text style={styles.bottomStyle}>{percentage}%</Text>
        <Button
          style={styles.deleteButton}
          onPress={deleteTracked}
          title="Click to Remove"
        />
      </View>
    </SafeAreaView>
  );
};

export default TrackedList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  view: {
    padding: 20,
  },
  topStyle: {
    fontWeight: "800",
  },
  deleteButton: {
    marginTop: 10,
    color: "red",
  },
});
