import React from 'react';
import { generateSearchQuery, getTimeRange } from './utils';
import EventGrid from './EventGrid';

const AllEvents = async ({ searchParams }) => {
  const queries = generateSearchQuery({ searchParams });

  return (
    <div>
      <EventGrid
        dataQaSelector="homepage"
        title={''}
        queries={{
          ...queries,
          upcoming: !searchParams?.date
            ? getTimeRange('today')?.query?.today_current_date
            : '',
          page_size: 60,
        }}
      />
    </div>
  );
};

const Events = ({ searchParams }) => {
  return <AllEvents searchParams={searchParams} />;
};

export default Events;
