import { createAction } from '@reduxjs/toolkit';
import type { ToastVariantType } from '@/enums/toast.enum';

/*
 * 顯示 Toast 通知訊息
 */
export const toastShow = createAction<{
  text: string;
  variant?: ToastVariantType;
}>('toast/SHOW');

/**
 * 顯示 Ajax 錯誤 Toast 通知訊息
 */
export const toastShowAjaxError = createAction<{ error: XMLHttpRequest }>(
  'toast/SHOW_AJAX_ERROR',
);
