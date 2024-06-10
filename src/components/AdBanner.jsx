'use client';
import { useEffect } from 'react';
import React from 'react';
import cx from 'classnames';
import { usePathname } from 'next/navigation';

const AdBanner = ({ className, dataQaSelector, height }) => {
  const pathName = usePathname();

  const classNames = cx({
    'ad-banner': true,
    [className]: Boolean(className),
  });

  const [shouldHide, setShouldHide] = React.useState(false);

  useEffect(() => {
    const adContainer = document.querySelector('.ad-banner');

    if (adContainer) {
      const insElement = adContainer.querySelector('ins.adsbygoogle');
      const iframeElement = adContainer.querySelector('ins > iframe');

      if (
        insElement &&
        (insElement.dataset.adStatus === 'unfilled' ||
          insElement.innerHTML.trim() === '' ||
          iframeElement)
      ) {
        setShouldHide(true);
      }
    }
  }, []);

  useEffect(() => {
    const scriptElement = document.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}"]`
    );

    const handleScriptLoad = () => {
      try {
        if (
          typeof window !== 'undefined' &&
          window.adsbygoogle &&
          !adsbygoogle.loaded
        ) {
          (adsbygoogle = window.adsbygoogle || []).push({});
        } else {
          scriptElement?.addEventListener('load', handleScriptLoad);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error is adsense', error);
      }
    };

    handleScriptLoad();

    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener('load', handleScriptLoad);
      }
    };
  }, [pathName]);

  if (process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT === 'production') {
    return null;
  }

  if (shouldHide) {
    return null;
  }

  return (
    <div
      className={classNames}
      data-qa-selector={dataQaSelector}
      style={{ height: height }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
