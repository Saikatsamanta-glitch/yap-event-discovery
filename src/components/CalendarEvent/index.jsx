import React from 'react';
import cx from 'classnames';

import Flex from '../Flex';
import Heading from '../Heading';
import Link from 'next/link';

const CalendarEvent = ({ className, title, subtitle }) => {
  const classNames = cx({
    'y-calendar-event': true,
    [className]: Boolean(className),
  });

  return (
    <Flex
      className={classNames}
      gap="16"
      alignItems="center"
      as={Link}
      href="/"
    >
      <Flex
        flexDirection="column"
        gap="2"
        alignItems="center"
        justifyContent="center"
        className="y-calendar-event__date"
      >
        <Heading level="6" className="y-calendar-event__date--month">
          Jul
        </Heading>
        <Heading level="5" className="y-calendar-event__date--day">
          7
        </Heading>
      </Flex>

      <Flex flexDirection="column" gap="4">
        <Heading level="5" className="y-calendar-event__title">
          {title}
        </Heading>
        <Heading level="6" className="y-calendar-event__subtitle">
          {subtitle}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default CalendarEvent;
