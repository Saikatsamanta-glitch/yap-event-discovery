import React from 'react';
import Flex from './Flex';
import Heading from './Heading';
import LocationOverlay from './LocationOverlay';
import Tag from './Tag';
import { getTimeRange, convertStringToUrlFormat } from './utils';
import { createQueryString, getEventCategories } from '@/services';
import cx from 'classnames';
import { EventGenreCategory } from '.';
import Image from 'next/image';

const generateOnlineTitle = (category, searchParams, eventType) => {
  let baseTitle = '';
  const updateDate =
    searchParams?.date !== undefined
      ? ` ${getTimeRange(searchParams?.date)?.name}`
      : '';

  if (category || searchParams?.date) {
    baseTitle = `${eventType} Events${updateDate}`;
  } else {
    baseTitle = 'Explore Events';
  }

  return baseTitle;
};

const generateDefaultTitle = (category, searchParams, eventType, params) => {
  let baseTitle = '';

  if (category || searchParams.date) {
    baseTitle = `${eventType} Events in`;
  } else if (Object.keys(params)?.length) {
    baseTitle = 'Explore Events in';
  } else {
    baseTitle = 'Discover Unforgettable Events in';
  }

  return baseTitle;
};

const PageTitle = async ({
  searchParams,
  heading,
  fancy,
  params,
  page,
  dataQaSelector,
}) => {
  const data = await getEventCategories();
  if (!data) return;

  const category = data?.categories?.find(
    (category) =>
      convertStringToUrlFormat({ data: category?.name }) ===
      searchParams?.category
  )?.name;

  let title = '';

  const eventType = category === 'Event' ? '' : category || '';

  if (page === '/online') {
    const baseTitle = generateOnlineTitle(category, searchParams, eventType);
    title = (
      <>
        {baseTitle}
        <LocationOverlay
          searchParams={searchParams}
          params={params}
          page={page}
          dataQaSelector={dataQaSelector}
        />
      </>
    );
  } else {
    const defaultTitle = generateDefaultTitle(
      category,
      searchParams,
      eventType,
      params
    );
    title = (
      <>
        {defaultTitle}
        <LocationOverlay
          searchParams={searchParams}
          params={params}
          dataQaSelector={dataQaSelector}
        />
        {getTimeRange(searchParams.date)?.name || ''}
      </>
    );
  }

  return (
    <Heading
      fancy={fancy}
      level="1"
      className="event-time-category__heading"
      dataQaSelector={`${dataQaSelector}_banner_title_label`}
    >
      {heading ? heading : title ? title : ''}
    </Heading>
  );
};

const EventTimeCategory = ({
  page = '/',
  searchParams,
  withBackground = true,
  heading,
  fancy,
  showCategory = true,
  params = {},
  dataQaSelector = 'homepage',
}) => {
  const selectedTime = searchParams?.date;
  const className = cx({
    'event-time-category': true,
    'event-time-category__bg': Boolean(withBackground),
  });

  return (
    <div
      className={className}
      data-qa-selector={`${dataQaSelector}_banner_image`}
      style={{
        position: withBackground ? 'relative' : 'unset',
      }}
    >
      {withBackground ? (
        <>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/home-banner-light.jpg`}
            fill={true}
            alt={'Background Light Image'}
            className={'event-time-category__bg-light'}
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/home-banner-dark.jpg`}
            fill={true}
            alt={'Background Dark Image'}
            className={'event-time-category__bg-dark'}
          />
        </>
      ) : null}
      <Flex
        flexDirection="column"
        gap="8"
        style={{
          width: '100%',
          position: withBackground ? 'absolute' : 'unset',
        }}
      >
        <PageTitle
          heading={heading}
          searchParams={searchParams}
          fancy={fancy}
          params={params}
          page={page}
          dataQaSelector={dataQaSelector}
        />

        {page !== '/search' ? (
          <EventGenreCategory
            searchParams={searchParams}
            className="event-time-category__genre_categories"
            categoryLimit={10}
            page={page}
            dataQaSelector={dataQaSelector}
          />
        ) : null}

        {showCategory ? (
          <Flex gap="12" className="event-time-category__list">
            {Object.keys(getTimeRange()).map((time) => {
              const url = createQueryString({
                ...searchParams,
                date: getTimeRange(time)?.id,
              });

              return (
                <Tag
                  dataQaSelector={`${
                    searchParams?.q?.length
                      ? 'search_page_filter'
                      : `${dataQaSelector}_filter`
                  }_${getTimeRange(time)
                    ?.name?.toLowerCase()
                    .replace(' ', '_')}_button`}
                  asLink={true}
                  href={`${page}${
                    getTimeRange(time)?.id === selectedTime
                      ? createQueryString({ ...searchParams, date: '' })
                      : url
                  }`}
                  key={time}
                  className="event-time-category__list--item"
                  type="blur"
                  active={getTimeRange(time)?.id === selectedTime}
                >
                  {getTimeRange(time)?.name}
                </Tag>
              );
            })}
          </Flex>
        ) : null}
      </Flex>
    </div>
  );
};

export default EventTimeCategory;
