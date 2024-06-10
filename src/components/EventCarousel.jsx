import React from 'react';
import cx from 'classnames';
import EventCard from './EventCard';
import Flex from './Flex';
import Heading from './Heading';
import { Icons } from '.';
import Link from 'next/link';
import ContentLoader from './ContentLoader';

export const EventListLoader = () => {
  return (
    <EventList
      header={
        <ContentLoader
          borderRadius="4px"
          height="25px"
          style={{
            maxWidth: '200px',
          }}
          className="event-carousel__heading"
        />
      }
    >
      {new Array(7).fill(1).map((_, index) => {
        return (
          <ContentLoader
            borderRadius="8px"
            key={index}
            className="event-carousel__list--item"
            height="243px"
            width="278px"
          />
        );
      })}
    </EventList>
  );
};

const EventList = ({ children, header, className }) => {
  const containerClassNames = cx({
    'event-carousel__list': true,
    [className]: Boolean(className),
  });

  return (
    <Flex flexDirection="column" gap="32" className="event-carousel">
      {header}
      <Flex gap="32" className={containerClassNames}>
        {children}
      </Flex>
    </Flex>
  );
};

const EventCarousel = ({
  title,
  events,
  className,
  seeMorePath,
  dataQaSelector,
}) => {
  if (!events?.length) return;

  return (
    <EventList
      className={className}
      header={
        <Heading
          className="event-carousel__heading"
          fancy
          level="2"
          dataQaSelector={`${dataQaSelector}_section_title`}
        >
          {title} Events
        </Heading>
      }
    >
      {events?.map?.((event, index) => {
        return (
          <li className="event-carousel__list--item" key={event.id}>
            <EventCard
              event={event}
              dataQaSelector={`${dataQaSelector}_event_${index + 1}`}
            />
          </li>
        );
      })}

      {events?.length >= 6 && seeMorePath ? (
        <li className="event-carousel__list--item event-carousel__list--item--all-events">
          <Link
            href={seeMorePath}
            data-qa-selector={`${dataQaSelector}_view_all_events_card`}
          >
            <Icons.CircularRightArrowIcon width={24} height={24} />
            <Heading
              level="5"
              color="primary-light-900"
              className="event-carousel__list--item-heading"
            >
              See All {title} Events
            </Heading>
          </Link>
        </li>
      ) : null}
    </EventList>
  );
};

export default EventCarousel;
