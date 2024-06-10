import { EventGenreCategory, EventTimeCategory } from '@/components';
import EventGrid from '@/components/EventGrid';
import { generateSearchQuery, getTimeRange } from '@/components/utils';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function Home({ searchParams }) {
  const queries = generateSearchQuery({ searchParams });
  const cookieStore = cookies();
  const locationCoordinates = cookieStore.get('location_coordinates');
  const parseCoordinates = JSON.parse(locationCoordinates?.value || '{}') || {};

  return (
    <>
      <EventTimeCategory page="/upcoming" searchParams={searchParams} />
      <EventGenreCategory page="/upcoming" searchParams={searchParams} />
      <EventGrid
        dataQaSelector="event_discovery_view_all_events_upcoming_events"
        title="Upcoming"
        queries={{
          ...queries,
          ...parseCoordinates,
          upcoming: !searchParams?.time
            ? getTimeRange('today')?.query?.today_current_date
            : '',
        }}
      />
    </>
  );
}
