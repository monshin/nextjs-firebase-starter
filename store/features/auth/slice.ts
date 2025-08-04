import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ParsedToken } from 'firebase/auth';

import MyDateTime from '@/lib/MyDateTime';

import type { AccountUserModel } from '@/models/Auth.model';
// import type { UserModel } from '@/models/user/User.model';

interface State {
  userData: AccountUserModel;
  hadCheckLogin: boolean;
  isLogining: boolean;
  isNeedRefreshStatus: boolean;
}

const initialState: State = {
  userData: {
    uid: null,
    token: null,
    exp: 0,
  },
  hadCheckLogin: false,
  isLogining: false,
  isNeedRefreshStatus: false,
};

/**
 * Slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSetIsLogining: (state, action: PayloadAction<boolean>) => {
      state.isLogining = action.payload;
    },
    authSetHadCheckLogin: (state, action: PayloadAction<boolean>) => {
      state.hadCheckLogin = action.payload;
      state.isNeedRefreshStatus = false;
    },
    authClear: (state) => {
      state.userData = {
        uid: null,
        token: null,
        exp: 0,
      };
      state.isNeedRefreshStatus = false;
    },
    authSetUser: (
      state,
      action: PayloadAction<{
        uid: string | null;
        token: string | null;
        claims?: ParsedToken;
        isAnonymously?: boolean;
      }>,
    ) => {
      if (!action.payload.uid) {
        state.userData = {
          uid: null,
          token: null,
          exp: 0,
        };
      } else {
        let timer: number;
        try {
          timer = new MyDateTime(
            Number(action.payload.claims?.exp) * 1000
          ).datetime.getTime();
        } catch {
          timer = new Date().getTime();
        }

        state.userData = {
          uid: action.payload.uid,
          token: action.payload.token,
          exp: timer,
          
          providerId: action.payload.claims?.firebase?.sign_in_provider ?? '',
          isAnonymously: action.payload.isAnonymously,
        };
      }
      state.isNeedRefreshStatus = false;
    },
    // authReceiveUserProfile: (state, action: PayloadAction<{ data: UserModel }>) => {
    //   state.userData = { ...state.userData, data: action.payload.data };
    // },
    authChangeToken: (state, action: PayloadAction<{ token: string; claims?: ParsedToken }>) => {
      let timer: number;
      try {
        timer = new MyDateTime(
          Number(action.payload.claims?.exp) * 1000
        ).datetime.getTime();
      } catch {
        timer = new Date().getTime();
      }

      state.userData = {
        ...state.userData,
        token: action.payload.token,
        exp: timer,

        providerId: action.payload.claims?.firebase?.sign_in_provider ?? '',
      };
      state.isNeedRefreshStatus = false;
    },
    authSetNeedRefreshStatus: (state, action: PayloadAction<boolean>) => {
      state.isNeedRefreshStatus = action.payload;
    },
  },
});

export default authSlice.reducer;
export const {
  authSetIsLogining,
  authSetHadCheckLogin,
  authClear,
  authSetUser,
  // authReceiveUserProfile,
  authChangeToken,
  authSetNeedRefreshStatus,
} = authSlice.actions;
