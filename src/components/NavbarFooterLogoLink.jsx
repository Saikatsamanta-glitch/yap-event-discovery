'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { clientCookiesUtils } from './utils';

const NavbarFooterLogoLink = ({ isNavbar = true }) => {
  const [cookiesUrl, setCookiesUrl] = useState();

  useEffect(() => {
    const url = clientCookiesUtils()?.get?.('x-url') || '';

    setCookiesUrl(url);
  }, []);
  return isNavbar ? (
    <a className="navbar-logo" href={cookiesUrl ? cookiesUrl : '/'}>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/yaplogo/Logo%20Light.svg`}
        alt="Yapsody Light Logo"
        width={166}
        height={40}
        className={'navbar-logo-light'}
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/yaplogo/Logo%20Dark.svg`}
        alt="Yapsody Dark Logo"
        width={166}
        height={40}
        className={'navbar-logo-dark'}
      />
    </a>
  ) : (
    <a
      href={cookiesUrl ? cookiesUrl : '/'}
      data-qa-selector="footer_logo_image"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/yaplogo/Logo%20Dark.svg`}
        alt="Yapsody Dark Logo"
        width={150}
        height={40}
        className={'footer__footer-logo'}
      />
    </a>
  );
};

export default NavbarFooterLogoLink;
