'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

const ToggleDescription = ({ description, dataQaSelector }) => {
  const showFullDescription = !Boolean(description?.length > 200);
  const [toggleExpand, setToggleExpand] = useState(true);

  return (
    <>
      <p
        className="event-detail--about-event-description"
        data-qa-selector={`${dataQaSelector}_label`}
      >
        <span suppressHydrationWarning>
          {showFullDescription || !toggleExpand
            ? description
            : description?.slice(0, 200)}
        </span>
      </p>

      {!showFullDescription ? (
        toggleExpand ? (
          <span>
            <button
              data-qa-selector={`${dataQaSelector}_read_more_button`}
              onClick={() => setToggleExpand(false)}
              className="event-detail--about-event-description-toggle"
            >
              Read More
              <span className="event-detail--about-event-description-toggle-icon">
                <ChevronDownIcon width="0.5em" height="0.5em" />
              </span>
            </button>
          </span>
        ) : (
          <span>
            <button
              data-qa-selector={`${dataQaSelector}_read_more_button`}
              onClick={() => setToggleExpand(true)}
              className="event-detail--about-event-description-toggle"
            >
              Read Less
              <span className="event-detail--about-event-description-toggle-less-icon">
                <ChevronDownIcon width="0.5em" height="0.5em" />
              </span>
            </button>
          </span>
        )
      ) : null}
    </>
  );
};

export default ToggleDescription;
