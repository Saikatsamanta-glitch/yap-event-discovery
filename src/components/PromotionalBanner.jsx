import React from 'react';
import Image from 'next/image';

const PromotionalBanner = () => {
  return (
    <div
      className="promotional-banner"
      data-qa-selector="promotional_banner_description"
    >
      <p className="promotional-banner__text">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/promo-icon.svg`}
          alt={'promo Icon'}
          width={18}
          height={16}
          className="promotional-banner__text__icon"
        />
        Hosting an event? Connect with us to sell event tickets online -
        <span>
          <a
            href="https://www.yapsody.com/ticketing/request-a-demo/?utm_campaign=header_eventdiscovery_contactsales"
            target="_blank"
            rel="noreferrer"
            className="promotional-banner__text__link"
          >
            Contact Sales
          </a>
        </span>
      </p>
    </div>
  );
};

export default PromotionalBanner;
