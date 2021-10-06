import { createSlice } from "@reduxjs/toolkit";

// slice that tracks the currencies selected
export const authCryptoSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
  },
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { getUserInfo, clearInfo } = authCryptoSlice.actions;

export const getOtherInfo = (state) => state.auth.userInfo;

export default authCryptoSlice.reducer;
