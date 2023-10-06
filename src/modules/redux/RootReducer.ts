import {combineReducers} from '@reduxjs/toolkit';
import userInfoSlice from './slice/userInfoSlice';

/**
 * 애플리케이션에서 목적에 따라 리듀서를 분리하여 관리 합니다.
 */
const RootReducer = combineReducers({
  userInfo: userInfoSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
