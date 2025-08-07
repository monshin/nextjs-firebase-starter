export const IS_PROD =
  String(process.env.IS_PROD || '').toLowerCase() === 'true';

export const API_HOST_URL = process.env.API_HOST_URL || '';
