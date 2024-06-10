import React, { Suspense } from 'react';

import { EventTimeCategory, Flex, Heading } from '@/components';
import { getEvents, getEventsCount } from '@/services';
import ContentLoader from '@/components/ContentLoader';
import EmptyState from '@/components/EmptyState';
import EventCard from '@/components/EventCard';
import EventGridLoadMore from '@/components/EventGridLoadMore';
import { getTimeRange } from '@/components/utils';
import { redirect } from 'next/navigation';

export const searchByMap = {
  event: 'search_by_event',
  venue: 'search_by_venue',
  artist: 'search_by_artist',
  organizer: 'search_by_organizer',
};

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

const EventList = async ({ queryParams, dataQaSelector, searchParams }) => {
  const events = await getEvents({
    query: queryParams,
  });

  const eventCount = await getEventsCount({
    query: queryParams,
  });

  const noResultFound =
    searchParams?.q && (!events?.data?.length || !eventCount?.data);

  const dropdownItemMap = {
    event: (
      <Heading
        fancy
        level="1"
        data-qa-selector="search_page_title_label"
        className="search-page__heading"
      >
        {searchParams?.q ? (
          <span className="search-page__highlight">
            &ldquo;{searchParams?.q}&ldquo;
          </span>
        ) : null}{' '}
        Events Not Found
      </Heading>
    ),
    artist: (
      <Heading
        fancy
        level="1"
        data-qa-selector="search_page_title_label"
        className="search-page__heading"
      >
        {' '}
        {searchParams?.q ? (
          <span className="search-page__highlight">
            &ldquo;{searchParams?.q}&ldquo;
          </span>
        ) : null}{' '}
        Events Not Found
      </Heading>
    ),
    venue: (
      <Heading
        fancy
        level="1"
        data-qa-selector="search_page_title_label"
        className="search-page__heading"
      >
        Events at{' '}
        {searchParams?.q ? (
          <span className="search-page__highlight">
            &ldquo;{searchParams?.q}&ldquo;
          </span>
        ) : null}{' '}
        Not Found
      </Heading>
    ),
    organizer: (
      <Heading
        fancy
        level="1"
        data-qa-selector="search_page_title_label"
        className="search-page__heading"
      >
        Events by{' '}
        {searchParams?.q ? (
          <span className="search-page__highlight">
            &ldquo;{searchParams?.q}&ldquo;
          </span>
        ) : null}
        {' Not Found'}
      </Heading>
    ),
  };

  if (searchParams?.q && !searchByMap[searchParams?.type]) {
    redirect(`/search?q=${searchParams?.q}&type=event`);
  }

  if (events?.error || eventCount?.error) {
    return (
      <EmptyState
        title="Failed to fetch events"
        subtitle="Please try reloading the page"
        illustration="no-search-result"
        alt="Something Went Wrong"
      />
    );
  }

  if ((!searchParams?.q && !events?.data?.length) || !searchParams?.type)
    return (
      <EmptyState
        title="Search"
        subtitle="Look up events, artists, venues & organizers"
        illustration="no-search-result"
        alt="Search Event"
        buttonTitle="Go Home"
        link="/"
        asLink={true}
      />
    );

  const getHeading = () => {
    return (
      <span
        data-qa-selector="search_page_title_label"
        className="search-page__heading"
      >
        <span>
          {noResultFound
            ? 'Search results not found for'
            : searchParams?.q
            ? null
            : 'Search'}{' '}
        </span>
        {searchParams?.type === 'organizer' ||
        searchParams?.type === 'venue' ? null : searchParams?.q ? (
          <span className="search-page__highlight">
            &ldquo;{searchParams?.q}&ldquo;
          </span>
        ) : null}
        {
          <>
            <span>{noResultFound || searchParams?.q ? ` Events` : null}</span>
            <span className="event-time-category__heading-text">
              {searchParams?.type === 'organizer'
                ? ' by '
                : searchParams?.type === 'venue'
                ? ' at '
                : ' '}
            </span>
          </>
        }

        {searchParams?.type === 'organizer' ||
        searchParams?.type === 'venue' ? (
          searchParams?.q ? (
            <span className="search-page__highlight">
              &ldquo;{searchParams?.q}&ldquo;
            </span>
          ) : null
        ) : null}
      </span>
    );
  };

  return (
    <>
      <Flex flexDirection="column" gap="20">
        {noResultFound && !searchParams?.date ? (
          <div className="search-page__heading-wrapper">
            {dropdownItemMap[searchParams?.type]}
          </div>
        ) : (
          <EventTimeCategory
            withBackground={false}
            page="/search"
            fancy={true}
            searchParams={searchParams}
            showCategory={!noResultFound || searchParams?.time}
            heading={getHeading()}
          />
        )}
        {noResultFound ? (
          <EmptyState
            dataQaSelector="search_page_no_results_illustration"
            illustration="no-search-result"
            alt="No Event"
            subtitle="Houston, We Can't Find the Event!"
            buttonTitle="View All Events"
            height={160}
            width={160}
            link="/"
            asLink={true}
          />
        ) : (
          <div className="search-page__grid">
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
          </div>
        )}
      </Flex>
      {!noResultFound ? (
        <Suspense fallback={<EventGridLoader />}>
          <EventGridLoadMore
            dataQaSelector={dataQaSelector}
            eventCount={eventCount?.data}
            queries={queryParams}
            events={events?.data}
            className="search-page__grid"
          />
        </Suspense>
      ) : null}
    </>
  );
};

const SearchList = ({ searchParams, queries }) => {
  const searchQuery = encodeURIComponent(searchParams?.q);
  const queryParams = {
    ...queries,
    upcoming: getTimeRange('today')?.query?.today_current_date,
    [searchByMap[searchParams?.type]]: searchQuery || '',
    page_size: 60,
  };

  return (
    <EventList
      queryParams={queryParams}
      dataQaSelector={`search_page`}
      searchParams={searchParams}
    />
  );
};

export default SearchList;
