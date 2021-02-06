/* 
  The Redux store for state management
*/

import { configureStore } from "@reduxjs/toolkit";
import trackedCryptoReducer from "../Slice/trackedCryptoSlice";

export default configureStore({
  reducer: { crypto: trackedCryptoReducer },
});
