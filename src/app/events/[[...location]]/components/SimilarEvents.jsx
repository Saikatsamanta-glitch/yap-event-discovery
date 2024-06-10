import { EventCarousel } from '@/components';
import { convertStringToUrlFormat, getTimeRange } from '@/components/utils';
import { getEvents } from '@/services';
import React from 'react';

export const SimilarEventList = async ({ category }) => {
  const similarEvents = await getEvents({
    query: {
      page_size: 4,
      category: convertStringToUrlFormat({ data: category?.name }),
      upcoming: getTimeRange('today')?.query?.today_current_date,
    },
  });

  return (
    <div className="similar-event__container">
      <div className="similar-event__slider">
        <EventCarousel
          dataQaSelector="event_details_page_similar_events"
          queries={{
            category: convertStringToUrlFormat({ data: category?.name }),
          }}
          events={similarEvents.data}
          title="Fast Selling Similar"
        />
      </div>
    </div>
  );
};

export default SimilarEventList;
