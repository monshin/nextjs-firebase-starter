'use client';

import {
  catchError,
  EMPTY,
  filter,
  from,
  merge,
  mergeMap,
  of,
  timer,
} from 'rxjs';

import type { AppEpic } from '@/store/store';
import { toastShow } from '../toast/actions';
import {
  authClear,
  authSetHadCheckLogin,
  authSetIsLogining,
  authSetNeedRefreshStatus,
  authSetUser,
} from './slice';
import {
  authCheckUser,
  authLoginWithEmail,
  authLoginWithFacebook,
  authLoginWithGoogle,
  authLogout,
} from './actions';

import myAjax, { rxjsAjaxRemoveToken, rxjsAjaxSetToken } from '@/store/myAjax';
import FirebaseAuth, {
  loginWithEmail,
  loginWithFacebook,
  loginWithGoogle,
} from '@/lib/firebase/auth';

export const authLoginWithEmailEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(authLoginWithEmail.match),
    mergeMap(({ payload: { email, password } }) => {
      return merge(
        // of(pageLoadingShow(), authSetIsLogining(true)),
        of(authSetIsLogining(true)),
        from(loginWithEmail({ email, password })).pipe(
          mergeMap((response) => {
            // if (FirebaseAuth.currentUser && !response.user.emailVerified) {
            //   sendEmailVerification(FirebaseAuth.currentUser);
            // }
            // return of(authSetIsLogining(false));
            return EMPTY;
          }),
          catchError((error) => {
            console.error('Firebase login with Email error:', error);
            if (error.code === 'auth/user-not-found') {
              return of(
                toastShow({ text: '帳號不存在' }),
                // pageLoadingClose(),
                authSetIsLogining(false)
              );
            }
            if (error.code === 'auth/wrong-password') {
              return of(
                toastShow({ text: '密碼輸入錯誤' }),
                // pageLoadingClose(),
                authSetIsLogining(false)
              );
            }
            return of(
              toastShow({ text: '登入失敗' }),
              // pageLoadingClose(),
              authSetIsLogining(false)
            );
          })
        )
      );
    })
  );

export const authLoginWithFacebookEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(authLoginWithFacebook.match),
    mergeMap(() => {
      return merge(
        // of(pageLoadingShow(), authSetIsLogining(true)),
        of(authSetIsLogining(true)),
        from(loginWithFacebook()).pipe(
          mergeMap((response) => {
            // return of(authSetIsLogining(false));
            return EMPTY;
          }),
          catchError((error) => {
            console.error('Firebase login with Facebook error:', error);
            return of(
              toastShow({ text: '登入失敗' }),
              // pageLoadingClose(),
              authSetIsLogining(false)
            );
          })
        )
      );
    })
  );

export const authLoginWithGoogleEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(authLoginWithGoogle.match),
    mergeMap(() => {
      return merge(
        // of(pageLoadingShow(), authSetIsLogining(true)),
        of(authSetIsLogining(true)),
        from(loginWithGoogle()).pipe(
          mergeMap((response) => {
            // return of(authSetIsLogining(false));
            return EMPTY;
          }),
          catchError((error) => {
            console.error('Firebase login with Google error:', error);
            return of(
              toastShow({ text: '登入失敗' }),
              // pageLoadingClose(),
              authSetIsLogining(false)
            );
          })
        )
      );
    })
  );

export const authCheckUserEpic: AppEpic = (action$, store$) =>
  action$.pipe(
    filter(authCheckUser.match),
    mergeMap(() => {
      const { isNeedRefreshStatus } = store$.value.auth;
      const { currentUser } = FirebaseAuth;
      if (currentUser !== null && currentUser !== undefined) {
        return merge(
          // of(pageLoadingShow(), authSetIsLogining(true)),
          of(authSetIsLogining(true)),
          from(currentUser.getIdToken(isNeedRefreshStatus || undefined)).pipe(
            mergeMap((token) =>
              merge(
                // of(
                //   authSetEmailVerified(!currentUser.email || currentUser.emailVerified),
                //   authCheckEmailVerified(),
                // ),
                myAjax.post(
                  '/auth/check',
                  { token },
                  null,
                  (response) => {
                    if (
                      response.status === 200 &&
                      response.response?.code === 200
                    ) {
                      // MyCookie.setWithNoneSameSite('token', token);
                      // const responseData = response.response.data;

                      // 強制重新取得 token，以方便取得 scope
                      return from(currentUser.getIdTokenResult(true)).pipe(
                        mergeMap(({ token, claims }) => {
                          return merge(
                            rxjsAjaxSetToken(token, () => EMPTY),
                            of(
                              // authStopEmailVerified(),
                              authSetUser({
                                token,
                                uid: currentUser.uid,
                                claims,
                              }),
                              authSetIsLogining(false)
                            )
                          );
                        })
                      );
                    }
                    return of(
                      authSetNeedRefreshStatus(false),
                      toastShow({
                        text: '伺服器忙線中',
                        variant: 'warning',
                      }),
                      authSetIsLogining(false),
                      authLogout()
                    );
                  },
                  (error) => {
                    console.log(
                      '/auth/check error:',
                      error.status,
                      error,
                      currentUser
                    );
                    // /auth/check 未註冊
                    if (error.status === 403 && error.response.code === 1002) {
                      // const isLoginPage =
                      //   location.pathname.startsWith('/login') ||
                      //   location.pathname.startsWith('/sign');
                      return merge(
                        of(
                          authSetUser({ token, uid: currentUser.uid }),
                          authSetNeedRefreshStatus(false)
                          // pageLoadingClose()
                        )
                        // isLoginPage || currentUser.isAnonymous
                        //   ? EMPTY
                        //   : timer(100).pipe(
                        //       mergeMap(() => {
                        //         Router.push(
                        //           `/sign?returnUrl=${encodeURIComponent(
                        //             location.pathname
                        //           )}`
                        //         );
                        //         return EMPTY;
                        //       })
                        //     )
                      );
                    }
                    // /auth/check 其他錯誤
                    return merge(
                      of(
                        authSetNeedRefreshStatus(false),
                        toastShow({
                          text:
                            error.status === 0
                              ? '伺服器連線錯誤！'
                              : '伺服器忙線中',
                          variant: 'warning',
                        }),
                        // pageLoadingClose(),
                        authSetIsLogining(false)
                      ),
                      timer(100).pipe(
                        mergeMap(() => {
                          return of(authCheckUser());
                        })
                      )
                    );
                  }
                )
              )
            ),
            // token 取得失敗
            catchError(() => {
              return of(
                authSetNeedRefreshStatus(false),
                authSetHadCheckLogin(true),
                authSetIsLogining(false),
                authLogout()
                // pageLoadingClose()
              );
            })
          )
        );
      }
      // 沒有 currentUser
      return merge(
        rxjsAjaxRemoveToken(() => EMPTY),
        of(
          authClear(),
          authSetNeedRefreshStatus(false),
          authSetHadCheckLogin(true)
          // pageLoadingClose()
        )
      );
    })
  );

export const authLogoutEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(authLogout.match),
    mergeMap(() => {
      const { currentUser } = FirebaseAuth;
      if (currentUser !== null && currentUser !== undefined) {
        return merge(
          // of(pageLoadingShow()),
          from(FirebaseAuth.signOut()).pipe(
            mergeMap(() => {
              return merge(
                rxjsAjaxRemoveToken(() => EMPTY),
                of(
                  authClear()
                  // pageLoadingClose()
                  // routerActions.replace(location.pathname + location.search),
                )
                // timer(100).pipe(
                //   mergeMap(() => {
                //     Router.reload();
                //     return EMPTY;
                //   })
                // )
              );
            }),
            catchError((error) => {
              console.log('Firebase logout error:', error);
              // return of(pageLoadingClose(), messageShow({ text: '登出失敗' }));
              return of(toastShow({ text: '登出失敗' }));
            })
          )
        );
      }
      return merge(
        rxjsAjaxRemoveToken(() => EMPTY),
        of(
          authClear()
          // routerActions.replace(location.pathname + location.search),
        )
        // timer(100).pipe(
        //   mergeMap(() => {
        //     Router.reload();
        //     return EMPTY;
        //   })
        // )
      );
    })
  );
