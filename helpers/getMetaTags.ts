import { appConfig } from 'config/appConfig';
import { Metadata } from 'next';
import { exclude, realMerge } from 'utils';

// https://ogp.me/
// https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

export const getMetaTags = (metadata?: Metadata): Metadata => {
  const {
    METADATA: { title: _title, description, keywords, locale },
  } = appConfig;

  const title = metadata?.title ? `${metadata?.title} | ${_title}` : _title;

  const url = `${appConfig.SITE_URL}/images/twitter_og_image.png`;

  return realMerge(
    {
      title,
      description,
      keywords,
      applicationName: _title,
      manifest: '/manifest.json',
      icons: [
        {
          rel: 'mask-icon',
          url: '/favicon/safari-pinned-tab.svg',
        },
        {
          rel: 'apple-touch-icon',
          url: '/favicon/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          url: '/favicon/favicon-32x32.png',
        },
        {
          rel: 'icon',
          url: '/favicon/favicon-16x16.png',
        },
      ],
      twitter: {
        title,
        description,
        images: [
          {
            url,
            width: appConfig.OG_TWITTER_WIDTH,
            height: appConfig.OG_TWITTER_WIDTH,
          },
        ],
        url: '',
        card: 'summary_large_image',
        site: '@',
        creator: '@',
      },
      openGraph: {
        title,
        description,
        locale,
        siteName: _title,
        type: 'website',
        images: [
          {
            url,
            width: appConfig.OG_TWITTER_WIDTH,
            height: appConfig.OG_TWITTER_WIDTH,
          },
        ],
      },
    } as Metadata,
    exclude(metadata || {}, ['title'])
  );
};
