'use client';
import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Icons } from '.';
import { getLocalDateFromUTC, getTimeZoneFormattedDate } from './utils';

const EventSessionList = ({ sessions }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          data-qa-selector="event_discovery_event_details_event_date_and_time_show_more_button"
          className="event-detail-card--info__date-showmore"
        >
          <span>Show More</span>
          <Icons.ChevronDownIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5} align="start">
          <div className="event-detail-card--info__date-popover">
            {sessions.map((s) => {
              const localDate = getLocalDateFromUTC({
                utcDate: s?.start_date,
                utcOffset: s?.start_date_timezone?.utc_offset,
              });

              const timeZoneFormattedDate = getTimeZoneFormattedDate({
                localDate,
              });
              return (
                <h5
                  className="event-detail-card--info__date-popover-text"
                  key={s.id}
                >
                  {timeZoneFormattedDate}
                </h5>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default EventSessionList;
