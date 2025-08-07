import type { AjaxResponse } from 'rxjs/ajax';

export type CallbackFuncType = (
  error: any | null,
  response?: AjaxResponse<any> | any
) => void;
