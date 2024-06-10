import React from 'react';
import { BodySearchBox, Heading } from '@/components';
import EventsList from './Components/EventsList';
import Image from 'next/image';
import { getImageURL, getTimeRange } from '@/components/utils';
import {
  getDiscoveryEventsData,
  getDiscoveryEventsCountData,
} from '@/services';
import NotFound from '@/app/not-found';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }, parent) {
  const { error, data } = await getDiscoveryEventsData({
    slug: params?.specificEvent,
  });

  const title = data?.discovery?.meta_title;
  const description = data?.discovery?.meta_description;
  const metaDataKeywords = data?.discovery?.meta_keywords
    ? [data?.discovery?.meta_keywords]
    : [];

  const imgURL =
    !error && data?.discovery?.og_image
      ? getImageURL({
          key: data?.discovery?.og_image,
          width: 1000,
          height: 1000,
        })
      : null;

  const previousImages = (await parent).openGraph?.images || [];

  const openGraphEventImage = imgURL
    ? [
        {
          type: 'image/png',
          width: 1200,
          height: 630,
          url: imgURL,
          alt: 'Yapody Events',
        },
      ]
    : [
        {
          type: 'image/png',
          width: 1200,
          height: 630,
          url: previousImages?.[0]?.url,
          alt: 'Yapody Events',
        },
      ];

  return {
    title: title,
    description: description,
    keywords: metaDataKeywords,
    openGraph: {
      title: title,
      description: description,
      images: openGraphEventImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: openGraphEventImage,
    },
  };
}

const PageBannerandTitle = ({ bannerDetails = {} }) => {
  const { title, subtitle, description, banner_image, mobile_banner_image } =
    bannerDetails;

  const desktopImageUrl = getImageURL({
    key: banner_image,
    width: 1500,
    height: 1500,
  });

  const mobileImageUrl = getImageURL({
    key: mobile_banner_image,
    width: 1000,
    height: 1000,
  });

  return (
    <div
      className={'specific-events--bg'}
      style={{
        position: 'relative',
      }}
    >
      <Image
        src={desktopImageUrl}
        fill={true}
        alt={'Background Desktop Image'}
        className={'specific-events--bg-desktop'}
        data-qa-selector={'discovery_page_banner_image'}
      />
      <Image
        src={mobileImageUrl}
        fill={true}
        alt={'Background Mobile Image'}
        className={'specific-events--bg-mobile'}
        data-qa-selector={'discovery_page_mobile_banner_image'}
      />
      <div className="specific-events__headings">
        <Heading
          fancy={false}
          level="1"
          className="specific-events__headings__h1"
          dataQaSelector="discovery_page_title_label"
        >
          {title}
        </Heading>
        <Heading
          fancy={false}
          level="2"
          className="specific-events__headings__h2"
          dataQaSelector="discovery_page_subtitle_label"
        >
          {subtitle}
        </Heading>
        <Heading
          fancy={false}
          level="3"
          className="specific-events__headings__h3"
          dataQaSelector="discovery_page_description_label"
        >
          {description}
        </Heading>
      </div>
    </div>
  );
};

const SpecificEvents = async ({ params, searchParams }) => {
  const queries = {
    upcoming: !searchParams?.date
      ? getTimeRange('today')?.query?.today_current_date
      : '',
  };

  const { error, data } = await getDiscoveryEventsData({
    slug: params?.specificEvent,
    query: queries,
  });

  const eventCount = await getDiscoveryEventsCountData({
    slug: params?.specificEvent,
    query: queries,
  });

  if (error?.code === 404 || eventCount?.error?.code === 404) {
    return <NotFound />;
  }

  return (
    <div className="specific-events">
      <BodySearchBox />
      {!error ? <PageBannerandTitle bannerDetails={data?.discovery} /> : null}
      <div className="specific-events--events-list">
        <EventsList
          dataQaSelector={'discovery_page'}
          events={data?.events}
          eventCount={eventCount}
          queries={queries}
          error={error}
          slug={params?.specificEvent}
        />
      </div>
    </div>
  );
};

export default SpecificEvents;
