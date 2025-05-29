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
    PAY: {
      INDEX: '/api/user/pay',
    },
    SCAN: {
      GPT: {
        TRANSCRIBE: '/api/user/scan/gpt/transcribe',
      },
    },
  },

  STOCKS: {
    INDEX: '/api/stocks',
  },
};
