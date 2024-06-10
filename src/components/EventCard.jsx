import React from 'react';
import Badge from './Badge';
import Flex from './Flex';
import Heading from './Heading';
import Text from './Text';
import {
  getImageURL,
  getLocalDateFromUTC,
  getTimeZoneFormattedDate,
  convertStringToUrlFormat,
  getCategoryImage,
  getDecodedText,
  getEventOffersDetails,
} from './utils';
import { Button } from '.';
import { LazyImage } from '.';
import Image from 'next/image';

const EventCard = ({
  gridView,
  event: {
    id,
    image_url,
    name,
    start_date,
    category,
    start_date_tz_offset,
    location,
    ticket_offers,
    sitemaps,
  },
  dataQaSelector,
}) => {
  const imgURL = image_url
    ? getImageURL({
        key: image_url,
        width: 500,
        height: 500,
      })
    : getCategoryImage({
        categoryName: category?.name,
      });

  const categoryName = category?.name || '';

  const localDate = getLocalDateFromUTC({
    utcDate: start_date || '',
    utcOffset: start_date_tz_offset,
  });

  const timeZoneFormattedDate = getTimeZoneFormattedDate({
    localDate,
    format: 'ddd, MMM D, YYYY | h:mm a',
  });

  const price = getEventOffersDetails(ticket_offers, sitemaps[0]?.name);

  const [date, time] = timeZoneFormattedDate
    ? timeZoneFormattedDate.split(' | ') || []
    : [];

  const eventName = convertStringToUrlFormat({ data: name });

  const decodedEventName = getDecodedText({ text: name });
  const decodedEventLocation = getDecodedText({ text: location?.name });
  return (
    <div className="event-card" data-grid-view={Boolean(gridView)}>
      <figure>
        <a
          className="event-card-wrapper"
          href={`/events/${id}-${eventName}`}
          data-qa-selector={`${dataQaSelector}_card`}
        >
          <Badge
            className="event-card-wrapper-badge"
            data-qa-selector={`${dataQaSelector}_category_label`}
          >
            {categoryName}
          </Badge>
          <picture className="event-card-wrapper-img-container">
            <LazyImage
              width={280}
              height={156}
              className="event-card-wrapper-img-container--img"
              src={imgURL}
              alt={name}
              style={gridView ? { width: '100%' } : {}}
              dataQaSelector={dataQaSelector}
            />
          </picture>
          <figcaption className="event-card-wrapper-detail">
            <Flex
              flexDirection="column"
              gap="8"
              className="event-card-wrapper-detail-container"
            >
              <Heading
                level="5"
                title={name}
                className="event-card-wrapper-detail-event-name"
                data-qa-selector={`${dataQaSelector}_title_label`}
              >
                {decodedEventName}
              </Heading>
              {location?.name ? (
                <Flex
                  gap="8"
                  alignItems="center"
                  className="event-card-wrapper-detail-event-location-wrapper"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Location-light.svg`}
                    alt={'Location Light Icon'}
                    width={15}
                    height={15}
                    className={'event-icons-light'}
                  />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Location-dark.svg`}
                    alt={'Location Dark Icon'}
                    width={14}
                    height={11}
                    className={'event-icons-dark'}
                  />
                  <Text
                    size="small"
                    className="event-card-wrapper-detail-event-location-wrapper__label"
                    data-qa-selector={`${dataQaSelector}_venue_label`}
                  >
                    {decodedEventLocation || ''}
                  </Text>
                </Flex>
              ) : null}

              <Flex gap="6" alignItems="center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Clock-light.svg`}
                  alt={'Clock Light Icon'}
                  width={17}
                  height={18}
                  className={'event-icons-light'}
                />
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Clock-dark.svg`}
                  alt={'Clock Dark Icon'}
                  width={13}
                  height={12}
                  className={'event-icons-dark'}
                />
                {date && time ? (
                  <>
                    <Heading
                      level="6"
                      data-qa-selector={`${dataQaSelector}_date_label`}
                      className="event-card-wrapper-detail-date"
                    >
                      {date}
                    </Heading>
                    <Text size="small" color="gray-600">
                      |
                    </Text>

                    <Text
                      className="event-card-wrapper-detail-time"
                      size="small"
                      data-qa-selector={`${dataQaSelector}_time_label`}
                    >
                      {time}
                    </Text>
                  </>
                ) : (
                  <Text size="small" color="gray-600">
                    -
                  </Text>
                )}
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                className="event-card-wrapper-detail-pricing"
              >
                <Text
                  size="medium"
                  data-qa-selector={`${dataQaSelector}_price_label`}
                >
                  {`${price}`}
                </Text>
                <Button
                  dataQaSelector={`${dataQaSelector}_know_more`}
                  variant="outline"
                >
                  Know More
                </Button>
              </Flex>
            </Flex>
          </figcaption>
        </a>
      </figure>
    </div>
  );
};

export default EventCard;
