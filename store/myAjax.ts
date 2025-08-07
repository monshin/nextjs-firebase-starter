import type { UnknownAction } from '@reduxjs/toolkit';
import { Observable, of, catchError, mergeMap } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import queryString from 'query-string';

import { toastShowAjaxError } from './features/toast/actions';

import { getApiHeaders } from '@/lib/fetch/ApiFetch';

import { API_HOST_URL } from '@/constants';

class myAjax {
  /**
   * ajax get
   * @param url 路徑
   * @param queryObj 參數物件
   * @param token firebase token
   * @param successObservable 成功後Observable動作
   * @param errorObservable 失敗後Observable動作
   */
  public static get(
    url: string,
    queryObj: any,
    token: string | null,
    successObservable: (
      response: AjaxResponse<any>
    ) => Observable<UnknownAction>,
    errorObservable: (error: any) => Observable<UnknownAction>
  ): Observable<UnknownAction> {
    const queryStr = queryString.stringify(queryObj, {
      arrayFormat: 'bracket',
    });
    return ajax
      .get<any>(`${API_HOST_URL}${url}?${queryStr}`, getApiHeaders(token))
      .pipe(
        // retry(1),
        mergeMap((response) => successObservable(response)),
        catchError((error) => errorObservable(error))
      );
  }

  /**
   * ajax put
   * @param url 路徑
   * @param bodyObj 參數物件
   * @param token firebase token
   * @param successObservable 成功後Observable動作
   * @param errorObservable 失敗後Observable動作
   */
  public static put(
    url: string,
    bodyObj: any,
    token: string | null,
    successObservable: (
      response: AjaxResponse<any>
    ) => Observable<UnknownAction>,
    errorObservable?: (error: any) => Observable<UnknownAction>
  ): Observable<UnknownAction> {
    return ajax
      .put<any>(`${API_HOST_URL}${url}`, bodyObj, getApiHeaders(token))
      .pipe(
        mergeMap((response) => successObservable(response)),
        catchError((error) =>
          errorObservable
            ? errorObservable(error)
            : of(toastShowAjaxError({ error }))
        )
      );
  }

  /**
   * ajax post
   * @param url 路徑
   * @param bodyObj 參數物件
   * @param token firebase token
   * @param successObservable 成功後Observable動作
   * @param errorObservable 失敗後Observable動作
   */
  public static post(
    url: string,
    bodyObj: any,
    token: string | null,
    successObservable: (
      response: AjaxResponse<any>
    ) => Observable<UnknownAction>,
    errorObservable?: (error: any) => Observable<UnknownAction>
  ): Observable<UnknownAction> {
    return ajax
      .post<any>(`${API_HOST_URL}${url}`, bodyObj, getApiHeaders(token))
      .pipe(
        mergeMap((response) => successObservable(response)),
        catchError((error) =>
          errorObservable
            ? errorObservable(error)
            : of(toastShowAjaxError({ error }))
        )
      );
  }

  /**
   * ajax delete
   * @param url 路徑
   * @param bodyObj 參數物件
   * @param token firebase token
   * @param successObservable 成功後Observable動作
   * @param errorObservable 失敗後Observable動作
   */
  public static delete(
    url: string,
    token: string | null,
    successObservable: (
      response: AjaxResponse<any>
    ) => Observable<UnknownAction>,
    errorObservable?: (error: any) => Observable<UnknownAction>
  ): Observable<UnknownAction> {
    return ajax.delete<any>(`${API_HOST_URL}${url}`, getApiHeaders(token)).pipe(
      mergeMap((response) => successObservable(response)),
      catchError((error) =>
        errorObservable
          ? errorObservable(error)
          : of(toastShowAjaxError({ error }))
      )
    );
  }
}

export default myAjax;

export function rxjsAjaxSetToken(
  token: string | null,
  successObservable: (response: AjaxResponse<any>) => Observable<UnknownAction>,
  errorObservable?: (error: any) => Observable<UnknownAction>
) {
  return ajax.post('/api/set-token', { idToken: token }).pipe(
    mergeMap((response) => successObservable(response)),
    catchError((error) =>
      errorObservable
        ? errorObservable(error)
        : of(toastShowAjaxError({ error }))
    )
  );
}

export function rxjsAjaxRemoveToken(
  successObservable: (response: AjaxResponse<any>) => Observable<UnknownAction>,
  errorObservable?: (error: any) => Observable<UnknownAction>
) {
  return ajax.post('/api/remove-token').pipe(
    mergeMap((response) => successObservable(response)),
    catchError((error) =>
      errorObservable
        ? errorObservable(error)
        : of(toastShowAjaxError({ error }))
    )
  );
}
