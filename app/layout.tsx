import Script from 'next/script';
import cn from 'classnames';
import { PropsWithChildren, FC, ReactElement, Suspense } from 'react';

import { ClientLayout } from 'components/providers/ClientLayout';
import { Providers } from 'components/providers/Providers';
import { customScrollbar } from 'constants/classNames';
import { appConfig } from 'config/appConfig';
import { getMetaTags } from 'helpers';

type LayoutProps = {
  modal: ReactElement;
  session: ReactElement;
};

// Components order:  Providers -> ClientLayout

export const metadata = getMetaTags();

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, session, modal }) => {
  return (
    <html lang="en">
      <head>
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/default.min.css" /> */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${appConfig.GOOGLE_ADSENSE_ACCOUNT}`}
          crossOrigin="anonymous"
        />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${appConfig.GOOGLE_ANALYTICS}`}
        />
        <Script id="google-analitycs">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${appConfig.GOOGLE_ANALYTICS}');
            `}
        </Script>
        <meta name="google-adsense-account" content={appConfig.GOOGLE_ADSENSE_ACCOUNT} />
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
      </head>
      <body
        className={cn('font-inter  dark theme-dark bg-neutralBg text-defaultText', customScrollbar)}
      >
        <Providers>
          <ClientLayout>
            {children}
            <Suspense fallback={<></>}>{modal}</Suspense>
            {session}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
