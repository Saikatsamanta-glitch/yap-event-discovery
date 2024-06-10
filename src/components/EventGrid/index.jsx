import React, { Suspense } from 'react';
import {
  getEvents,
  getEventsCount,
  getCitiesEvents,
  getCitiesEventsCount,
  getCountriesEventsCount,
  getCountriesEvents,
} from '@/services';
import { Heading, Flex } from '..';
import ContentLoader from '../ContentLoader';
import EventGridLoadMore from '../EventGridLoadMore';
import EmptyState from '../EmptyState';
import EventCard from '../EventCard';
// import { insertPromotionalImages } from '@/components/utils';

const EventGridLoader = () => {
  return (
    <div className="event-grid--container">
      {new Array(7).fill(1).map((_, index) => {
        return (
          <ContentLoader
            borderRadius="12px"
            key={index}
            width="200px"
            height="270px"
            style={{
              width: '100%',
            }}
          />
        );
      })}
    </div>
  );
};

const EventList = async ({
  queries,
  dataQaSelector,
  cityName = '',
  countryName = '',
}) => {
  let events;
  let eventCount;

  if (cityName) {
    events = await getCitiesEvents({
      cityName,
      query: queries,
    });

    eventCount = await getCitiesEventsCount({
      cityName,
      query: queries,
    });
  } else if (countryName && !cityName) {
    events = await getCountriesEvents({
      countryName,
      query: queries,
    });

    eventCount = await getCountriesEventsCount({
      countryName,
      query: queries,
    });
  } else {
    events = await getEvents({
      query: queries,
    });

    eventCount = await getEventsCount({
      query: queries,
    });
  }

  if (events.error || eventCount.error) {
    return (
      <EmptyState
        title="Failed to fetch events"
        subtitle="Please try reloading the page"
        illustration="no-search-result"
        alt="Something Went Wrong"
      />
    );
  }

  if (!eventCount.data) {
    return (
      <EmptyState
        dataQaSelector={`${dataQaSelector}_no_events_illustration`}
        subtitle="Houston, We Can't Find the Event!"
        illustration="no-search-result"
        alt="No Event"
      />
    );
  }

  // events = insertPromotionalImages({
  //   eventsArray: events?.data,
  //   isGridLoadMore: false,
  // });

  return (
    <>
      <Flex gap="20" flexDirection="column">
        <div className="event-grid--container">
          {events?.data?.map((event, index) => {
            return (
              <EventCard
                dataQaSelector={`${dataQaSelector}_event_${index + 1}`}
                gridView={true}
                key={event?.name}
                event={event}
              />
            );
          })}
          {/* {events?.map((event, index) => {
            return event?.type === 'promotional' ? (
              <PromotionalImage
                ctaUrl={
                  process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT ===
                  'production'
                    ? 'https://boxoffice.yapsody.com/ticketing/signup?utm_campaign=portal_eventdiscovery_ad_cta'
                    : 'https://boxoffice.yapsody.com/ticketing/signup'
                }
                gridView={true}
                dataQaSelector={`${dataQaSelector}_event_${index + 1}_card`}
              />
            ) : (
              <EventCard
                dataQaSelector={`${dataQaSelector}_event_${index + 1}`}
                gridView={true}
                key={event?.name}
                event={event}
              />
            );
          })} */}
        </div>
      </Flex>
      <Suspense fallback={<EventGridLoader />}>
        <EventGridLoadMore
          dataQaSelector={dataQaSelector}
          eventCount={eventCount.data}
          queries={queries}
          events={events}
          cityName={cityName}
          countryName={countryName}
        />
      </Suspense>
    </>
  );
};

const EventGrid = ({
  queries,
  title,
  dataQaSelector,
  cityName = '',
  countryName = '',
}) => {
  return (
    <div className="event-grid">
      {title ? (
        <Heading
          fancy
          level="2"
          className="event-grid__heading"
          dataQaSelector={`${dataQaSelector}_title`}
        >
          {title}
        </Heading>
      ) : null}
      <EventList
        queries={queries}
        dataQaSelector={dataQaSelector}
        cityName={cityName}
        countryName={countryName}
      />
    </div>
  );
};

export default EventGrid;
