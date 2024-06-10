import { Flex, Heading, BodySearchBox } from '@/components';
import Image from 'next/image';
import CityList from '@/components/CityList';
import { getEventCountries } from '@/services';
import {
  generateLocationandTimeKeywords,
  capitalizeWords,
  metaDataTitleSuffix,
  getImageURL,
} from '@/components/utils';
import NotFound from '@/app/not-found';

export async function generateMetadata({ params }, parent) {
  const countryName = capitalizeWords(params?.country?.replace('-', ' '));
  const title = `Events in ${countryName} ${metaDataTitleSuffix}`;
  const description = `Discover Thrilling Local and Large-Scale Events Throughout ${countryName}. Dive into Upcoming Live Music Concerts, Business Conferences, Wellness Workshops, and much more. Your Ultimate Resource for the Finest Events, Activities, and Attractions in ${countryName}.`;

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
    countryName: params?.country,
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

const mapofCountries = {
  'united-states': 'United States',
  'united-kingdom': 'United Kingdom',
  canada: 'Canada',
  india: 'India',
};

const Location = async ({ params }) => {
  if (!mapofCountries[params?.country]) {
    return <NotFound />;
  }
  const countryData = await getEventCountries({
    onError: (err) => {
      setPageError(err);
    },
  });

  const mappedCountries = countryData?.data?.find(
    (item) => item?.url_params === params?.country
  );

  const imageURL = getImageURL({
    key: mappedCountries?.banner_key,
    width: 1000,
    height: 1000,
  });

  return (
    <>
      <BodySearchBox />
      <div className="event-location-wrapper">
        <Flex justifyContent="center">
          <Flex
            justifyContent="space-between"
            className="event-location-banner"
          >
            <Flex
              flexDirection="column"
              justifyContent="center"
              gap="12"
              className="event-location-banner__heading"
            >
              <Heading
                level="1"
                className="event-location-banner__heading-title"
                dataQaSelector="locations_cities_page_country_name_label"
              >
                {mapofCountries[params?.country]}
              </Heading>
              <Heading
                level="2"
                className="event-location-banner__heading-subtitle"
                dataQaSelector="locations_cities_page_country_description_label"
              >
                Explore Events in {mapofCountries[params?.country]}
              </Heading>
            </Flex>

            <Image
              src={imageURL}
              width={640}
              height={360}
              alt="country_image"
              data-qa-selector="locations_cities_page_country_image"
              className="event-location__heading-image"
            />
          </Flex>
        </Flex>
        <CityList country={params.country} countryList={countryData} />
      </div>
    </>
  );
};

export default Location;
