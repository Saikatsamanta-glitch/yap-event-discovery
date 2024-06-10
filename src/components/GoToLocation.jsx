'use client';
import React from 'react';
const GoToLocation = ({ location }) => {
  if (!location?.latitude || !location?.longitude) return null;

  const scroll2El = (elID) => {
    const isMobileOrTablet = window.innerWidth < 1024;

    if (isMobileOrTablet) {
      window.scrollTo({
        top: document.getElementById(elID).offsetTop + 1200,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: document.getElementById(elID).offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  const onBtnClick = (e) => {
    e.preventDefault();
    scroll2El('event-detail-map-section');
  };

  return (
    <button
      onClick={onBtnClick}
      className="event-detail-card--info__location-btn"
      data-qa-selector="event_details_page_view_on_map_link"
    >
      View on Map
    </button>
  );
};

export default GoToLocation;
