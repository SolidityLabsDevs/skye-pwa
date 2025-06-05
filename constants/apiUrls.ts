export const API = {
  AUTH: {
    SIGN_IN: '/api/auth/sign-in',
    SIGN_UP: '/api/auth/sign-up',

    LOGOUT: '/api/auth/logout',
    CODE: '/api/auth/code',
    SESSION: '/api/auth/session',
    TWITTER: '/api/auth/twitter',
  },

  STORAGE: {
    INDEX: '/api/storage',
    MY: '/api/storage/my',
  },

  ACCOUNT: {
    VERIFY_EMAIL: '/api/account/verify-email',
    GET_CODE: '/api/account/get-code',
  },

  USER: {
    AUDIO: {
      INDEX: '/api/user/audio',
    },
    ONBOARDING: {
      INDEX: '/api/user/onboarding',
    },
  },

  ADMIN: {
    INDEX: '/api/admin',
    TRACKS: {
      INDEX: '/api/admin/tracks',
    },
  },

  STOCKS: {
    INDEX: '/api/stocks',
  },
};
