import { EventGenreCategory, EventTimeCategory } from '@/components';
import EventGrid from '@/components/EventGrid';
import { generateSearchQuery } from '@/components/utils';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default function Home({ searchParams }) {
  const queries = generateSearchQuery({ searchParams });
  const cookieStore = cookies();
  const locationCoordinates = cookieStore.get('location_coordinates');
  const parseCoordinates = JSON.parse(locationCoordinates?.value || '{}') || {};

  return (
    <>
      <EventTimeCategory page="/free" searchParams={searchParams} />
      <EventGenreCategory page="/free" searchParams={searchParams} />
      <EventGrid
        title="Free"
        dataQaSelector="event_discovery_view_all_events_free_events"
        queries={{
          ...parseCoordinates,
          free: true,
          ...queries,
        }}
      />
    </>
  );
}
