'use client';
import React, { useState } from 'react';
import EventCard from './EventCard';
import { Button, Flex } from '.';
import { getEvents, getCitiesEvents, getCountriesEvents } from '@/services';
import cx from 'classnames';

// import { insertPromotionalImages } from './utils';

const EventGridLoadMore = ({
  queries,
  eventCount,
  dataQaSelector,
  className = '',
  cityName = '',
  countryName = '',
}) => {
  const [eventList, setEventList] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const noOfPages = Math.ceil(eventCount / 60);
  const [page, setPage] = useState(1);

  function handleLoadMore() {
    const nextPage = Math.min(page + 1, noOfPages);
    setPage(nextPage);
    setIsLoadingMore(true);

    let fetchData;
    if (cityName) {
      fetchData = getCitiesEvents({
        cityName,
        query: { ...queries, page_no: nextPage },
      });
    } else if (countryName && !cityName) {
      fetchData = getCountriesEvents({
        countryName,
        query: { ...queries, page_no: nextPage },
      });
    } else {
      fetchData = getEvents({ query: { ...queries, page_no: nextPage } });
    }

    fetchData
      .then((res) => {
        const eventData = res?.data || [];
        // const eventDataWithPromotion = insertPromotionalImages({
        //   eventsArray: eventData,
        //   isGridLoadMore: true,
        // });
        setEventList((prevEventList) => [...prevEventList, ...eventData]);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }

  const classNames = cx({
    'event-grid--container': true,
    [className]: Boolean(className),
  });

  return (
    <Flex flexDirection="column">
      <div className={classNames}>
        {eventList?.map((event, index) => {
          return event?.type === 'promotional' ? null : (
            <EventCard
              dataQaSelector={`${dataQaSelector}_event_${index + 1}`}
              gridView={true}
              key={event?.name}
              event={event}
            />
          );
        })}
        {/* {eventList?.map((event, index) => {
          return event?.type === 'promotional' ? (
            <PromotionalImage
              ctaUrl={
                process.env.NEXT_PUBLIC_APPLICATION_ENVIRONMENT === 'production'
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
      {page < noOfPages ? (
        <Flex justifyContent="center">
          <Button
            disabled={isLoadingMore}
            onClick={handleLoadMore}
            dataQaSelector={`${dataQaSelector}_load_more`}
          >
            {isLoadingMore ? 'Loading More...' : 'Load More Events'}
          </Button>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default EventGridLoadMore;
