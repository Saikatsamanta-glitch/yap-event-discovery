import { Flex, Heading, LazyImage, Divider } from '..';
import { getCountryCities } from '@/services';
import { getImageURL } from '../utils';
import EmptyState from '../EmptyState';
import Link from 'next/link';

const getNormalizedCiities = (cities) => {
  if (!cities || !Array.isArray(cities)) {
    return {};
  }

  const sortedCities = cities.slice().sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  });

  const normalizedCities = sortedCities.reduce((acc, city) => {
    const firstLetter = city.name.charAt(0).toUpperCase();
    acc[firstLetter] = acc[firstLetter] || [];
    acc[firstLetter].push(city);
    return acc;
  }, {});

  return normalizedCities;
};

const CityList = async ({ country, countryList }) => {
  const defaultCountry = country || 'united-states';

  const citiesData = await getCountryCities({
    countryName: defaultCountry,
    query: {
      page_size: 10000,
    },
  });

  const cityList = getNormalizedCiities(citiesData?.data);

  if (citiesData?.error) {
    return (
      <EmptyState
        subtitle="Something went wrong"
        alt="Something Went Wrong"
        buttonTitle="Retry"
        dataQaSelector="locations_cities_page_empty_state_illustration"
        link={`/location/${defaultCountry}`}
      />
    );
  }

  const renderCountryLists = () => {
    const cityListArray = [];

    for (const key in cityList) {
      if (cityList.hasOwnProperty(key)) {
        const citiesArray = cityList[key];
        const Cities = (
          <>
            <Flex
              gap="16"
              flexDirection="row"
              className="event-location__cities-city-wrapper"
              id={key}
            >
              <Heading
                level="2"
                className="event-location__cities-city-list-heading"
                dataQaSelector={`locations_cities_page_${key.toLowerCase()}_label`}
              >
                {key}
              </Heading>
              <Flex
                key={key}
                flexDirection="row"
                className="event-location__cities-city-list-items-wrapper"
              >
                {citiesArray.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={`/country/${country}/city/${item?.url_params}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <p
                        data-qa-selector={`locations_cities_page_${key?.toLocaleLowerCase()}_city_${
                          index + 1
                        }_label`}
                        className="event-location__cities-city-list-items-wrapper-item"
                      >
                        {item.name}
                      </p>
                    </a>
                  );
                })}
              </Flex>
            </Flex>
            <Divider className="event-location__cities-city-divider" />
          </>
        );

        cityListArray.push(Cities);
      }
    }

    return cityListArray;
  };

  return (
    <>
      {Object.keys(cityList)?.length ? (
        <div className="event-location__keys-wrapper">
          <Divider className="event-location__keys-top-divider" />

          {Object.keys(cityList)?.map((cityKey) => (
            <Heading
              level="2"
              className="event-location__keys-heading"
              key={cityKey}
            >
              <Link
                href={`#${cityKey}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {cityKey}
              </Link>
            </Heading>
          ))}
        </div>
      ) : null}
      <div className="event-location__cities-wrapper">
        {renderCountryLists()}
      </div>
      <Flex
        alignItems="center"
        className="event-location__country-flag-wrapper"
        gap="32"
        flexDirection="column"
      >
        <Heading
          level="3"
          dataQaSelector="locations_cities_page_explore_other_countries_label"
          className="event-location__country-flag-title"
        >
          Explore Other Countries
        </Heading>

        <Flex gap="24">
          {countryList?.data?.map((country) => {
            const countryImgURL = getImageURL({
              key: country?.image_key,
              width: 100,
              height: 100,
            });

            return (
              <a
                href={`/location/${country?.url_params}`}
                key={country?.id}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <LazyImage
                  width={48}
                  height={32}
                  src={countryImgURL}
                  alt={country?.name}
                  dataQaSelector={`locations_cities_page_${country?.name?.toLowerCase()}_flag`}
                />
                <Flex flexDirection="column" gap="4" alignItems="center">
                  <p
                    data-qa-selector={`locations_cities_page_${country?.name?.toLowerCase()}_label`}
                    className="event-location__country-flag-country-name"
                  >
                    {country?.name}
                  </p>
                </Flex>
              </a>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default CityList;
