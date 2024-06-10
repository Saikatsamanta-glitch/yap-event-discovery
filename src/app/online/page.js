import { EventTimeCategory } from '@/components';
import EventGrid from '@/components/EventGrid';
import {
  generateSearchQuery,
  getOnlinePageMetadata,
  metaDataKeywords,
  getTimeRange,
  convertStringToUrlFormat,
} from '@/components/utils';
import { getEventCategories } from '@/services';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }, parent) {
  let { date, category } = searchParams;
  const catagoriesData = await getEventCategories();

  category = category
    ? catagoriesData?.categories
        ?.find(
          (category) =>
            searchParams?.category ===
            convertStringToUrlFormat({ data: category?.name })
        )
        ?.name?.replace(/\s/g, '')
        ?.toLowerCase()
    : '';
  const { title, description } = getOnlinePageMetadata(date, category);
  const previousImages = (await parent).openGraph?.images || [];
  const openGraphEventImage = [
    {
      type: 'image/png',
      width: 1200,
      height: 630,
      url: previousImages?.[0]?.url,
      alt: 'Yapody Events',
    },
  ];
  return {
    title: title,
    description: description,
    keywords: metaDataKeywords,
    openGraph: {
      title: title,
      description: description,
      images: openGraphEventImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: openGraphEventImage,
    },
  };
}

export default function Home({ searchParams }) {
  const queries = generateSearchQuery({ searchParams });

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <EventTimeCategory
        page="/online"
        searchParams={searchParams}
        dataQaSelector="online_events_page"
      />
      <EventGrid
        dataQaSelector="online_events_page"
        queries={{
          ...queries,
          online: true,
          upcoming: !searchParams?.date
            ? getTimeRange('today')?.query?.today_current_date
            : '',
        }}
      />
    </div>
  );
}
