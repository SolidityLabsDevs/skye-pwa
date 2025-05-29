'use client';
import { FC, memo, PropsWithChildren, useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import NextTopLoader from 'nextjs-toploader';

import { useScrollBlock } from 'hooks';
import { SplashScreen } from 'components/ui/SplashScreen';
import { appConfig } from 'config/appConfig';

import 'react-toastify/dist/ReactToastify.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/globals.sass';

type ClientLayoutProps = {
  withSplashScreen?: boolean;
};

export const ClientLayout: FC<PropsWithChildren<ClientLayoutProps>> = memo(
  ({ withSplashScreen = true, children }) => {
    const [blockScroll, allowScroll] = useScrollBlock();
    const [loading, setLoading] = useState(withSplashScreen);

    useEffect(() => {
      if (appConfig.FACEBOOK_PIXEL_ID) {
        import('react-facebook-pixel')
          .then(module => module.default)
          .then(ReactPixel => {
            ReactPixel.init(appConfig.FACEBOOK_PIXEL_ID);
            ReactPixel.pageView();
          });
      }
    }, []);

    useEffect(() => {
      loading && blockScroll();
      !loading && allowScroll();
    }, [loading]);

    return (
      <>
        {loading && <SplashScreen load={() => setLoading(false)} />}
        <NextTopLoader showSpinner={false} />
        {children}
        <CookieConsent
          buttonText="I understand"
          acceptOnScroll
          containerClasses="bg-neutralBg text-defaultText"
          buttonClasses="bg-onNeutralBg text-defaultText"
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </>
    );
  }
);
