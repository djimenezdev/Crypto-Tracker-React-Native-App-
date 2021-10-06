/* 
  The Redux store for state management
*/

import { configureStore } from "@reduxjs/toolkit";
import authCryptoReducer from "../Slice/authProfileSlice";
import currencyCryptoReducer from "../Slice/CurrenciesSlice";
import trackedCryptoReducer from "../Slice/trackedCryptoSlice";

export default configureStore({
  reducer: {
    crypto: trackedCryptoReducer,
    auth: authCryptoReducer,
    currency: currencyCryptoReducer,
  },
});
