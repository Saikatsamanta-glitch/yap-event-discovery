import { EventTimeCategory, BodySearchBox } from '@/components';
import Events from '@/components/Events';
import {
  getMetadata,
  metaDataKeywords,
  generateCategoriesKeywords,
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
  const { title, description, keywords } = getMetadata(date, category);
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
  const categoriesKeywords = generateCategoriesKeywords({ category });
  const pageKeywords = category
    ? [...categoriesKeywords, keywords]
    : metaDataKeywords;
  return {
    title: title,
    description: description,
    keywords: pageKeywords,
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

export default async function Home({ searchParams, params }) {
  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <BodySearchBox />
      <EventTimeCategory
        searchParams={searchParams}
        params={params}
        dataQaSelector={'homepage'}
      />
      <Events searchParams={searchParams} />
    </div>
  );
}
