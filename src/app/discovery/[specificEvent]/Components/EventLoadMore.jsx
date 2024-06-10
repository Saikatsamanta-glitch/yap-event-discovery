'use client';
import React, { useState } from 'react';
import EventCard from '@/components/EventCard';
import { Button, Flex } from '@/components';
import { getDiscoveryEventsData } from '@/services';
import cx from 'classnames';

const EventLoadMore = ({
  queries,
  eventCount,
  dataQaSelector,
  className = '',
  slug,
}) => {
  const [eventList, setEventList] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const noOfPages = Math.ceil(eventCount / 102);
  const [page, setPage] = useState(1);

  function handleLoadMore() {
    const nextPage = Math.min(page + 1, noOfPages);
    setPage(nextPage);
    setIsLoadingMore(true);

    getDiscoveryEventsData({
      slug: slug,
      query: {
        ...queries,
        page_no: nextPage,
      },
    })
      .then((res) => {
        setEventList((s) => [...s, ...(res?.data?.events || {})]);
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }

  const classNames = cx({
    'specific-events--container': true,
    [className]: Boolean(className),
  });

  return (
    <Flex flexDirection="column">
      <div className={classNames}>
        {eventList?.map((event, index) => {
          return (
            <EventCard
              dataQaSelector={`${dataQaSelector}_event_${index + 1}`}
              gridView={true}
              key={event?.name}
              event={event}
            />
          );
        })}
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

export default EventLoadMore;
