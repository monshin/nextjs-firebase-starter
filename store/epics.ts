import { combineEpics } from 'redux-observable';

import * as authEpics from './features/auth/epics';

export default combineEpics(
  /**
   * Auth
   */
  authEpics.authLoginWithEmailEpic,
  authEpics.authLoginWithGoogleEpic,
  authEpics.authLoginWithFacebookEpic,
  authEpics.authCheckUserEpic
);