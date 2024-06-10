'use client';
import React, { useEffect, useState } from 'react';
import Overlay from '../Overlay';
import { Divider } from '..';
import { LargerLocationIcon, ChevronDownIcon } from '../Icons';
import EmptyState from '../EmptyState';
import {
  getEventCountries,
  getCountryCities,
  createQueryString,
} from '@/services';
import { getImageURL } from '../utils';
import { LazyImage } from '..';
import ContentLoader from '@/components/ContentLoader';

const EventLoader = () => {
  return (
    <div className="location-overlay__list--container">
      {new Array(10).fill(1).map((_, index) => {
        return (
          <ContentLoader
            borderRadius="12px"
            key={index}
            width="140px"
            height="40px"
          />
        );
      })}
    </div>
  );
};

const LocationOverlay = ({
  searchParams,
  params,
  page = '/',
  dataQaSelector = '',
}) => {
  const { cityName, countryName } = params;

  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(false);
  let title = '';

  const defaultCountry = countryName || 'united-states';

  function handleOnClose() {
    setOpen((s) => !s);
  }

  const fetchCountries = async () => {
    const data = await getEventCountries({
      onError: (err) => {
        setError(err);
      },
    });
    setCountryList(data?.data);
  };

  const fetchCitiesList = async () => {
    const data = await getCountryCities({
      countryName: defaultCountry,
      query: {
        is_featured: 1,
        sort_by: 'sort_order',
      },
      setLoading,
    });
    if (!data?.error) {
      setCityList(data?.data);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const countryUrlParam = countryList?.find(
      (country) => country?.url_params === defaultCountry
    )?.url_params;
    if (defaultCountry && countryUrlParam) {
      const fetchCities = async () => {
        const data = await getCountryCities({
          countryName: countryUrlParam,
          query: {
            is_featured: 1,
            sort_by: 'sort_order',
          },
          setLoading,
        });
        setCityList(data?.data);
      };
      fetchCities();
    }
  }, [defaultCountry, countryList]);

  switch (true) {
    case Boolean(cityName && countryName):
      title = `${decodeURIComponent(cityName)?.replace(
        /-/g,
        ' '
      )}, ${countryName?.replace('-', ' ')} `;
      break;
    case Boolean(countryName):
      title = ` ${countryName?.replace('-', ' ')}`;
      break;
    case page === '/online':
      title = 'Online';
      break;
    default:
      title = 'Select Location';
      break;
  }

  return (
    <>
      <button
        className="location-overlay__header"
        data-qa-selector={`${dataQaSelector}_location_link`}
        onClick={handleOnClose}
      >
        <LargerLocationIcon
          dataQaSelector={`${dataQaSelector}_location_icon`}
        />
        {title}
      </button>
      <Overlay
        open={isOpen}
        onClose={handleOnClose}
        title="Select Your Location"
        dataQaSelector="locations_select_location"
        className="location-overlay"
        showCloseIcon={true}
      >
        <div className="location-overlay__body">
          <p
            className="location-overlay__body--title"
            data-qa-selector="locations_select_location_overlay_explore_popular_cities_label"
          >
            Explore Popular Cities
          </p>
          {loading ? (
            <EventLoader />
          ) : error || !cityList?.length ? (
            <EmptyState
              subtitle="Something Went Wrong"
              alt="Something Went Wrong"
              dataQaSelector="locations_select_location_overlay_empty_state"
              buttonTitle="Retry"
              onClick={fetchCitiesList}
              width={62}
              height={93}
            />
          ) : (
            <>
              <div className="location-overlay__list--container">
                {cityList?.slice(0, 10)?.map((city, index) => {
                  return (
                    <a
                      href={`/country/${defaultCountry}/city/${
                        city?.url_params
                      }${createQueryString({
                        ...searchParams,
                      })}`}
                      className="location-overlay__list--items"
                      data-qa-selector={`locations_select_location_overlay_popular_city_${
                        index + 1
                      }_label`}
                      key={index}
                    >
                      {city?.name}
                    </a>
                  );
                })}
                {cityList?.length >= 10 ? (
                  <a
                    href={`/location/${defaultCountry}${createQueryString({
                      ...searchParams,
                    })}`}
                    className="location-overlay__list--view-more"
                    data-qa-selector="locations_select_location_overlay_popular_city_view_more_button"
                  >
                    View More
                    <ChevronDownIcon width="10px" height="10px" />
                  </a>
                ) : null}
              </div>
            </>
          )}
          <Divider
            className="location-overlay__divider"
            dataQaSelector="overlay"
          />
          <div className="location-overlay__countries">
            {countryList?.map((country, index) => {
              const countryImgURL = getImageURL({
                key: country?.image_key,
                width: 100,
                height: 100,
              });
              return (
                <a
                  data-qa-selector={`locations_select_location_overlay_${country?.name?.toLowerCase()}_event_link`}
                  href={`/location/${country?.url_params}`}
                  key={index}
                >
                  <LazyImage
                    width={48}
                    height={32}
                    className="location-overlay__countries--flag"
                    src={countryImgURL}
                    alt={country?.name}
                    dataQaSelector={`locations_select_location_overlay_${country?.name.toLowerCase()}`}
                  />
                  <p
                    className="location-overlay__countries--flag--name"
                    data-qa-selector={`locations_select_location_overlay_${country?.name.toLowerCase()}_label`}
                  >
                    {country?.name}
                  </p>
                </a>
              );
            })}
          </div>
          <Divider
            className="location-overlay__divider"
            dataQaSelector="overlay"
          />
          <a
            className="location-overlay__online"
            href={'/online'}
            data-qa-selector="locations_select_location_overlay_discover_online_events_button"
          >
            Discover Online Events
          </a>
        </div>
      </Overlay>
    </>
  );
};

export default LocationOverlay;
