import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, authFetched: false },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = { ...state.user, ...user };
      state.token = accessToken;
      state.authFetched = true;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.authFetched = false;
    },
    getState: (state) => state,
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentAuthFetched = (state) => state.auth.authFetched;
