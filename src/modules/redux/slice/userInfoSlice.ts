import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserInfoSlicePropsType {
  value: {
    userName: string;
    userPhoneNumber: string;
    userProfileImageUrl: string;
    userTotalReward: number;
  };
}

const initialState: UserInfoSlicePropsType = {
  value: {
    userName: '당아7',
    userPhoneNumber: '01000000000',
    userProfileImageUrl:
      'https://chatbot-budket.s3.ap-northeast-2.amazonaws.com/profile/member_29_2023-10-04%2003%3A28%3A27.369476.jpg',
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
      state.value = action.payload.value;
    },
    initUserInfo: state => {
      state.value = initialState.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {initUserInfo, handleUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;
