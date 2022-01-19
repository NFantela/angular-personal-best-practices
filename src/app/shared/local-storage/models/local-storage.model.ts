const APP_PREFIX = 'BPRACTICEAPP-';

type BaseAppPrefix = typeof APP_PREFIX;
type BaseCurrentAllowedLocalStorageFields = {
  siteName: string;
  currentUser: { name: string, email: string }
}

export type CurrentAllowedLocalStorageFields = {
  [KEY in keyof BaseCurrentAllowedLocalStorageFields as `${BaseAppPrefix}${KEY}`]: BaseCurrentAllowedLocalStorageFields[KEY]
}
