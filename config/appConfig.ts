import { THEME_COLORS, THEME_MODES } from 'constants/vars';

const isProd = process.env.NODE_ENV === 'production';

export const appConfig = Object.freeze({
  APP_NAME: 'Skye',

  LOGO: '/images/logo.png',

  SITE_URL: isProd ? 'https://skye-pwa.vercel.app' : 'http://localhost:3000', // only this format, don`t put "/" as last character in string

  GOOGLE_ADSENSE_ACCOUNT: 'ca-pub-0000000000000000',
  GOOGLE_ANALYTICS: 'G-XXXXXXXXXX',

  FACEBOOK_PIXEL_ID: 'xxx',

  METADATA: {
    title: 'Skye',
    description: 'Skye.',
    keywords: ['Skye'], // string[]
    locale: 'en_US',
  },

  ENABLE_PASSWORD_RESET: false,
  VERIFY_EMAIL_REQUIRED: false,
  USE_PWA: false,

  DEFAULT_THEME_MODE: 'dark' as (typeof THEME_MODES)[number],
  DEFAULT_THEME_COLOR: 'default' as (typeof THEME_COLORS)[number],

  // don`t change
  IS_PROD: isProd,
  // don`t change
  OG_TWITTER_WIDTH: 800,
  // don`t change
  OG_TWITTER_HEIGHT: 418,
  // don`t change
  STORE_LOCALE_KEY: 'user-locale',
});
