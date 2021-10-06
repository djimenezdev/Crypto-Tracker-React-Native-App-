import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Platform,
} from "react-native";
import {
  Avatar,
  Input,
  Text,
  Button,
  Icon,
  ListItem,
} from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedCurrencies,
  addCurrency,
  allCurrencyFetch,
} from "../Slice/trackedCryptoSlice";
import { getOtherInfo /* , getUserPhoto  */ } from "../Slice/authProfileSlice";
import { getAllCurrencies } from "../Slice/CurrenciesSlice";
import { db } from "../app/firebase";

const AddCryptoScreen = ({ navigation }) => {
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);
  // const [allCurrenciesM, setAllCurrenciesM] = useState(null);
  const userLogin = useSelector(getOtherInfo);
  const currencies = useSelector(getSelectedCurrencies);
  const allCurrencies = useSelector(getAllCurrencies);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // Applies styling to header for add cryptocurrency screen
    navigation.setOptions({
      title: "Add Currency",
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
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="chevron-left"
              type="font-awesome-5"
              size={25}
              style={{ marginRight: 5 }}
              color="white"
            />
            <Text style={{ color: "white", fontWeight: "bold" }}>Home</Text>
          </View>
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

  // will check if user has saved currencies or not
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

  // filter currencies that begin with inputted characters
  const filteredCurrencies =
    type?.length > 0
      ? allCurrencies?.currencies?.data
          ?.filter(({ symbol }) =>
            symbol
              .toLowerCase()
              .startsWith(type.toLowerCase().replace(/\s+/g, " ").trim())
          )
          .map(
            ({
              name,
              symbol,
              metrics: {
                market_data: { price_usd, percent_change_usd_last_24_hours },
              },
            }) => ({
              name,
              symbol,
              price: price_usd,
              percent: percent_change_usd_last_24_hours,
            })
          )
      : null;
  // Performs logic below onPress of button based on if currency is tracked already or not
  const addDispatch = async () => {
    const upper = type.toUpperCase();
    // const lower = type.toLowerCase();
    const match =
      currencies?.length > 0
        ? currencies?.filter(({ symbol }) => symbol === upper)
        : null;
    if (match?.length > 0 && match[0]?.symbol === upper) {
      alert("Currency has already been added. Try another one");
    } else {
      // create document that will contain currencyInfo
      const addedCurrency = await db
        .collection("userCurrencies")
        .doc(`${userLogin?.userMeta?.email}`)
        .collection("selectedCurrencies")
        .doc(`${selected.symbol}`)
        .set(selected);
      dispatch(
        addCurrency({
          all: selected,
        })
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  };
  return (
    // Simple UI for user to input symbol of currency and press of button to track it
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      style={styles.container}
    >
      <Text h4>Add Crypto</Text>
      <Input
        type="text"
        autoFocus
        placeholder="Enter Currency Symbol"
        value={type}
        onChangeText={(text) => {
          setType(text);
          if (text.length === 0) {
            setSelected(null);
          }
        }}
      />
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 17, marginBottom: 10 }}>Search Results:</Text>
        {filteredCurrencies?.length > 0 ? (
          filteredCurrencies?.map(({ symbol, price, percent }, i) => {
            if (i <= 2) {
              return (
                <ListItem
                  key={symbol}
                  style={{
                    height: 50,
                  }}
                  onPress={() => {
                    setSelected(filteredCurrencies[i]);
                    setType(symbol);
                  }}
                  bottomDivider
                >
                  <ListItem.Content
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: `${
                        selected?.symbol === symbol ? "#f1f1f1" : "white"
                      }`,
                    }}
                  >
                    <View>
                      <ListItem.Title>{symbol}</ListItem.Title>
                    </View>
                    <View style={{ alignSelf: "center" }}>
                      <ListItem.Title>${price}</ListItem.Title>
                      <ListItem.Subtitle>{percent}%</ListItem.Subtitle>
                    </View>
                  </ListItem.Content>
                </ListItem>
              );
            }
          })
        ) : (
          <ListItem style={{ height: 50 }} bottomDivider>
            <ListItem.Content
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View>
                <ListItem.Title>
                  Not found. Type in search bar above{" "}
                </ListItem.Title>
              </View>
            </ListItem.Content>
          </ListItem>
        )}
      </View>
      <Button
        title="Add Currency"
        onPress={() => addDispatch()}
        disabled={!selected?.symbol}
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
  },
});
