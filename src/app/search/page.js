import {
  generateSearchQuery,
  getTimeRange,
  metaDataKeywords,
  metaDataTitleSuffix,
} from '@/components/utils';
import SearchList, { searchByMap } from './SearchList';
import { BodySearchBox } from '@/components';
import { getEvents } from '@/services';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }, parent) {
  const searchTerm = searchParams?.q;
  const searchTermCapitalized =
    searchTerm?.charAt(0)?.toUpperCase() + searchTerm?.slice(1);

  const queries = generateSearchQuery({ searchParams });

  const queryParams = {
    ...queries,
    upcoming: getTimeRange('today')?.query?.today_current_date,
    [searchByMap[searchParams.type]]: searchParams?.q || '',
    page_size: 60,
  };

  const events = await getEvents({
    query: queryParams,
  });

  const itemMap = {
    event: {
      title: `${searchTermCapitalized} events ${metaDataTitleSuffix}`,
      description: `${searchTermCapitalized} Events. Secure your tickets for memorable moments. Get your tickets now!`,
    },
    artist: {
      title: `${searchTermCapitalized} events ${metaDataTitleSuffix}`,
      description: `${searchTermCapitalized} events. Secure your tickets for memorable moments. Get your tickets now!`,
    },
    venue: {
      title: `Events at ${searchTermCapitalized} ${metaDataTitleSuffix}`,
      description: `Events & things to do at ${searchTermCapitalized}. Secure your tickets for memorable moments. Get your tickets now!`,
    },
    organizer: {
      title: `Events by ${searchTermCapitalized} ${metaDataTitleSuffix}`,
      description: `Events by ${searchTermCapitalized}. Secure your tickets for memorable moments. Get your tickets now!`,
    },
  };

  const eventNotFoundMap = {
    event: {
      title: `${
        searchParams?.q ? `"${searchParams?.q}"` : null
      } Events Not Found ${metaDataTitleSuffix}`,
      description: `No results found for ${searchParams?.q} events. Please try searching something else`,
    },
    artist: {
      title: `${
        searchParams?.q ? `"${searchParams?.q}"` : null
      } Events Not Found ${metaDataTitleSuffix}
 `,
      description: `${searchParams?.q} events not found. Please try searching something else.`,
    },
    venue: {
      title: `Events at ${
        searchParams?.q ? `"${searchParams?.q}"` : null
      } Not Found ${metaDataTitleSuffix}`,
      description: `Events at ${searchParams?.q} not found. Please try searching something else.`,
    },
    organizer: {
      title: `Events by ${
        searchParams?.q ? `"${searchParams?.q}"` : null
      } Not Found ${metaDataTitleSuffix}`,
      description: `Events by ${searchParams?.q} not found. Please try searching something else.`,
    },
  };

  const title =
    events?.data?.length === 0
      ? eventNotFoundMap[searchParams?.type]?.title
      : itemMap[searchParams?.type]?.title;
  const description =
    events?.data?.length === 0
      ? eventNotFoundMap[searchParams?.type]?.description
      : itemMap[searchParams?.type]?.description;
  const previousImages = (await parent)?.openGraph?.images || [];
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

const SearchPage = ({ searchParams }) => {
  const queries = generateSearchQuery({ searchParams });

  return (
    <div
      style={{
        margin: 'auto',
        maxWidth: '1200px',
      }}
    >
      <BodySearchBox />
      <div className="search-page">
        <SearchList searchParams={searchParams} queries={queries} />
      </div>
    </div>
  );
};

export default SearchPage;
