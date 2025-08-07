import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ParsedToken } from 'firebase/auth';

import MyDateTime from '@/lib/MyDateTime';

import type { AccountUserModel } from '@/models/Auth.model';
// import type { UserModel } from '@/models/user/User.model';

interface State {
  userData: AccountUserModel;
  hadCheckLogin: boolean;
  isLogining: boolean;
  isNeedRegister: boolean;
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
  isNeedRegister: false,
  isNeedRefreshStatus: false,
};

/**
 * Slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSetHadCheckLogin: (state, action: PayloadAction<boolean>) => {
      state.hadCheckLogin = action.payload;
      state.isNeedRefreshStatus = false;
    },
    authSetIsLogining: (state, action: PayloadAction<boolean>) => {
      state.isLogining = action.payload;
    },
    authSetNeedRegister: (state, action: PayloadAction<boolean>) => {
      state.isNeedRegister = action.payload;
    },
    authSetNeedRefreshStatus: (state, action: PayloadAction<boolean>) => {
      state.isNeedRefreshStatus = action.payload;
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
      }>
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
        };
      }
      state.isNeedRefreshStatus = false;
    },
    authChangeToken: (
      state,
      action: PayloadAction<{ token: string; claims?: ParsedToken }>
    ) => {
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
        scope:
          action.payload.claims?.scope !== null &&
          action.payload.claims?.scope !== undefined
            ? String(action.payload.claims.scope)
            : null,
      };
      state.isNeedRefreshStatus = false;
    },
    // authReceiveUserProfile: (state, action: PayloadAction<{ data: UserModel }>) => {
    //   state.userData = { ...state.userData, data: action.payload.data };
    // },
  },
});

export default authSlice.reducer;
export const {
  authSetHadCheckLogin,
  authSetIsLogining,
  authSetNeedRegister,
  authSetNeedRefreshStatus,
  authClear,
  authSetUser,
  authChangeToken,
  // authReceiveUserProfile,
} = authSlice.actions;
