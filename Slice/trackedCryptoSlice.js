import { createSlice } from "@reduxjs/toolkit";

// slice that tracks the currencies selected
export const trackedCryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    selectedCurrencies: [],
  },
  reducers: {
    addCurrency: (state, action) => {
      state.selectedCurrencies = [
        ...state.selectedCurrencies,
        action.payload.added,
      ];
    },
    removeCurrency: (state, action) => {
      state.selectedCurrencies = action.payload.removed;
    },
  },
});

export const { addCurrency, removeCurrency } = trackedCryptoSlice.actions;

export const getSelectedCurrencies = (state) => state.crypto.selectedCurrencies;

export default trackedCryptoSlice.reducer;
