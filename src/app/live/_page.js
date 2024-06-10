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
      <EventTimeCategory page="/live" searchParams={searchParams} />
      <EventGenreCategory page="/live" searchParams={searchParams} />
      <EventGrid
        dataQaSelector="event_discovery_view_all_events_live_events"
        title="Must Attend Live"
        queries={{
          ...parseCoordinates,
          offline: true,
          ...queries,
        }}
      />
    </>
  );
}
