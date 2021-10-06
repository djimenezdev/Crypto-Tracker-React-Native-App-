import { createSlice } from "@reduxjs/toolkit";

// slice that tracks the currencies selected
export const trackedCryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    selectedCurrencies: [],
  },
  reducers: {
    allCurrencyFetch: (state, action) => {
      state.selectedCurrencies = action.payload.all;
    },
    addCurrency: (state, action) => {
      state.selectedCurrencies = [
        ...state.selectedCurrencies,
        action.payload.all,
      ];
    },
    removeCurrency: (state, action) => {
      state.selectedCurrencies = action.payload.removed;
    },
    clearCurrencies: (state) => {
      state.selectedCurrencies = [];
    },
  },
});

export const {
  allCurrencyFetch,
  addCurrency,
  removeCurrency,
  clearCurrencies,
} = trackedCryptoSlice.actions;

export const getSelectedCurrencies = (state) => state.crypto.selectedCurrencies;

export default trackedCryptoSlice.reducer;
