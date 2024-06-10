import { Heading } from '@/components';
import { createQueryString } from '@/services';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { convertStringToUrlFormat } from '@/components/utils';

const PastEventBanner = ({ category }) => {
  return (
    <div className="past-event">
      <div className="past-event__wrapper">
        <div className="past-event__heading-wrapper">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Pastevent-light.svg`}
            alt={'Past Event Light Icon'}
            width={16}
            height={16}
            className={'event-icons-light'}
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URI}/event-icons/Pastevent-dark.svg`}
            alt={'Past Event Dark Icon'}
            width={16}
            height={16}
            className={'event-icons-dark'}
          />
          <Heading
            level="3"
            dataQaSelector="event_details_page_past_event_banner_title_label"
            className="past-event__heading-wrapper--text"
          >
            Past Event!!!
          </Heading>
        </div>
        <Heading
          level="4"
          dataQaSelector="event_details_page_past_event_banner_description_label"
          className="past-event--text"
        >
          Oops, the event you were looking for has come to an end.
          <Link
            href={`/${createQueryString({
              category: convertStringToUrlFormat({ data: category?.name }),
            })}`}
            data-qa-selector="event_details_page_past_event_banner_explore_more_link"
            className="past-event--link"
          >
            Explore more
          </Link>
          events you might like.
        </Heading>
      </div>
    </div>
  );
};
export default PastEventBanner;
