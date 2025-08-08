'use client';

import { combineEpics } from 'redux-observable';

import * as toastEpics from './features/toast/epics';
import * as authEpics from './features/auth/epics';

export default combineEpics(
  /**
   * Toast
   */
  toastEpics.toastShowEpic,
  toastEpics.toastShowAjaxErrorEpic,
  /**
   * Auth
   */
  authEpics.authLoginWithEmailEpic,
  authEpics.authLoginWithGoogleEpic,
  authEpics.authLoginWithFacebookEpic,
  authEpics.authCheckUserEpic
);
