import type { UserInfo } from 'firebase/auth';
// import type { UserModel } from './user/User.model';

export interface AccountUserModel {
  uid: string | null;
  token: string | null;
  exp: number;

  providerId?: string;
  isAnonymously?: boolean;

  // data?: UserModel | null;
}

export interface AccountLinkModel {
  email: string | null;
  phoneNumber: string | null;
  facebookData: UserInfo | null;
  googleData: UserInfo | null;
}
