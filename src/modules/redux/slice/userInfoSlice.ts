import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserInfoSlicePropsType {
  userInfo: {
    userName: '';
    userPhoneNumber: '';
    userProfileImageUrl: '';
    userTotalReward: 0;
  };
}

const initialState: UserInfoSlicePropsType = {
  userInfo: {
    userName: '',
    userPhoneNumber: '',
    userProfileImageUrl: '',
    userTotalReward: 0,
  },
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    handleUserInfo: (state, action: PayloadAction<UserInfoSlicePropsType>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userInfo = action.payload.userInfo;
    },
    initUserInfo: state => {
      state.userInfo = initialState.userInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const {initUserInfo, handleUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;
