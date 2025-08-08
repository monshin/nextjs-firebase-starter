'use client';

import Router from 'next/router';
import { EMPTY, filter, mergeMap, of } from 'rxjs';
import {
  Id,
  Slide,
  toast,
  ToastContent,
  ToastOptions,
  TypeOptions,
} from 'react-toastify';

import { toastShow, toastShowAjaxError } from './actions';
import { authLogout } from '../auth/actions';

import type { AppEpic } from '@/store/store';

const defaultToastOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 30000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: 'colored',
  transition: Slide,
};

/**
 * Display toast
 *
 * @param {ToastType} type
 * @param {ToastContent} content
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 */
const showMyToast = (
  content: ToastContent,
  type: TypeOptions = 'error',
  options: Partial<ToastOptions> = {}
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case 'success':
      return toast.success(content, optionsToApply);
    case 'error':
      return toast.error(content, optionsToApply);
    case 'info':
      return toast.info(content, optionsToApply);
    case 'warning':
      return toast.warn(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};

export const toastShowEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(toastShow.match),
    mergeMap(({ payload: { text, variant } }) => {
      showMyToast(text, variant);
      return EMPTY;
    })
  );

export const toastShowAjaxErrorEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(toastShowAjaxError.match),
    mergeMap(({ payload: { error } }) => {
      const errorRes = error.response;
      let toastText = '系統發生錯誤';
      if (error.status === 500) {
        return EMPTY; // Mars: 500 先不要噴錯誤
      } else if (error.status === 401 || error.status === 403) {
        if (error.status === 403 && error.response.code === 1002) {
          const isLoginPage =
            location.pathname.startsWith('/login') ||
            location.pathname.startsWith('/sign');
          if (!isLoginPage) {
            Router.push(
              `/sign?returnUrl=${encodeURIComponent(location.pathname)}`,
              undefined,
              {
                shallow: true,
              }
            );
          }
          return EMPTY;
        }
        if (error.status === 403 && errorRes.toast.includes('權限')) {
          toastText = errorRes.toast;
        } else if (error.status === 403 && errorRes.code === 99999) {
          toastText = errorRes.toast;
        } else {
          return of(authLogout(), toastShow({ text: '請再登入爆料公社' }));
        }
      } else if (error.status === 502) {
        toastText = '網路發生錯誤';
      } else if (error.status === 521) {
        toastText = '網路發生錯誤';
      } else if (error.status === 429) {
        toastText = '您操作太頻繁了，請稍後重新整理！';
      } else if (errorRes && (errorRes.code || errorRes.status)) {
        if (errorRes.code === 404 || errorRes.status === 404) {
          if (errorRes.toast.startsWith('Cannot ')) {
            toastText = '此功能尚未開放';
          } else if (
            typeof errorRes.toast === 'string' &&
            errorRes.toast.length > 1
          ) {
            toastText = errorRes.toast;
          }
        } else if (errorRes.code === 405 || errorRes.status === 405) {
          toastText = '此功能尚未開放';
        } else if (errorRes.code === 503 || errorRes.status === 503) {
          toastText = '系統忙碌中請稍候';
        } else if (
          typeof errorRes.toast === 'string' &&
          errorRes.toast.length > 1
        ) {
          toastText = errorRes.toast;
        }
      }

      return of(toastShow({ text: toastText }));
    })
  );
