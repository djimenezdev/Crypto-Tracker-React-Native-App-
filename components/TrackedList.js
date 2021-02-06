/* This Component consists of UI for each tracked currency */

import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { removeCurrency } from "../Slice/trackedCryptoSlice";

const TrackedList = ({ symbol, name, price, percentage, currencies }) => {
  const dispatch = useDispatch();

  const deleteTracked = () => {
    let currenciesClone = [...currencies];
    const match = currenciesClone.findIndex(
      (currency) => currency.data.name === name
    );
    currenciesClone.splice(match, 1);
    dispatch(removeCurrency({ removed: [...currenciesClone] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.topStyle}>{name}</Text>
        <Text style={styles.bottomStyle}>{symbol}</Text>
      </View>
      <View>
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
    width: 410,
    height: 110,
    justifyContent: "space-between",
  },
  topStyle: {
    padding: 10,
    fontWeight: "800",
  },
  bottomStyle: {
    paddingLeft: 10,
  },
  deleteButton: {
    color: "red",
    marginTop: 10,
    paddingLeft: 10,
    height: 34,
    marginRight: 10,
  },
});
