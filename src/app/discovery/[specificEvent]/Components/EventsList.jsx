import React, { Suspense } from 'react';
import EmptyState from '@/components/EmptyState';
import EventCard from '@/components/EventCard';
import ContentLoader from '@/components/ContentLoader';
import { Flex } from '@/components';
import EventLoadMore from './EventLoadMore';

const EventLoader = () => {
  return (
    <div className="specific-events--container">
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

const EventsList = async ({
  dataQaSelector,
  eventCount,
  queries,
  events,
  error,
  slug,
}) => {
  if (error || eventCount?.error) {
    return (
      <EmptyState
        title="Failed to fetch events"
        subtitle="Please try reloading the page"
        illustration="no-search-result"
        alt="Something Went Wrong"
      />
    );
  }

  if (!eventCount?.data) {
    return (
      <EmptyState
        dataQaSelector={`${dataQaSelector}_no_events_illustration`}
        subtitle="Houston, We Can't Find the Event!"
        illustration="no-search-result"
        alt="No Event"
      />
    );
  }

  return (
    <>
      <Flex gap="20" flexDirection="column">
        <div className="specific-events--container">
          {events?.map((event, index) => {
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
      </Flex>
      <Suspense fallback={<EventLoader />}>
        <EventLoadMore
          dataQaSelector={dataQaSelector}
          eventCount={eventCount?.data}
          queries={queries}
          events={events}
          slug={slug}
        />
      </Suspense>
    </>
  );
};

export default EventsList;
