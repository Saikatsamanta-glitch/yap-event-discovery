import React from 'react';
import Flex from './Flex';
import Heading from './Heading';
import Text from './Text';
import {
  getLocalDateFromUTC,
  getTimeZoneFormattedDate,
  convertStringToUrlFormat,
  getDecodedText,
} from './utils';
import { LazyImage } from '.';

const BlogCard = ({
  gridView,
  dataQaSelector,
  blog: { image_url, name, start_date, start_date_timezone, blogTime },
}) => {
  const localDate = getLocalDateFromUTC({
    utcDate: start_date || '',
    utcOffset: start_date_timezone?.utc_offset,
  });

  const timeZoneFormattedDate = getTimeZoneFormattedDate({
    localDate,
    format: 'D MMM YYYY',
  });

  const [date] = timeZoneFormattedDate
    ? timeZoneFormattedDate.split(' | ') || []
    : [];

  const eventName = convertStringToUrlFormat({ data: name });

  const decodedEventName = getDecodedText({ text: name });
  return (
    <div className="blog-card" data-grid-view={Boolean(gridView)}>
      <figure>
        <a
          className="blog-card-wrapper"
          href={`/blogs/${eventName}`}
          data-qa-selector={`${dataQaSelector}_card`}
        >
          <picture className="blog-card-wrapper-img-container">
            <LazyImage
              width={280}
              height={156}
              className="blog-card-wrapper-img-container--img"
              src={image_url}
              alt={name}
              style={gridView ? { width: '100%' } : {}}
              dataQaSelector={dataQaSelector}
            />
          </picture>
          <figcaption className="blog-card-wrapper-detail">
            <Flex
              flexDirection="column"
              gap="12"
              className="blog-card-wrapper-detail-container"
            >
              <Heading
                level="5"
                title={name}
                className="blog-card-wrapper-detail-blog-name"
                data-qa-selector={`${dataQaSelector}_title_label`}
              >
                {decodedEventName}
              </Heading>
              <Flex gap="6" alignItems="center">
                {date ? (
                  <>
                    <Heading
                      level="6"
                      data-qa-selector={`${dataQaSelector}_date_label`}
                      className="blog-card-wrapper-detail-date"
                    >
                      {date}
                    </Heading>
                    <Text size="small" color="gray-600">
                      |
                    </Text>

                    <Text
                      className="blog-card-wrapper-detail-time"
                      size="small"
                      data-qa-selector={`${dataQaSelector}_read_time_label`}
                    >
                      {blogTime}
                    </Text>
                  </>
                ) : (
                  <Text size="small" color="gray-600">
                    -
                  </Text>
                )}
              </Flex>
            </Flex>
          </figcaption>
        </a>
      </figure>
    </div>
  );
};

export default BlogCard;
