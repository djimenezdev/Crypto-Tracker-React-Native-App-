/* 

Main Home Page UI that displays all tracked currencies

*/

import React, { useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  allCurrencyFetch,
  getSelectedCurrencies,
  clearCurrencies,
} from "../Slice/trackedCryptoSlice";
import TrackedList from "../components/TrackedList";
import { clearInfo, getOtherInfo } from "../Slice/authProfileSlice";
import { getAllCurrencies, getCurrencies } from "../Slice/CurrenciesSlice";
import { auth, db } from "../app/firebase";

const HomeScreen = ({ navigation }) => {
  const currencies = useSelector(getSelectedCurrencies);
  const userLogin = useSelector(getOtherInfo);
  const getAllCurrenciesM = useSelector(getAllCurrencies);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUserData = async () => {
      const checkData = db
        ?.collection("userCurrencies")
        ?.doc(`${userLogin?.userMeta?.email}`)
        ?.collection("selectedCurrencies")
        ?.get();
      checkData?.then((querySnapshot) => {
        if (querySnapshot?.docs?.length > 0) {
          const allC = [];
          querySnapshot.forEach((doc) => {
            allC.push(doc.data());
          });
          dispatch(allCurrencyFetch({ all: allC }));
        } else {
          return;
        }
      });
    };
    checkUserData();
  }, []);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const allCurrencies = await fetch(
        "https://data.messari.io/api/v1/assets"
      ).then((res) => res.json());
      dispatch(getCurrencies({ currencies: allCurrencies }));
    };
    if (!getAllCurrenciesM?.currencies?.data) {
      fetchCurrencies();
      return;
    }
  }, [getAllCurrenciesM]);

  useLayoutEffect(() => {
    // Applies styling to header for home page
    navigation.setOptions({
      title: "Home",
      headerStyle: {
        backgroundColor: "#18a0fb",
        height: 100,
      },
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            auth.signOut();
            dispatch(clearCurrencies());
            dispatch(clearInfo());
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }}
        >
          <Icon
            name="logout"
            color="white"
            type="material"
            size={24}
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar rounded source={{ url: userLogin?.image }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    // Displays UI based on if there are any tracked Currencies or not

    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        {currencies?.length === 0 ? (
          <View>
            <Text h3 style={styles.containerHeader}>
              You haven't added a currency yet, click button below to do so!
            </Text>
          </View>
        ) : (
          <View>
            {currencies?.length > 0 &&
              currencies?.map((currency, i) => (
                <TrackedList
                  key={currency?.symbol}
                  currency={currency}
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  containerHeader: {
    fontSize: 20,
    marginTop: 10,
  },
  addCryptoText: {
    marginTop: 10,
    color: "turquoise",
    fontSize: 25,
    textAlign: "center",
  },
});
