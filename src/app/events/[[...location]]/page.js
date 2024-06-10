/* eslint-disable @next/next/no-img-element */
import { Badge, Heading, LazyImage, BodySearchBox } from '@/components';
import EmptyState from '@/components/EmptyState';
import {
  getImageURL,
  generateEventStructureData,
  getLocalDateFromUTC,
  getTimeZoneFormattedDate,
  getCategoryImage,
  getIsEventOverInfo,
  getDecodedText,
  hasHtmlEntities,
  getEventOffersDetails,
  metaDataTitleSuffix,
  capitalizeWords,
} from '@/components/utils';
import { getEventById } from '@/services';
import StructuredData from '@/components/StructuredData';
import { redirect } from 'next/navigation';
import { convertStringToUrlFormat } from '@/components/utils';
import EventDetailCard, { Tickets } from './components/EventDetailCard';
import { SimilarEventList } from './components/SimilarEvents';
import PastEventBanner from './components/PastEventBanner';
import { EventDetail } from './components/EventDetails';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }, parent) {
  let title = '';
  let description = '';

  const eventIdAndName = params?.location?.[0]?.split('-');
  const eventId = eventIdAndName?.[0];

  const eventName = eventIdAndName?.slice(1)?.join(' ');
  const { error, data } = await getEventById({ id: eventId });

  const localDate = getLocalDateFromUTC({
    utcDate: data?.start_date || '',
    utcOffset: data?.start_date_tz_offset || '',
  });

  const timeZoneFormattedDate = getTimeZoneFormattedDate({
    localDate,
    format: 'MMM D | h:mm a',
  });

  const decodedEventLocation = getDecodedText({ text: data?.location?.name });
  const capitalizedLocation = decodedEventLocation
    ? capitalizeWords(decodedEventLocation)
    : '';

  const imgURL =
    !error && data?.image_url
      ? getImageURL({
          key: data?.image_url,
          width: 1000,
          height: 1000,
        })
      : getCategoryImage({
          categoryName: data?.category?.name,
        });

  const pageTitle = data
    ? hasHtmlEntities(data?.name)
      ? getDecodedText({ text: data?.name })
      : data?.name
    : `Event Not Found, ${capitalizeWords(eventName)}`;

  title = `${pageTitle}${
    capitalizedLocation ? `, ${capitalizedLocation}` : ''
  }${
    timeZoneFormattedDate ? `, ${timeZoneFormattedDate}` : ''
  } ${metaDataTitleSuffix}`;
  description = data
    ? `Book your spots for ${pageTitle} happening at ${capitalizedLocation} on ${timeZoneFormattedDate}. Buy Tickets, Price information.`
    : `${pageTitle}. Explore More Events on Yapsody Events.`;
  const previousImages = (await parent).openGraph?.images || [];

  const openGraphEventImage =
    !error && !imgURL?.includes('event_fallback.jpg')
      ? [
          {
            url: imgURL,
            width: 1200,
            height: 630,
            alt: pageTitle,
            type: 'image/png',
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

  const eventKeywords = [
    [
      `Best Events & Activities in ${capitalizedLocation}`,
      `Explore upcoming Concerts in ${capitalizedLocation}`,
      `${capitalizedLocation} Events`,
      `Sports events`,
      `current events in ${capitalizedLocation}`,
      `get local events in ${capitalizedLocation}`,
      `event site`,
      `daily events in ${capitalizedLocation}`,
      `forthcoming events in ${capitalizedLocation}`,
      `special events in ${capitalizedLocation}`,
      `ongoing events in ${capitalizedLocation}`,
      `events out of ${capitalizedLocation}`,
      `adventure in ${capitalizedLocation}`,
      `${capitalizedLocation}`,
      `concerts in ${capitalizedLocation}`,
      `events in ${capitalizedLocation} today`,
      `${capitalizedLocation} upcoming events`,
      `upcoming events in ${capitalizedLocation}`,
      `events in ${capitalizedLocation} this weekend`,
      `Free Events in ${capitalizedLocation}`,
      `music events in ${capitalizedLocation}`,
      `things to do in ${capitalizedLocation}`,
      `${capitalizedLocation} festival`,
      `exhibitions in ${capitalizedLocation}`,
      `${capitalizedLocation} nightlife`,
      `Music Events in ${capitalizedLocation}`,
      `Social Events in ${capitalizedLocation}`,
      `Dance Events in ${capitalizedLocation}`,
      `Comedy Events in ${capitalizedLocation}`,
      `Education Events in ${capitalizedLocation}`,
      `Business Events in ${capitalizedLocation}`,
      `Buy Tickets`,
      `Price information`,
    ],
  ];

  return {
    title: title,
    description: description,
    keywords: eventKeywords,
    openGraph: {
      title: pageTitle,
      description: description,
      images: openGraphEventImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description,
      images: openGraphEventImage,
    },
  };
}

const EventDetailPage = async ({ params, searchParams }) => {
  const eventId = params?.location?.[0]?.split('-')?.[0];

  const { error, data } = await getEventById({ id: eventId });

  if (error) {
    if (error?.code === 404 || !eventId) {
      return (
        <EmptyState
          title="Event not found"
          subtitle="Event doesn't exist"
          illustration="no-search-result"
          alt="Event not found"
        />
      );
    } else {
      return (
        <EmptyState
          title="Failed to fetch event"
          subtitle="Please try reloading the page"
          illustration="no-search-result"
          alt="Something Went Wrong"
        />
      );
    }
  }

  const eventName = data?.name
    ? convertStringToUrlFormat({ data: data?.name })
    : '';

  if (
    (eventId &&
      data?.name &&
      params?.location?.[0] !== `${eventId}-${eventName}`) ||
    Object.keys(searchParams)?.length
  ) {
    redirect(`/events/${eventId}-${eventName}`);
  }

  const eventLocation = data?.location;
  const category = data?.category;
  const organizer = data?.organizers?.[0];
  const artists = data?.artists;
  const sitemap = data?.sitemaps;

  const imgURL = data?.image_url
    ? getImageURL({
        key: data.image_url,
        width: 1000,
        height: 1000,
      })
    : getCategoryImage({
        categoryName: data?.category?.name,
      });

  const schemaData = generateEventStructureData({ eventData: data });

  const localDate = getLocalDateFromUTC({
    utcDate: data?.start_date || '',
    utcOffset: data?.start_date_tz_offset || '',
  });

  const timeZoneFormattedDate = getTimeZoneFormattedDate({
    localDate,
    format: 'MMM D | h:mm a',
  });

  const eventEndDate = data?.end_date || data?.start_date || '';

  const endLocalDate = getLocalDateFromUTC({
    utcDate: eventEndDate || '',
    utcOffset: data?.start_date_tz_offset || '',
  });

  const formattedEventEndDate = endLocalDate
    ? getTimeZoneFormattedDate({
        localDate: endLocalDate,
        format: 'D MMM | h:mm a',
      })
    : '';

  const isEventOver = getIsEventOverInfo({
    eventEndDate,
    utcOffset: data?.start_date_timezone?.utc_offset || '',
  });

  const price = getEventOffersDetails(
    data.ticket_offers,
    data?.sitemaps[0]?.name
  );

  const decodedEventName = getDecodedText({ text: data?.name });
  const decodedEventLocation = getDecodedText({ text: eventLocation?.name });

  const eventDetailInfoProps = {
    price,
    formattedEventEndDate,
    decodedEventName,
    data,
    eventName,
    isEventOver,
    sitemap,
  };

  return (
    <>
      <BodySearchBox />
      {isEventOver && <PastEventBanner category={category} />}
      <div
        className="event-detail"
        data-qa-selector="event_discovery_event_details_whole_page"
        style={{ paddingTop: isEventOver ? '0px' : '40px' }}
      >
        <StructuredData data={schemaData} />
        <div className="event-detail-card y-container">
          <div className="event-detail-card--left">
            <div className="event-detail-card--image-wrapper">
              <div className="event-detail-card--image">
                <LazyImage
                  dataQaSelector="event_discovery_event_details_event"
                  src={imgURL}
                  className={'event-detail-card--image--blur-image'}
                  alt="event-image"
                  fill
                />
                <img
                  src={imgURL}
                  className={'event-detail-card--image--normal-image'}
                  alt="event"
                  data-qa-selector="event_details_page_event_image"
                />
                {category ? (
                  <Badge
                    dataQaSelector="event_details_page_event_category_label"
                    className="event-detail-card--image__tag"
                  >
                    {category?.name}
                  </Badge>
                ) : null}
              </div>
            </div>
            <EventDetail
              event={data}
              artists={artists}
              organizer={organizer}
              decodedEventLocation={decodedEventLocation}
              timeZoneFormattedDate={timeZoneFormattedDate}
              {...eventDetailInfoProps}
            />
          </div>
          <div className="event-detail-card--right">
            <EventDetailCard
              heading={
                <Heading
                  level="1"
                  dataQaSelector="event_details_page_event_title_label"
                  className="event-detail-card--info__heading"
                >
                  {decodedEventName}
                </Heading>
              }
              timeZoneFormattedDate={timeZoneFormattedDate}
              decodedEventLocation={decodedEventLocation}
              {...eventDetailInfoProps}
            />
          </div>
        </div>

        {isEventOver ? null : (
          <Tickets sitemap={sitemap} forMobileView={true} presetKey="mobile_" />
        )}
        <SimilarEventList category={category} />
      </div>
    </>
  );
};

export default EventDetailPage;
