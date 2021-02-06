/* 

Main Home Page UI that displays all tracked currencies

*/

import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { auth } from "../app/firebase";
import { useSelector } from "react-redux";
import { getSelectedCurrencies } from "../Slice/trackedCryptoSlice";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import TrackedList from "../components/TrackedList";

const HomeScreen = ({ navigation }) => {
  const currencies = useSelector(getSelectedCurrencies);
  useLayoutEffect(() => {
    // Applies styling to header for home page
    navigation.setOptions({
      title: "CryptoTracker - Home",
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
  return (
    // Displays UI based on if there are any tracked Currencies or not
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {currencies?.length === 0 ? (
          <View>
            <Text h3>
              You haven't added a currency yet, click button below to do so!
            </Text>
          </View>
        ) : (
          <View>
            {currencies?.map((currency) => (
              <TrackedList
                key={currency.data.name}
                symbol={currency.data.symbol}
                name={currency.data.name}
                price={currency.data.market_data.price_usd}
                percentage={
                  currency.data.market_data.percent_change_usd_last_24_hours
                }
                currencies={currencies}
              />
            ))}
          </View>
        )}
        <Text
          style={styles.addCryptoText}
          onPress={() => navigation.navigate("AddCrypto")}
          h4
        >
          + Add a Cryptocurrency
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  addCryptoText: {
    marginTop: 10,
    color: "turquoise",
  },
});
