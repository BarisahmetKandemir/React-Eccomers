//// giriş yapan kullanıcı bilgisini yöneten redux
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // aktif kullanıcıyı kaydetmek
    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload)
      const { email, userName, userId } = action.payload
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
    },
    REMOVE_ACTİVE_USER: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
    }
  }
});

export const { SET_ACTIVE_USER } = authSlice.actions
export const { REMOVE_ACTİVE_USER } = authSlice.actions;


export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectUserId = (state) => state.auth.userId

export default authSlice.reducer
