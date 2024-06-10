'use client';
import { PreviousButtonIcon, NextButtonIcon } from '../Icons';
import React, { Suspense, useState, useEffect } from 'react';
import ContentLoader from '../ContentLoader';
import { getEventBanners } from '@/services';
import ResponsiveCarousel from '../ResponsiveCarousel';
import Image from 'next/image';
import { getImageURL } from '@/components/utils';

const ResponsiveCarouselLoader = () => {
  return (
    <ContentLoader
      className={'banner-carousel-loader'}
      width={'100%'}
      height={400}
      style={{
        maxWidth: '100%',
        backgroundImage: 'none',
      }}
      borderRadius="4px"
    />
  );
};

const CustomLeftArrow = ({ onClick }) => (
  <button onClick={() => onClick()} className="custom-left-arrow">
    <PreviousButtonIcon className={'custom-arrow-icon'} />
  </button>
);
const CustomRightArrow = ({ onClick }) => {
  return (
    <button onClick={() => onClick()} className="custom-right-arrow">
      <NextButtonIcon className={'custom-arrow-icon'} />
    </button>
  );
};

const CarouselImages = () => {
  const [eventsBannerData, setEventsBannerData] = useState([]);
  const [eventsBannerLoading, setEventsBannerLoading] = useState(false);

  useEffect(() => {
    setEventsBannerLoading(true);
    async function fetchData() {
      const data = await getEventBanners({
        query: {
          page_size: 10,
        },
      });
      setEventsBannerData(data);
      setEventsBannerLoading(false);
    }

    fetchData();
  }, []);

  const bannerData = eventsBannerData?.data?.map((banner) => ({
    image: getImageURL({
      key: banner?.image_key,
      width: 2000,
      height: 1000,
    }),
    bannerLink: banner?.url,
  }));

  if (eventsBannerLoading) {
    return <ResponsiveCarouselLoader />;
  }

  if (eventsBannerData?.error) {
    return null;
  }

  return bannerData && bannerData?.length ? (
    <ResponsiveCarousel
      CustomRightArrow={CustomRightArrow}
      CustomLeftArrow={CustomLeftArrow}
      images={[]}
      carouselclassName={'banner-carousel'}
    >
      {bannerData.map((banner, index) => {
        return (
          <a key={index} href={banner?.bannerLink}>
            <Image
              className={'banner-carousel-image'}
              src={banner?.image}
              alt={index}
              sizes="100vw"
              width={100}
              height={400}
            />
          </a>
        );
      })}
    </ResponsiveCarousel>
  ) : null;
};

const BannerCarousel = () => {
  return (
    <Suspense fallback={<ResponsiveCarouselLoader />}>
      <CarouselImages />
    </Suspense>
  );
};

export default BannerCarousel;
