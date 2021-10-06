import { createSlice } from "@reduxjs/toolkit";

// slice that tracks the currencies selected
export const currencyCryptoSlice = createSlice({
  name: "auth",
  initialState: {
    currencies: null,
  },
  reducers: {
    getCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
  },
});

export const { getCurrencies } = currencyCryptoSlice.actions;

export const getAllCurrencies = (state) => state.currency.currencies;

export default currencyCryptoSlice.reducer;
