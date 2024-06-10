import { EventTimeCategory, BodySearchBox } from '@/components';
import EventGrid from '@/components/EventGrid';
import {
  getMetadata,
  generateLocationandTimeKeywords,
  generateSearchQuery,
  getTimeRange,
  convertStringToUrlFormat,
} from '@/components/utils';
import { getEventCategories } from '@/services';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams, params }, parent) {
  let { date, category } = searchParams;
  const { cityName, countryName } = params;

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
  const { title, description } = getMetadata(
    date,
    category,
    cityName,
    countryName
  );
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

  const locationKeyWords = generateLocationandTimeKeywords({
    date,
    category,
    cityName,
    countryName,
  });

  return {
    title: title,
    description: description,
    keywords: locationKeyWords,
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

export default function Country({ searchParams, params }) {
  const queries = generateSearchQuery({ searchParams });

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <BodySearchBox />
      <EventTimeCategory
        searchParams={searchParams}
        params={params}
        page={`/country/${params?.countryName}`}
      />
      <EventGrid
        dataQaSelector="homepage"
        queries={{
          ...queries,
          upcoming: !searchParams?.date
            ? getTimeRange('today')?.query?.today_current_date
            : '',
        }}
        countryName={params?.countryName}
      />
    </div>
  );
}
