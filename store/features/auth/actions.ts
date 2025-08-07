import { createAction } from '@reduxjs/toolkit';

// import { CallbackFuncType } from '@/models/Generic.model';

/**
 * 使用者登入(Email)
 */
export const authLoginWithEmail = createAction<{
  email: string;
  password: string;
}>('auth/LOGIN_WITH_EMAIL');

/**
 * 使用者登入(Facebook)
 */
export const authLoginWithFacebook = createAction('auth/LOGIN_WITH_FACEBOOK');

/**
 * 使用者登入(Google)
 */
export const authLoginWithGoogle = createAction('auth/LOGIN_WITH_GOOGLE');

/**
 * 使用者登入檢查
 */
export const authCheckUser = createAction('auth/CHECK_USER');

/**
 * 使用者登出
 */
export const authLogout = createAction('auth/LOGOUT');
